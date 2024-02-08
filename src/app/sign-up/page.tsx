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
import Link from "next/link";

import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { signup } from "@/actions/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useForm } from "react-hook-form";
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

export default function SignUp() {
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
  return (
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
                      <FormDescription>Enter your password.</FormDescription>
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
  );
}
