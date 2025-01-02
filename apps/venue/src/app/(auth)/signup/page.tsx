"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@repo/custom-component";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@repo/custom-component";

import { Input } from "@repo/custom-component";
import { LoadingButton } from "@repo/custom-component";
import z from "zod";
import Link from "next/link";
import { signupSchema } from "@/provider/zod";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { authClient } from "@/utils/auth-client";
import { useToast } from "@repo/custom-component";
import { useState } from "react";

export default function Signup() {
  const [pending, setPending] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "VENUE_OWNER",
    },
  });

  const onSubmit = async (values: z.infer<typeof signupSchema>) => {
    await authClient.signUp.email(
      {
        email: values.email,
        password: values.password,
        name: values.name,
        //TODO: Later extend the better-auth to support roles 
        //@ts-ignore
        role: values.role,
      },
      {
        onRequest: () => {
          setPending(true);
        },
        onSuccess: () => {
          toast({
            title: "Account created",
            description:
              "Your account has been created. Check your email for a verification link",
          });
        },
        onError: (ctx) => {
          toast({
            title: "Something went wrong",
            description: ctx.error.message ?? "Something went wrong",
          });
        },
      }
    );
    setPending(false);
  };

  return (
    <div className="grow flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Create Account</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {["name", "email", "password", "confirmPassword"].map((field) => (
                <FormField
                  control={form.control}
                  key={field}
                  name={field as keyof z.infer<typeof signupSchema>}
                  render={({ field: fieldProps }) => (
                    <FormItem>
                      <FormLabel>
                        {field.charAt(0).toUpperCase() + field.slice(1)}
                      </FormLabel>
                      <FormControl>
                        <Input
                          type={
                            field.includes("password")
                              ? "password"
                              : field === "email"
                              ? "email"
                              : "text"
                          }
                          placeholder={`Enter your ${field}`}
                          {...fieldProps}
                          autoComplete="off"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}
              <LoadingButton pending={pending}>Sign up</LoadingButton>
            </form>
          </Form>
          <div className="mt-4 text-center text-sm">
            <Link href="/login" className="text-primary hover:underline">
              Already have an account? Login
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
