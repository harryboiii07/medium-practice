import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { Hono } from 'hono';
import { sign, verify } from 'hono/jwt'
import { createBlogInput, CreateBlogInput, updateBlogInput } from '@harryboiii07/medium-common';

export const blogRouter = new Hono<{
	Bindings: {
		DATABASE_URL: string,
		JWT_SECRET: string,
	},
  Variables: {
    userId : string
  }
}>();

blogRouter.use('/*', async (c, next) => {
  const header = c.req.header("Authorization") || "";
  if(!header){
    c.status(403);
    c.json({
      error : "authorization failed"
    });
  }
  const response = await verify(header,c.env.JWT_SECRET);
  if(!response){
    c.status(403);
    c.json({
      error : "authorization failed"
    })
  }
  c.set("userId",String(response.id));
  await next();
})

blogRouter.post("/", async (c) => {
  const prisma = new PrismaClient({
		datasourceUrl: c.env.DATABASE_URL	,
	}).$extends(withAccelerate()); 

  const body = await c.req.json();
  const userId = c.get("userId");
  const { success } = createBlogInput.safeParse(body);
	if(!success){
		c.status(411);
		return c.json({
			error : "invalid inputs"
		})
	}

  try{
    const post = await prisma.post.create({
      data : {
        title : body.title,
        content : body.content,
        authorId : userId,
      }
    })

    return c.json({
      id : post.id
    })
  }
  catch(e){
    console.log(e);
    c.status(411);
    return c.json({
      error : "post creation failed"
    })
  }
})

blogRouter.put("/", async (c) => {
  const prisma = new PrismaClient({
		datasourceUrl: c.env.DATABASE_URL	,
	}).$extends(withAccelerate()); 

  const body = await c.req.json();
  const userId = c.get("userId");
  const { success } = updateBlogInput.safeParse(body);
	if(!success){
		c.status(411);
		return c.json({
			error : "invalid inputs"
		})
	}

  try{
    const post = await prisma.post.update({
      where : {
        id : body.id,
        authorId : userId
      },
      data : {
        title : body.title,
        content : body.content,
      }
    })

    return c.json({
      id : post.id
    })
  }
  catch(e){
    console.log(e);
    c.status(411);
    return c.json({
      error : "post updation failed"
    })
  }
})

//todo : add pagination
blogRouter.get("/bulk", async (c) => {
  const prisma = new PrismaClient({
		datasourceUrl: c.env.DATABASE_URL	,
	}).$extends(withAccelerate()); 

  const posts = await prisma.post.findMany({
    select: {
      title : true,
      content : true,
      id : true,
      author : {
        select: {
          name : true
        }
      }
    }
  });

  return c.json({
    posts : posts
  })
})

blogRouter.get('/:id', async (c) => {
  const prisma = new PrismaClient({
		datasourceUrl: c.env.DATABASE_URL	,
	}).$extends(withAccelerate()); 

  const id = c.req.param('id');
  
  try{
    const post = await prisma.post.findFirst({
      where : {
        id : id
      },
      select : {
        id : true,
        title : true,
        content : true,
        author : {
          select : {
            name : true
          }
        }
      }
    })

    return c.json({
      post
    })
  }
  catch(e){
    console.log(e);
    c.status(411);
    return c.json({
      error : "post retrieval failed"
    })
  }
})





