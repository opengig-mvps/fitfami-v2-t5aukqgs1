import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function PUT(
  request: Request,
  { params }: { params: { userId: string, recipeId: string } }
) {
  try {
    const userId = parseInt(params.userId, 10);
    const recipeId = parseInt(params.recipeId, 10);

    if (isNaN(userId) || isNaN(recipeId)) {
      return NextResponse.json({ success: false, message: 'Invalid user ID or recipe ID' }, { status: 400 });
    }

    const body = await request.json();

    const { title, description, ingredients, steps, imageUrl } = body;

    const updatedRecipe = await prisma.recipe.updateMany({
      where: {
        id: recipeId,
        userId: userId,
      },
      data: {
        title: title,
        description: description,
        ingredients: ingredients,
        steps: steps,
        imageUrl: imageUrl,
        updatedAt: new Date(),
      },
    });

    if (updatedRecipe.count === 0) {
      return NextResponse.json({ success: false, message: 'Recipe not found or not updated' }, { status: 404 });
    }

    const recipe = await prisma.recipe.findFirst({
      where: {
        id: recipeId,
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Recipe updated successfully',
      data: recipe,
    }, { status: 200 });

  } catch (error: any) {
    console.error('Error updating recipe:', error);
    return NextResponse.json({ success: false, message: 'Internal server error', data: error }, { status: 500 });
  }
}