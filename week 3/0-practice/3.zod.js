// using zod library for problem statement of ./2.nozod.js 

const express = require('express');
const z= require('zod');
const fs = require('fs')
const app = express();
app.use(express.json());

app.listen(3000)

// zod schema 
const Userschema = z.object({
    Username: z.string().min(6), // Username should be at least 6 characters long
    Password: z.string()
        .min(6) // Password should be at least 6 characters long
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/, "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character")
});

// a greatly complicated input validation function implemented easily with zod 
function inputverify(req,res,next){
    try{
        Userschema.parse(req.body)
        next();
    }
    catch{
        res.send('invalid username or password')
    }
}
// same logic for auth 
function existCheck(req, res, next) {
    fs.readFile('./login_info.json', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
            return;
        }

        let db = JSON.parse(data);
        const existingUser = db.find(user => user.username === req.body.Username);

        if (existingUser) {
            res.status(409).send('Username already exists');
            return;
        }

        // Add the new user to the database
        db.push({
            username: req.body.Username,
            password: req.body.Password,
        });

        // Write the updated database back to the file
        fs.writeFile('./login_info.json', JSON.stringify(db), (err) => {
            if (err) {
                console.error(err);
                res.status(500).send('Internal Server Error');
                return;
            }
            next();
        });
    });
}

// postlogic 
app.post('/login',inputverify,existCheck,(req,res)=>{
    res.send('account created ')
})

app.use((err,req,res,next)=>{
    console.log('error')
})