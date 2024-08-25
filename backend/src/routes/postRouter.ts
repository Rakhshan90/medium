import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode, sign, verify } from 'hono/jwt'
import { createPostInput,  updatePostInput } from '@rakhshan90/common-app'

export const postRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string;
        JWT_SECRET: string;
    },
    // Variables: {
    //     userId: string;
    // }
}>()


postRouter.use('/*', async (c, next) => {
    const authHeader = c.req.header('authorization')
    if (!authHeader || !authHeader.startsWith('Bearer')) {
        c.status(401)
        return c.json({ message: "Authorization failed, try login again" });
    }
    else {
        let token = authHeader.split(' ')[1];
        try {
            const payload = await verify(token, c.env.JWT_SECRET);
            if (payload) {
                c.set('jwtPayload', payload.id);
                await next();
            }
            else {
                c.status(401)
                return c.json({ message: "Error in authorizing, try login again" });
            }
        } catch (error) {
            c.status(401)
            return c.json({message: "Login failed, try login again" });
        }
    }
})


postRouter.post('/create-post', async (c) => {

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const { title, content } = await c.req.json();
    const {success} = createPostInput.safeParse({ title, content });
    if(!success){
        c.status(403)
        return c.json({message: "Failed to create post due to invalid input type"})
    }
    const authorId = c.get('jwtPayload')

    try {
        const newPost = await prisma.post.create({
            data: {
                title,
                content,
                authorId,
            }
        });

        return c.json(newPost);

    } catch (error) {
        c.status(403)
        return c.json({ message: "Creating post has been failed" });
    }
});

postRouter.put('/update-post', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const { title, content, id } = await c.req.json();
    const {success} = updatePostInput.safeParse({ title, content, id });
    if(!success){
        c.status(403)
        return c.json({message: "Failed to update post due to invalid input type"})
    }
    const authorId = c.get('jwtPayload');

    try {
        const updatedPost = await prisma.post.update({
            data: {
                title,
                content,
            },
            where: {
                id,
                authorId
            }
        });

        return c.json(updatedPost);
    } catch (error) {
        c.status(403);
        return c.json({ message: "Updating post has been failed" });
    }
});

postRouter.get('/bulk', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    try {
        const allPost = await prisma.post.findMany({
            select: {
                title: true,
                content: true,
                id: true,
                author: {
                    select: {
                        name: true,
                    }
                }
            }
        });
        return c.json(allPost);
    } catch (error) {
        c.status(403);
        return c.json({ message: `Something went wrong ${error}` });
    }
});

postRouter.get('/:id', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const id = Number(c.req.param('id'));

    try {
        const post = await prisma.post.findUnique({
            where: {
                id
            },
            select: {
                title: true,
                content: true,
                author: {
                    select: {
                        name: true,
                    }
                }
            }
        })
        return c.json(post);
    } catch (error) {
        c.status(403);
        return c.json({ message: "Failed to get post" });
    }
});