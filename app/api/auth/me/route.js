import { NextResponse } from 'next/server';
import { getUserFromRequest } from '../../../../lib/auth-server';

export async function GET(request) {
  const user = await getUserFromRequest(request);
  if (!user) {
    return NextResponse.json({ user: null }, { status: 401 });
  }
  return NextResponse.json({ user });
}
