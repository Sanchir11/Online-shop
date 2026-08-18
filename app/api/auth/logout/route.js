import { NextResponse } from 'next/server';
import { logoutUser } from '../../../../lib/auth-server';

export async function POST(request) {
  const header = request.headers.get('authorization') || '';
  const token = header.startsWith('Bearer ') ? header.slice(7).trim() : '';
  await logoutUser(token);
  return NextResponse.json({ ok: true });
}
