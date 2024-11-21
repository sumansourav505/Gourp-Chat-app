const express=require('express');
const router=express.Router();
//serve the login form
router.get('/login',(req,res)=>{
    res.send(`
        <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Login</title>
    </head>
    <body>
      <form onsubmit="saveUsername(event)">
        <label for="username">Enter your username:</label>
        <input type="text" id="username" name="username" required>
        <button type="submit">Login</button>
      </form>
      <script>
        function saveUsername(event) {
          event.preventDefault();
          const username = document.getElementById('username').value;
          localStorage.setItem('username', username);
          window.location.href = '/';
        }
      </script>
    </body>
    </html>
        `);
});

module.exports=router;