import { ConfirmEmail } from "./routes/confirm"
import { CreateUser } from "./routes/create"
import { app } from "./server"

export const routes = async () => {
    app.register(CreateUser)
    app.register(ConfirmEmail)
}