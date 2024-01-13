"use server";
import { getUserByEmail } from "@/database/models/user";
import { compareTextWithHash } from "@/database/utils/hash";
import { createToken } from "@/lib/jwt";
import { redirect } from "next/navigation";
import { z } from "zod";
import { cookies } from "next/headers";



export const LoginProcess = async (formData: FormData) => {
    const loginInputSchema = z.object({
        email: z.string().email(),
        password: z.string(),
    })

    //get data
  const email = formData.get("email");
  const password = formData.get("password");

//   validator
 const parsedData = loginInputSchema.safeParse({
    email,
    password,
  });

    
  if (!parsedData.success) {
    const errorPath = parsedData.error.issues[0].path[0];
    const errorMessage = parsedData.error.issues[0].message;
    const responError = `${errorPath} - ${errorMessage}`;

    // get error via params
    return redirect(`http://localhost:3000/login?error=${responError}`);
  }

  // validation email compare in db 
  const user = await getUserByEmail(parsedData.data.email);

  if (!user || !compareTextWithHash(parsedData.data.password, user.password)) {
    return redirect(`http://localhost:3000/login?error=Invalid%20input%20data`);
  }
    
//create login payload
 const payload = {
    id: user._id,
    email: user.email,
 };
    
  console.log(payload);

  
const token = createToken(payload);
    

// store token to cookies
  cookies().set("token", token, {
    httpOnly: true,
    secure: false,
    //set exprired cookies
    expires: new Date(Date.now() + 1000 * 60 * 60), // 1 hour
    //set only hit by same endpoint only
    // sameSite: "strict",
  });
    
    // if succes
  return redirect(`http://localhost:3000/`);
}



