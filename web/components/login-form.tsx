"use client";

import Link from "next/link";
import { useState } from "react";

import { useToast } from "@/hooks/use-toast";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { AudioWaveform } from "lucide-react";

import AuthenticationService from "@/services/authentication.service";

import { ISignInCredentials } from "@/models/authentication";

import LoadingSpinner from "@/components/ui/loading-spinner";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const formSchema = z.object({
  email: z.string().email({ message: "Enter a valid email address." }).min(2, {
    message: "Email must be at least 2 characters.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
});

export function LoginForm() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const defaultValues: ISignInCredentials = {
    email: "",
    password: "",
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues,
  });

  const loginHandler = async (data: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    try {
      await AuthenticationService.signIn(data);
      toast({
        title: "Success",
        description: "Logging you in.",
      });
      window.location.href = "/programs/";
      setIsLoading(false);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error?.detail,
      });
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md border-none shadow-none">
      <CardHeader>
        <div className="w-full flex justify-center">
          <div className="flex aspect-square size-12 items-center justify-center rounded-lg bg-emerald-700 text-sidebar-primary-foreground">
            <AudioWaveform className="size-4" />
          </div>
        </div>{" "}
        <br />
        <h2 className="text-center text-2xl font-extrabold text-foreground">
          Login
        </h2>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(loginHandler)}>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <FormLabel>Email</FormLabel>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid gap-2">
                <FormLabel>Password</FormLabel>
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input type="password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex items-center">
                  <Link
                    href="/forgot-password"
                    className="ml-auto inline-block text-sm underline"
                  >
                    Forgot your password?
                  </Link>
                </div>
              </div>
              <Button type="submit" className="w-full">
                {isLoading ? <LoadingSpinner /> : "Login"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
