const express=require('express');
const fs=require('fs');

const router=express.Router();
//serve the chat
router.get('/',(req,res)=>{
    fs.readFile('message.txt',(err,data)=>{
        const messages=err?'':data;
        // const formattedMessages=messages
        // .split('\n').filter(line=>line.trim()!=='')
        // .map(line=>`<p>${line}</p>`)
        // .join('');
        res.send(`
            <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Group Chat</title>
      </head>
      <body>
        <div id="chat-box">
          ${messages}
        </div>
        <form action="/" method="POST">
          <input type="text" id="message" name="message" placeholder="Enter your message" required>
          <button type="submit">Send</button>
        </form>
        <script>
          document.addEventListener('DOMContentLoaded', () => {
            const username = localStorage.getItem('username');
            if (!username) {
              alert('You must log in first!');
              window.location.href = '/login';
              return;
            }

            const chatForm = document.querySelector('form');
            const usernameInput = document.createElement('input');
            usernameInput.type = 'hidden';
            usernameInput.name = 'username';
            usernameInput.value = username;

            chatForm.appendChild(usernameInput);
          });
        </script>
      </body>
      </html>
            `);
    });
});
//handle message submission
router.post('/',(req,res)=>{
    const username=req.body.username || "Unknown";
    const message=req.body.message;

    const newmsg=`${username}:${message} \n`;

    fs.appendFile('message.txt',newmsg,(err)=>{
        if(err)console.error('error writing to file',err);
        res.redirect('/')
    });
});

module.exports=router;
