import express from 'express'
import dotenv from 'dotenv'
import authRoute from './routes/authRoute'
import notesRouter from './routes/notesRoute'
import cors from 'cors'

dotenv.config()


const app = express()
const port = process.env.PORT || 8081

// middlewares
app.use(express.json())
app.use(cors({
    origin:'http://localhost:3000',
    credentials:true
}))


app.use('/api',authRoute)
app.use('/api',notesRouter)


app.get('/',(req,res)=>{
    res.send('helllo')
})

app.listen(port,()=>{
    console.log(`Server Started at http://localhost:${port}`)
})