import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const keywords = searchParams.get('keywords') || '';
    const ingredients = searchParams.get('ingredients') || '';

    if (!keywords && !ingredients) {
      return NextResponse.json({ success: false, message: 'Keywords or ingredients must be provided' }, { status: 400 });
    }

    const recipes = await prisma.recipe.findMany({
      where: {
        OR: [
          { title: { contains: keywords, mode: 'insensitive' } },
          { description: { contains: keywords, mode: 'insensitive' } },
          { ingredients: { contains: ingredients, mode: 'insensitive' } },
        ],
      },
      select: {
        id: true,
        title: true,
        description: true,
        ingredients: true,
        steps: true,
        imageUrl: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Recipes fetched successfully',
      data: recipes,
    }, { status: 200 });

  } catch (error: any) {
    console.error('Error fetching recipes:', error);
    return NextResponse.json({ success: false, message: 'Internal server error', data: error }, { status: 500 });
  }
}