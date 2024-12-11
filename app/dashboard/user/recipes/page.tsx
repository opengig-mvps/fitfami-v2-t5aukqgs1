"use client";

import React, { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import { isAxiosError } from "axios";
import { Plus, X, LoaderCircleIcon } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { DateTimePicker } from "@/components/ui/date-picker";
import api from "@/lib/api";

const recipeSchema = z.object({
  title: z.string().min(1, { message: "Recipe title is required" }),
  ingredients: z.string().min(1, { message: "Ingredients are required" }),
  steps: z.string().min(1, { message: "Steps are required" }),
  images: z.array(z.any()).min(1, { message: "At least one image is required" }),
});

type RecipeFormData = z.infer<typeof recipeSchema>;

const RecipeManagementPage: React.FC = () => {
  const { data: session } = useSession();
  const { control, register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<RecipeFormData>({
    resolver: zodResolver(recipeSchema),
    defaultValues: {
      title: "",
      ingredients: "",
      steps: "",
      images: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "images",
  });

  const [selectedImages, setSelectedImages] = useState<any[]>([]);

  const handleImageChange = (e: any) => {
    const files = Array.from(e?.target?.files);
    setSelectedImages(files);
    files?.forEach((file) => append({ file }));
  };

  const removeImage = (index: number) => {
    const newImages = selectedImages?.filter((_, i) => i !== index);
    setSelectedImages(newImages);
    remove(index);
  };

  const onSubmit = async (data: RecipeFormData) => {
    try {
      const formData = new FormData();
      formData.append("title", data?.title);
      formData.append("ingredients", data?.ingredients);
      formData.append("steps", data?.steps);
      data?.images?.forEach((image, index) => formData.append(`images[${index}]`, image?.file));

      const response = await api.post(`/api/users/${session?.user?.id}/recipes`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response?.data?.success) {
        toast.success("Recipe created successfully!");
        reset();
        setSelectedImages([]);
      }
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
      <h2 className="text-2xl font-bold mb-6">Recipe Management</h2>
      <Card>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardHeader>
            <CardTitle>Recipe Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Recipe Title</Label>
              <Input {...register("title")} placeholder="Enter recipe title" />
              {errors?.title && <p className="text-red-500 text-sm">{errors?.title?.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="ingredients">Ingredients</Label>
              <Textarea {...register("ingredients")} placeholder="List ingredients" />
              {errors?.ingredients && <p className="text-red-500 text-sm">{errors?.ingredients?.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="steps">Steps</Label>
              <Textarea {...register("steps")} placeholder="Describe the steps" />
              {errors?.steps && <p className="text-red-500 text-sm">{errors?.steps?.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="images">Images</Label>
              <Input type="file" accept="image/*" multiple onChange={handleImageChange} />
              {errors?.images && <p className="text-red-500 text-sm">{errors?.images?.message}</p>}
              <div className="flex space-x-2 mt-2">
                {selectedImages?.map((image, index) => (
                  <div key={index} className="relative">
                    <img src={URL.createObjectURL(image)} alt="Preview" className="w-20 h-20 object-cover rounded" />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute top-0 right-0"
                      onClick={() => removeImage(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full" type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <LoaderCircleIcon className="w-4 h-4 mr-2 animate-spin" />
                  Creating Recipe...
                </>
              ) : (
                "Create Recipe"
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default RecipeManagementPage;