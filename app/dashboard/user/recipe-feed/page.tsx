"use client";

import React, { useState, useEffect } from "react";
import { Heart, LoaderCircleIcon } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { isAxiosError } from "axios";
import api from "@/lib/api";
import { useSession } from "next-auth/react";

interface Recipe {
  id: string;
  title: string;
  description: string;
  likesCount: number;
  likedByUser: boolean;
}

const RecipeFeedPage: React.FC = () => {
  const { data: session } = useSession();
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchRecipes = async () => {
    try {
      setLoading(true);
      const res = await api.get('/api/recipes');
      setRecipes(res?.data?.data);
    } catch (error: any) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  const handleLike = async (recipeId: string) => {
    try {
      const res = await api.post(`/api/recipes/${recipeId}/like`, { userId: session?.user?.id });
      setRecipes((prevRecipes) =>
        prevRecipes?.map((recipe) =>
          recipe?.id === recipeId
            ? { ...recipe, likesCount: recipe?.likesCount + 1, likedByUser: true }
            : recipe
        )
      );
      toast.success("Recipe liked successfully!");
    } catch (error: any) {
      if (isAxiosError(error)) {
        toast.error(error?.response?.data?.message ?? "Something went wrong");
      } else {
        console.error(error);
        toast.error("An unexpected error occurred");
      }
    }
  };

  const handleUnlike = async (recipeId: string) => {
    try {
      const res = await api.post(`/api/recipes/${recipeId}/unlike`, { userId: session?.user?.id });
      setRecipes((prevRecipes) =>
        prevRecipes?.map((recipe) =>
          recipe?.id === recipeId
            ? { ...recipe, likesCount: recipe?.likesCount - 1, likedByUser: false }
            : recipe
        )
      );
      toast.success("Recipe unliked successfully!");
    } catch (error: any) {
      if (isAxiosError(error)) {
        toast.error(error?.response?.data?.message ?? "Something went wrong");
      } else {
        console.error(error);
        toast.error("An unexpected error occurred");
      }
    }
  };

  return (
    <div className="flex-1 p-8">
      <h2 className="text-2xl font-bold mb-6">Recipe Feed</h2>
      {loading ? (
        <div className="flex justify-center items-center">
          <LoaderCircleIcon className="animate-spin h-8 w-8" />
        </div>
      ) : (
        <div className="space-y-6">
          {recipes?.map((recipe) => (
            <Card key={recipe?.id}>
              <CardHeader>
                <CardTitle>{recipe?.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{recipe?.description}</p>
              </CardContent>
              <CardFooter className="flex items-center justify-between">
                <div className="flex items-center">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => (recipe?.likedByUser ? handleUnlike(recipe?.id) : handleLike(recipe?.id))}
                  >
                    <Heart className={`h-5 w-5 ${recipe?.likedByUser ? "text-red-500" : ""}`} />
                    <span className="sr-only">{recipe?.likedByUser ? "Unlike" : "Like"}</span>
                  </Button>
                  <span className="ml-2">{recipe?.likesCount}</span>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecipeFeedPage;