import cors from "@fastify/cors";
import fastify from "fastify";
import { routes } from "./routes";


export const app = fastify()

app.register(cors)
app.register(routes)


app.listen({
    port:3333,
}).then(() => console.log('HTTP Server is running!'))
.catch((error) => {
    throw new Error(error)
})