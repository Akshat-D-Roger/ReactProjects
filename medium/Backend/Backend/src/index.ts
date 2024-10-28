import { Hono } from 'hono'
import { cors } from 'hono/cors'
import userRouter from './routes/userRoute'
import blogRouter from './routes/blogRoute'

const app = new Hono()

app.use('*', cors())

app.route('/api/v1/user', userRouter)
app.route('/api/v1/blog', blogRouter)

export default app
