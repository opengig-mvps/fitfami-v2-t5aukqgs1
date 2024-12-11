import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '10', 10);
    const skip = (page - 1) * limit;

    const recipes = await prisma.recipe.findMany({
      skip,
      take: limit,
      include: {
        user: {
          select: {
            id: true,
            username: true,
          },
        },
        likes: true,
      },
    });

    const totalRecipes = await prisma.recipe.count();
    const totalPages = Math.ceil(totalRecipes / limit);

    return NextResponse.json({
      success: true,
      message: 'Recipes fetched successfully',
      data: {
        recipes,
        pagination: {
          totalRecipes,
          totalPages,
          currentPage: page,
        },
      },
    }, { status: 200 });

  } catch (error: any) {
    console.error('Error fetching recipes:', error);
    return NextResponse.json({ success: false, message: 'Internal server error', data: error }, { status: 500 });
  }
}