import { NextResponse } from 'next/server';
import { loginUser } from '../../../../lib/auth-server';

export async function POST(request) {
  try {
    const body = await request.json();
    const result = await loginUser(body);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error: error.message || 'Нэвтрэх амжилтгүй.' }, { status: 401 });
  }
}
