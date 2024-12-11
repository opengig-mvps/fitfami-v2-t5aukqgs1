'use client' ;
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Heart, Image, Star, Camera, VideoIcon, ArrowRight } from "lucide-react";

const LandingPage = () => {
  return (
    <div className="bg-sky-500 flex flex-col min-h-screen text-white">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-blue-400 to-sky-500">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-4xl font-bold tracking-tighter sm:text-6xl xl:text-7xl">
                    Share Your Favorite Food Recipes
                  </h1>
                  <p className="max-w-[600px] text-lg md:text-xl">
                    Join our community of food enthusiasts to share and discover amazing recipes!
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button className="bg-white text-sky-500 hover:bg-gray-200">
                    Get Started
                  </Button>
                  <Button className="border border-white text-white hover:bg-white hover:text-sky-500">
                    Learn More
                  </Button>
                </div>
              </div>
              <img
                src="https://fastly.picsum.photos/id/13/2500/1667.jpg?hmac=SoX9UoHhN8HyklRA4A3vcCWJMVtiBXUg0W4ljWTor7s"
                alt="Hero"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last lg:aspect-square"
              />
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-white text-black">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Explore Recipes</h2>
                <p className="max-w-[900px] text-lg md:text-xl">
                  Discover a wide variety of recipes from around the world.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
              <Card className="flex flex-col items-center space-y-4">
                <Camera className="h-12 w-12 text-sky-500" />
                <CardHeader>
                  <CardTitle>Share Photos</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-center">
                    Capture and share photos of your favorite dishes.
                  </p>
                </CardContent>
              </Card>
              <Card className="flex flex-col items-center space-y-4">
                <VideoIcon className="h-12 w-12 text-sky-500" />
                <CardHeader>
                  <CardTitle>Upload Videos</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-center">
                    Upload cooking videos to showcase your recipes.
                  </p>
                </CardContent>
              </Card>
              <Card className="flex flex-col items-center space-y-4">
                <Heart className="h-12 w-12 text-sky-500" />
                <CardHeader>
                  <CardTitle>Get Likes</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-center">
                    Receive likes and feedback from the community.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-sky-100 text-black">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Featured Recipes</h2>
                <p className="max-w-[900px] text-lg md:text-xl">
                  Check out some of the most popular recipes shared by our community.
                </p>
              </div>
              <div className="grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
                {Array.from({ length: 3 }).map((_, index) => (
                  <Card key={index} className="flex flex-col items-start space-y-4 p-6">
                    <img
                      src={`https://picsum.photos/seed/picsum/${200 + index}/300`}
                      alt={`Recipe ${index + 1}`}
                      className="w-full rounded-lg"
                    />
                    <CardContent>
                      <p className="font-medium">Recipe Title {index + 1}</p>
                      <p className="text-muted-foreground">Description of the recipe goes here.</p>
                    </CardContent>
                    <CardFooter className="flex items-center justify-between w-full">
                      <Button variant="link" className="text-sky-500">
                        View Recipe <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="bg-sky-600 p-6 md:py-12 w-full text-white">
        <div className="container max-w-7xl grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8 text-sm">
          <div className="grid gap-1">
            <h3 className="font-semibold">Product</h3>
            <a href="#">Features</a>
            <a href="#">How it works</a>
            <a href="#">Pricing</a>
            <a href="#">Security</a>
          </div>
          <div className="grid gap-1">
            <h3 className="font-semibold">Company</h3>
            <a href="#">About Us</a>
            <a href="#">Careers</a>
            <a href="#">Blog</a>
            <a href="#">Contact</a>
          </div>
          <div className="grid gap-1">
            <h3 className="font-semibold">Resources</h3>
            <a href="#">Documentation</a>
            <a href="#">Help Center</a>
            <a href="#">Community</a>
            <a href="#">Templates</a>
          </div>
          <div className="grid gap-1">
            <h3 className="font-semibold">Legal</h3>
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;