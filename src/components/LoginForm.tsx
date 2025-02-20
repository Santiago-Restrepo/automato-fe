// src/app/login/LoginForm.tsx (Client Component)
"use client";

import {
  addToast,
  Button,
  Card,
  CardBody,
  CardHeader,
  Form,
  Input,
  Link,
} from "@heroui/react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FormEvent } from "react";
export default function LoginForm() {
  const router = useRouter();

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = Object.fromEntries(new FormData(e.currentTarget));
    const response = await signIn("credentials", {
      redirect: false,
      ...data,
    });
    if (response?.error) {
      addToast({
        title: "Wrong Credentials",
        color: "danger",
      });
    } else {
      router.push("/");
    }
  };
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <Card className="p-5 w-full max-w-lg">
        <CardHeader className="flex justify-center">
          <h1 className="font-semibold text-2xl">Login</h1>
        </CardHeader>
        <CardBody>
          <Form className="w-full" onSubmit={onSubmit}>
            <Input
              isRequired
              errorMessage="Please enter a valid Username"
              label="Username"
              labelPlacement="outside"
              name="username"
              placeholder="Enter your username"
              type="text"
            />
            <Input
              isRequired
              errorMessage="Please enter a password"
              label="Password"
              labelPlacement="outside"
              name="password"
              placeholder="Enter your password"
              type="password"
            />
            <Button
              type="submit"
              variant="solid"
              className="w-full bg-black text-white font-semibold mt-4"
            >
              Submit
            </Button>
          </Form>
        </CardBody>
      </Card>
      <p className="mt-4">
        Don't have an account? <Link href="signup">Sign Up</Link>
      </p>
    </div>
  );
}
