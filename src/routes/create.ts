import { FastifyInstance } from "fastify";
import nodemailer from 'nodemailer';
import { prisma } from "../prisma";

export async function CreateUser(app: FastifyInstance) {
    app.post('/create-user', async  (request, reply) => {
        const {email} = request.body as { email: string}

     const user =   await prisma.user.create({
            data: {
                email,
            }
        })

        const transpoder = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.EMAIL_PASSWORD
            }
        })
        
        const mailOpitions = {
            from: process.env.EMAIL,
            to: user.email,
            subject: 'Confirme seu email clicando no link abaixo e começe a ultilizar nosso app!',
            text: `http://localhost:3000/api/email?token=${user.validation_id}`
        }

        transpoder.sendMail(mailOpitions, (error, info) => {
            if(error) {
                return reply.status(500).send()
            }
            
        })

        return reply.status(200).send
    })
}