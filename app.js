//import modules
const express=require('express');
const bodyParser=require('body-parser');
const fs=require('fs');

const loginRoutes=require('./routes/login');
const chatRoutes=require('./routes/chat');

const app=express();
//middleware
app.use(bodyParser.urlencoded({expended:true}));
//routes
app.use(loginRoutes);
app.use(chatRoutes);
//404 error handle
app.use((req,res)=>{
    res.status(404).send('<h1>Page not found</h1>');
});

//server
const port=3000;
app.listen(port,()=>{
    console.log(`server running on http://localhost:${port}`);
})