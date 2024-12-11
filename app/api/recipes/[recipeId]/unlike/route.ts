import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(
  request: Request,
  { params }: { params: { recipeId: string } }
) {
  try {
    const recipeId = parseInt(params.recipeId, 10);
    if (isNaN(recipeId)) {
      return NextResponse.json({ success: false, message: 'Invalid recipe ID' }, { status: 400 });
    }

    const userId = 1; // Assuming the userId is obtained from the session or request context

    const recipeLike = await prisma.recipeLike.findFirst({
      where: {
        userId,
        recipeId,
      },
    });

    if (!recipeLike) {
      return NextResponse.json({ success: false, message: 'Like not found' }, { status: 404 });
    }

    await prisma.recipeLike.delete({
      where: {
        userId_recipeId: {
          userId,
          recipeId,
        },
      },
    });

    const likeCount = await prisma.recipeLike.count({
      where: {
        recipeId,
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Like removed successfully',
      data: { likeCount },
    }, { status: 200 });

  } catch (error: any) {
    console.error('Error removing like:', error);
    return NextResponse.json({ success: false, message: 'Internal server error', data: error }, { status: 500 });
  }
}