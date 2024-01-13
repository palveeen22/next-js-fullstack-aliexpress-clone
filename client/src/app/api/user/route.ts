import { NextResponse } from "next/server";

import { getUsers, createUser } from "@/database/models/user";

// validation using zod
import { z } from "zod";
import { MyResponse } from "@/types";



const userInputSchema = z
  .object({
    name: z.string(),
    username: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  });

// GET /api/users
export const GET = async () => {
  const users = await getUsers();
  return Response.json(
    {
      statusCode: 200,
      message: "Pong from GET /api/users !",
      data: users,
    },
    // Object informasi tambahan (status code, headers, dll)
    {
      // Default status here
      status: 200,
    },
  );
};


// POST / Register
export const POST = async (request: Request) => {

  try {
    const data = await request.json();

    // console.log(data.get("name"), "<<<<");

    const parsedData = userInputSchema.safeParse(data);


    // console.log(parsedData, "xxxx");
    if (!parsedData.success) {
      throw parsedData.error;
    }


    const user = await createUser(parsedData.data);
    return NextResponse.json<MyResponse<unknown>>(
      // data body to client
      {
        statusCode: 201,
        message: "Pong from POST /api/users !",
        data: user,
      },
      // here should be headers object
      {
      //adjust status code here
        status: 201,
      },
    );
  } catch (err) {
    console.log(err);
    if (err instanceof z.ZodError) {
      console.log(err);
      const errPath = err.issues[0].path[0];
      const errMessage = err.issues[0].message;
      return NextResponse.json<MyResponse<unknown>>(
        // Data yang akan dikirimkan ke client
        {
          statusCode: 400,
          error: `${errPath} - ${errMessage}`,
        },
        {
          status: 400,
        },
      );
    }
    return NextResponse.json<MyResponse<unknown>>(
      {
        statusCode: 500,
        message: "Internal Server Error !",
      },
      {
        status: 500,
      },
    );
  }
};