'use server';

import { redirect } from "next/navigation";


import { NextResponse } from "next/server";

import { getUsers, createUser } from "@/database/models/user";

// validation using zod
import { z } from "zod";


const userInputSchema = z
  .object({
    name: z.string(),
    username: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  });

  export const handleFormAction = async (formData: FormData) => {

    type MyResponse<T> = {
      statusCode: number;
      message?: string;
      data?: T;
      error?: string;
    };


    // Fetch
    // Server to Server = gw harus memberikan full domain path
    // - baseUrl = http://xxx.vercel.app
    // await fetch("http://xxx.vercel.app/api/user")
    
    // Client to Server = gw TIDAK HARUS memberikan full domain path
    // - baseUrl = http://yyy.vercel.app
    // await fetch("/api/user");

    const response = await fetch('http://localhost:3000/api/user', {
      method: 'POST',
      body: JSON.stringify({
        name: formData.get('name'),
        username: formData.get('username'),
        email: formData.get('email'),
        password: formData.get('password')
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });

      const responseJson: MyResponse<unknown> = await response.json();
      

      if (!response.ok) {
        console.log(responseJson.error, "xxx");
          
      let message = responseJson.error ?? 'Something went wrong!';

      return redirect(`/register?error=${message}`);
    }

    return redirect('/login');
  };