import express from 'express'
import dotenv from 'dotenv'
import authRoute from './routes/authRoute'

dotenv.config()


const app = express()
const port = process.env.PORT || 8081

// middlewares
app.use(express.json())


app.use('/api',authRoute)


app.get('/',(req,res)=>{
    res.send('helllo')
})

app.listen(port,()=>{
    console.log(`Server Started at http://localhost:${port}`)
})