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

    const userId = 1; // Assuming userId is obtained from session or authentication context

    const recipe = await prisma.recipe.findFirst({
      where: { id: recipeId },
    });

    if (!recipe) {
      return NextResponse.json({ success: false, message: 'Recipe not found' }, { status: 404 });
    }

    await prisma.recipeLike.create({
      data: {
        userId,
        recipeId,
      },
    });

    const likeCount = await prisma.recipeLike.count({
      where: { recipeId },
    });

    return NextResponse.json({
      success: true,
      message: 'Recipe liked successfully',
      data: { likeCount },
    }, { status: 200 });

  } catch (error: any) {
    console.error('Error liking recipe:', error);
    return NextResponse.json({ success: false, message: 'Internal server error', data: error }, { status: 500 });
  }
}