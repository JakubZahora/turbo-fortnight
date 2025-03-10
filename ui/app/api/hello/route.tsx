// filepath: /c:/Projects/turbo-fortnight/turbo-fortnight-ui/pages/api/hello.tsx
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const response = await fetch('http://localhost:8000/api/hello');
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch data from Rust backend' },
      { status: 500 }
    );
  }
}