import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode, sign, verify } from 'hono/jwt'
import { signupInput, signinInput } from '@rakhshan90/common-app'

export const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string,
    JWT_SECRET: string
  }
}>()

userRouter.post('/signup', async (c) => {

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())

  const { name, email, password } = await c.req.json();
  const {success} = signupInput.safeParse({name, email, password});
  if(!success) {
    c.status(403)
    return c.json({message: "Invalid user information type"})
  }

  try {
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password
      }
    });

    const token = await sign({ id: newUser.id }, c.env.JWT_SECRET);
    return c.json(token);

  } catch (e) {
    c.status(403)
    return c.text("Something went wrong");
  }

});

userRouter.post('/signin', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())

  const {email, password} = await c.req.json();
  const {success} = signinInput.safeParse({email, password});
  if(!success){
    c.status(403)
    return c.json({message: "Invalid input type"})
  }
  
  const findUser = await prisma.user.findUnique({
    where: {email, password}
  })

  if(!findUser){
    c.status(403);
    return c.text("Invalid email and password");
  }

  try {
    const token = await sign({id: findUser.id}, c.env.JWT_SECRET);
    return c.json(token);
  } catch (e) {
    c.status(403);
    return c.text("Login failed, try again");
  }
});