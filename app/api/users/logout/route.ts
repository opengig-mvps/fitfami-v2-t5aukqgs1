import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    // End the user session logic here
    // For example, clearing cookies or session storage

    // Provide feedback for successful logout
    return NextResponse.json({
      success: true,
      message: 'User logged out successfully',
    }, { status: 200 });
  } catch (error: any) {
    console.error('Error during logout:', error);
    // Provide feedback for failed logout attempt
    return NextResponse.json({
      success: false,
      message: 'Error during logout',
    }, { status: 500 });
  }
}