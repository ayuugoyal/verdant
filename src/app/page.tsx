"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import * as React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  type CarouselApi,
} from "@/components/ui/carousel";
import Image from "next/image";

import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { signup } from "@/actions/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useForm } from "react-hook-form";
import Link from "next/link";

const formSchema = z.object({
  email: z.string().min(2, {
    message: "Email must be at least 2 characters.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
  name: z.string().min(1, {
    message: "Name must be at least 1 characters.",
  }),
});

export default function Home() {
  const router = useRouter();
  const { toast } = useToast();

  const [error, setError] = useState(null);
  const [load, setLoad] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setLoad(true);
      console.log(values);
      const res = await signup(values);
      console.log(res);
      router.push("/dashboard");
    } catch (e: any) {
      console.log(e);
      setLoad(false);
      setError(e.message);
      toast({
        variant: "destructive",
        title: "Sign Up Failed",
        description: e.message,
      });
    }
  }

  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  const [showLoader, setShowLoader] = React.useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoader(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <>
      {showLoader ? (
        <div
          className="flex justify-center items-center h-screen"
          style={{
            backgroundImage: "url('/shadow-1.png')",
            backgroundSize: "cover",
          }}
        >
          <Image
            src={"/logo.png"}
            alt="logo"
            className="z-10"
            height={200}
            width={200}
          ></Image>
        </div>
      ) : current == 4 ? (
        <div className="flex justify-center w-full items-center min-h-screen">
          <div>
            <Card className="w-[350px] text-[#395886] bg-[#F0F3FA]">
              <div className="pl-44">
                <div className="ellipse" />
                <div className="ml-24">
                  <div className="ellipse-2" />
                </div>
              </div>
              <CardHeader>
                <CardTitle>Create Account</CardTitle>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-1"
                  >
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Email"
                              {...field}
                              className="bg-[#F0F3FA]"
                            />
                          </FormControl>
                          <FormDescription>Enter your email.</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Password"
                              {...field}
                              className="bg-[#F0F3FA]"
                            />
                          </FormControl>
                          <FormDescription>
                            Enter your password.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Name"
                              {...field}
                              className="bg-[#F0F3FA]"
                            />
                          </FormControl>
                          <FormDescription>Enter your Name.</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="flex justify-between">
                      {load ? (
                        <Button disabled className="w-36">
                          <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                          Please wait
                        </Button>
                      ) : (
                        <Button
                          type="submit"
                          className="w-36 bg-[#395886] hover:shadow-xl hover:bg-[#395886]"
                        >
                          Sign Up
                        </Button>
                      )}
                      <Link href="/sign-in">
                        <Button className="bg-[#D5DEEF] w-36 text-[#395886] hover:text-white hover:bg-[#395886]">
                          Log In
                        </Button>
                      </Link>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center h-screen">
          <Carousel setApi={setApi} className="w-full max-w-xs bg-[#F0F3FA]">
            <CarouselContent>
              {Array.from({ length: 4 }).map((_, index) => (
                <CarouselItem key={index}>
                  <Card>
                    <CardContent className="flex aspect-square items-center justify-center p-6 bg-[#F0F3FA]">
                      <Image
                        src={`/${index + 1}.png`}
                        alt={`Slide ${index + 1}`}
                        width={300}
                        height={300}
                      />
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
          <div className="py-2 text-center text-[#395886]">
            {current == 1 ? (
              <div className="w-full max-w-xs">
                <div className="text-xl font-semibold">Clean and Fit</div>
                <div className="text-sm mt-6">
                  Verdant is an AI tool whose prime focus is to help you get
                  fit. The catch is that you will solve Global Warming too.
                </div>
              </div>
            ) : current == 2 ? (
              <div className="w-full max-w-xs">
                <div className="text-xl font-semibold">Task Fit</div>
                <div className="text-sm mt-6">
                  You do not have to worry about time management anymore because
                  Veradnt will do that for you. It will guide you to help
                  complete your tasks and also get optimal while you are at it.
                </div>
              </div>
            ) : (
              <div className="w-full max-w-xs">
                <div className="text-xl font-semibold">
                  Contribute and Socialise
                </div>
                <div className="text-sm mt-6">
                  Connect with friends or join a community you love.
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
