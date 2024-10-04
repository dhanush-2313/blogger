import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { sign } from "hono/jwt";
import { signUpBody, signInBody } from "@dhanush2313/blogger-common";

export const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string,
    JWT_SECRET: string,
    PORT: string
  };
}>();

userRouter.post("/signup", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const body = await c.req.json();
    const success = signUpBody.safeParse(body);
    if (!success) {
      return c.json({ msg: "invalid inputs" }, 400);
    }

    const user = await prisma.user.create({
      data: {
        email: body.email,
        password: body.password,
        name: body.name,
      },
    });

    console.log("JWT_SECRET:", c.env.JWT_SECRET);

    if (!c.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not defined");
    }

    const token = await sign({ id: user.id }, c.env.JWT_SECRET);

    return c.json({
      jwt: token,
    });
  } catch (e) {
    console.error("Error occurred:", e);
    return c.json({ error: e }, 500);
  }
});

userRouter.post("/signin", async (c) => {
  try {
    const prisma = new PrismaClient({
      datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate());
    console.log(c.env?.DATABASE_URL);
    console.log(c);

    const body = await c.req.json();
    const success = signInBody.safeParse(body);
    if (!success) {
      return c.json({ msg: "invalid inputs" }, 400);
    }
    console.log("checked");

    const user = await prisma.user.findUnique({
      where: {
        email: body.email,
        password: body.password,
      },
    });

    console.log(user);

    if (!user) {
      c.status(403);
      return c.json({ error: "user not found" });
    }
    console.log("JWT_SECRET:", c.env.JWT_SECRET);
    console.log("PORT:", c.env.PORT);


    const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
    return c.json({ jwt });
  } catch (e) {
    return c.json({ error: e }, 500);
  }
});
