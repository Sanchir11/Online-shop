import { NextResponse } from 'next/server';
import { registerUser } from '../../../../lib/auth-server';

export async function POST(request) {
  try {
    const body = await request.json();
    const user = await registerUser(body);
    return NextResponse.json({ user });
  } catch (error) {
    return NextResponse.json({ error: error.message || 'Бүртгэл амжилтгүй.' }, { status: 400 });
  }
}
