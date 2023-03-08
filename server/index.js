const express = require('express')
const app = express()
const {genPass,checkPasswordStrength} = require('./util')
const cors = require('cors')

require('dotenv').config()

app.use(express.json());

app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader("Access-Control-Allow-Headers", "*");
    next();
  })

function getPass(passLen)
{
    const {password,status} = genPass(passLen)

    console.log(password,passLen)
    console.log(status)

    if(status)
    {
        return password
    }
    else
    {
        getPass(passLen)
    }

}



app.post('/api/getPass',(req,res) => {

    const passLen = req.body.length

    password = getPass(passLen)

    res.json({
        "status": "success",
        "data": {
            "password":password
        },
        "message":"secured password is generated"
      })
    

})

/* 

0-6 points: Weak password, easily guessable or crackable
7-11 points: Moderate password, somewhat secure but could be improved
12-16 points: Strong password, relatively secure
17+ points: Very strong password, highly secure

*/

app.post('/api/checkPass',(req,res) => {

    const pass = req.body.password
    
    const score = checkPasswordStrength(pass)

    if(!score)
    {
        return res.json({
            "status": "failed",
            "data": {
                "score":-99,
                "info":"Inputed password is not correct"

            },
            "message":"password isn't scored"
          })
    }

    if(score <= 6)
    {
        return res.json({
            "status": "success",
            "data": {
                "score":score,
                "info":"Weak password, easily guessable or crackable"
            },
            "message":"password is scored"
          })
    }
    else if(score >= 7 && score <= 11)
    {
        return res.json({
            "status": "success",
            "data": {
                "score":score,
                "info":"Moderate password, somewhat secure but could be improved"
            },
            "message":"password is scored"
          })
    }
    else if(score >=12 && score <=16)
    {
        return res.json({
            "status": "success",
            "data": {
                "score":score,
                "info":"Strong password, relatively secure"
            },
            "message":"password is scored"
          })
    }
    else if(score >=17)
    {
        return res.json({
            "status": "success",
            "data": {
                "score":score,
                "info":" Very strong password, highly secure"
            },
            "message":"password is scored"
          })
    }
})

app.listen(process.env.BACKEND_PORT,() => console.log(`backend is running on ${process.env.BACKEND_PORT}`))