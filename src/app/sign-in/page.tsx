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
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { login } from "@/actions/auth";
import { useToast } from "@/components/ui/use-toast";
import { ReloadIcon } from "@radix-ui/react-icons";
import Link from "next/link";

const formSchema = z.object({
  email: z.string().min(2, {
    message: "Email must be at least 2 characters.",
  }),
  password: z.string().min(1, {
    message: "Password must be at least 1 characters.",
  }),
});

export default function SignIn() {
  const router = useRouter();
  const { toast } = useToast();
  const [error, setError] = useState(null);
  const [load, setLoad] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setLoad(true);
      console.log(values);
      const res = await login(values);
      console.log(res);
      router.push("/dashboard");
    } catch (e: any) {
      console.log("he;;");
      console.log(e);
      setLoad(false);
      setError(e.message);
      toast({
        variant: "destructive",
        title: "Log in Failed",
        description: e.message,
      });
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div>
        <Card className="w-[350px] text-[#395886] bg-[#F0F3FA]">
          <div className="pl-44">
            <div className="ellipse" />
            <div className="ml-24">
              <div className="ellipse-2" />
            </div>
          </div>
          <CardHeader>
            <CardTitle>Welcome Back</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
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
                      Log In
                    </Button>
                  )}
                  <Link href="/sign-up">
                    <Button className="bg-[#D5DEEF] w-36 text-[#395886] hover:text-white hover:bg-[#395886]">
                      Sign up
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
