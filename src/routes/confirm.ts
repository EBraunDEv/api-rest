import { FastifyInstance } from "fastify";
import { prisma } from "../prisma";

export async function ConfirmEmail(app: FastifyInstance) {
    app.post('/confirm', async (request, reply) => {
        const {token} = request.body as { token: string }


        const user = await prisma.user.findFirst({
            where: {
                validation_id: token
            }
        })
        if(!user) {
            return reply.status(404).send()
        }


        await prisma.user.update({
            data: {
                checked: new Date(),
                validation_id: ''
            },
            where:{
                id:user.id
            }
        })

        return reply.status(200).send()
    })
    
}