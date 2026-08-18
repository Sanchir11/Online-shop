import { NextResponse } from 'next/server';
import { createOrder, getOrdersForRequest } from '../../../lib/auth-server';

export async function GET(request) {
  try {
    const orders = await getOrdersForRequest(request);
    return NextResponse.json({ orders });
  } catch (error) {
    return NextResponse.json({ error: error.message || 'Алдаа гарлаа.' }, { status: 401 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const order = await createOrder(request, body);
    return NextResponse.json({ order });
  } catch (error) {
    const status = error.message === 'Нэвтэрч орно уу.' ? 401 : 400;
    return NextResponse.json({ error: error.message || 'Захиалга амжилтгүй.' }, { status });
  }
}
