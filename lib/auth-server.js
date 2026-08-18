import { createHash, randomBytes, randomUUID } from 'crypto';
import { mkdir, readFile, writeFile } from 'fs/promises';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'data');
const STORE_PATH = path.join(DATA_DIR, 'store.json');

function hashPassword(password, salt) {
  return createHash('sha256').update(`${salt}:${password}`).digest('hex');
}

async function ensureStore() {
  await mkdir(DATA_DIR, { recursive: true });
  try {
    await readFile(STORE_PATH, 'utf8');
  } catch {
    const initial = { users: [], sessions: [], orders: [] };
    await writeFile(STORE_PATH, JSON.stringify(initial, null, 2), 'utf8');
  }
}

async function loadStore() {
  await ensureStore();
  const raw = await readFile(STORE_PATH, 'utf8');
  return JSON.parse(raw);
}

async function saveStore(store) {
  await ensureStore();
  await writeFile(STORE_PATH, JSON.stringify(store, null, 2), 'utf8');
}

function sanitizeUser(user) {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    phone: user.phone,
    createdAt: user.createdAt,
  };
}

function getBearerToken(request) {
  const header = request.headers.get('authorization') || '';
  if (header.startsWith('Bearer ')) return header.slice(7).trim();
  return '';
}

export async function registerUser({ name, email, phone, password }) {
  const store = await loadStore();
  const normalizedEmail = String(email || '').trim().toLowerCase();
  const normalizedPhone = String(phone || '').trim();

  if (!name?.trim()) throw new Error('Нэр оруулна уу.');
  if (!normalizedEmail) throw new Error('И-мэйл оруулна уу.');
  if (!password || password.length < 6) throw new Error('Нууц үг хамгийн багадаа 6 тэмдэгт байна.');

  if (store.users.some((user) => user.email === normalizedEmail)) {
    throw new Error('Энэ и-мэйл бүртгэлтэй байна.');
  }

  const salt = randomBytes(16).toString('hex');
  const user = {
    id: randomUUID(),
    name: name.trim(),
    email: normalizedEmail,
    phone: normalizedPhone,
    salt,
    passwordHash: hashPassword(password, salt),
    createdAt: new Date().toISOString(),
  };

  store.users.push(user);
  await saveStore(store);
  return sanitizeUser(user);
}

export async function loginUser({ email, password }) {
  const store = await loadStore();
  const normalizedEmail = String(email || '').trim().toLowerCase();
  const user = store.users.find((entry) => entry.email === normalizedEmail);

  if (!user) throw new Error('И-мэйл эсвэл нууц үг буруу байна.');

  const passwordHash = hashPassword(password, user.salt);
  if (passwordHash !== user.passwordHash) {
    throw new Error('И-мэйл эсвэл нууц үг буруу байна.');
  }

  const token = randomBytes(32).toString('hex');
  const session = {
    token,
    userId: user.id,
    createdAt: new Date().toISOString(),
    expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30).toISOString(),
  };

  store.sessions = store.sessions.filter((entry) => entry.userId !== user.id);
  store.sessions.push(session);
  await saveStore(store);

  return { token, user: sanitizeUser(user) };
}

export async function logoutUser(token) {
  if (!token) return;
  const store = await loadStore();
  store.sessions = store.sessions.filter((entry) => entry.token !== token);
  await saveStore(store);
}

export async function getUserFromRequest(request) {
  const token = getBearerToken(request);
  if (!token) return null;

  const store = await loadStore();
  const session = store.sessions.find((entry) => entry.token === token);
  if (!session) return null;
  if (new Date(session.expiresAt).getTime() < Date.now()) return null;

  const user = store.users.find((entry) => entry.id === session.userId);
  return user ? sanitizeUser(user) : null;
}

export async function createOrder(request, { items, total }) {
  const user = await getUserFromRequest(request);
  if (!user) throw new Error('Нэвтэрч орно уу.');

  if (!Array.isArray(items) || !items.length) {
    throw new Error('Сагс хоосон байна.');
  }

  const store = await loadStore();
  const order = {
    id: randomUUID(),
    userId: user.id,
    items: items.map((item) => ({
      id: item.id,
      name: item.name,
      price: item.price,
      qty: item.qty,
      image: item.image,
    })),
    total: Number(total) || 0,
    status: 'pending',
    paymentMethod: 'QPay',
    createdAt: new Date().toISOString(),
  };

  store.orders.push(order);
  await saveStore(store);
  return order;
}

export async function getOrdersForRequest(request) {
  const user = await getUserFromRequest(request);
  if (!user) throw new Error('Нэвтэрч орно уу.');

  const store = await loadStore();
  return store.orders
    .filter((order) => order.userId === user.id)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
}
