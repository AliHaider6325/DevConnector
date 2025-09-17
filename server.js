import express from 'express'
import connectDB from './config/db';

const app=express();

//Connecting DB
connectDB();

app.get('/',(req,res)=>{
    res.send('Api Runnning')
})
const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>console.log(`Server started on port ${PORT}`)) 