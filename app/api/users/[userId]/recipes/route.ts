import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

type RecipeRequestBody = {
  title: string;
  description: string;
  ingredients: string;
  steps: string;
  imageUrl?: string;
};

export async function POST(
  request: Request,
  { params }: { params: { userId: string } }
) {
  try {
    const userId = parseInt(params.userId, 10);
    if (isNaN(userId)) {
      return NextResponse.json({ success: false, message: 'Invalid user ID' }, { status: 400 });
    }

    const body: RecipeRequestBody = await request.json();
    const { title, description, ingredients, steps, imageUrl } = body;

    if (!title || !description || !ingredients || !steps) {
      return NextResponse.json({ success: false, message: 'Missing required fields' }, { status: 400 });
    }

    const user = await prisma.user.findFirst({
      where: { id: userId },
    });

    if (!user) {
      return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 });
    }

    const recipe = await prisma.recipe.create({
      data: {
        userId,
        title,
        description,
        ingredients,
        steps,
        imageUrl,
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Recipe created successfully',
      data: { recipeId: recipe.id.toString() },
    }, { status: 201 });

  } catch (error: any) {
    console.error('Error creating recipe:', error);
    return NextResponse.json({ success: false, message: 'Internal server error', data: error }, { status: 500 });
  }
}