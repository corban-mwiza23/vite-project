const mysql = require('mysql2');
const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'library_db'
});

db.connect((err)=>{
    if(err){
        console.log('Connection Failed'+err.stack);
    }
    else{
        console.log('Connected Successfully');
    }
})

app.post('/api/register',(req,res)=>{
    const{username,password,role}=req.body;
    db.query(
        'SELECT * FROM users WHERE username=? AND password=?',
        [username,password],
        (selErr,selResult)=>{
            if(selErr) return res.status(500).json({Error: err});
            if(selResult.length>0){
                return res.status(409).json({message: 'User already exists'});
            }
        db.query(
            'INSERT INTO users(username,password,role) VALUES(?,?,?)',
            [username,password,role],
            (err,result)=>{
                if(err) return res.status(500).json({Error: err});
                res.status(200).json({message: 'User registered'});
            }
        )
        }
    )
})

app.post('/api/login',(req,res)=>{
    const{username,password}=req.body;
    db.query(
        'SELECT * FROM users WHERE username=? AND password=?',
        [username,password],
        (err,result)=>{
            if(err) return res.status(500).json({Error: err});
            if(result.length>0){
                res.status(200).json({message: 'User Logged In'});
            }
            else{
                res.status(401).json({message: 'Invalid Credentials'})
            }
        }
    )
})

app.get('/api/findMembers',(req,res)=>{
    db.query(
        'SELECT * FROM members',
        (err,result)=>{
            if(err) return res.status(500).json({Error:err});
            res.status(200).json(result);
        }
    )
})

app.get('/api/findMembers/:id',(req,res)=>{
    const{id} = req.params;
    db.query(
        'SELECT * FROM members WHERE memberId=?',
        [id],
        (err,result)=>{
            if(err) return res.status(500).json({Error:err});
            res.status(200).json(result[0]);
        }
    )
})

app.post('/api/add-members',(req,res)=>{
    const{firstName,lastName,email,phone}=req.body;
    db.query(
        'SELECT * FROM members WHERE firstName=? AND lastName=?',
        [firstName,lastName],
        (selErr,selResult)=>{
            if(selErr) return res.status(500).json({Error: err});
            if(selResult.length>0){
                return res.status(409).json({message: 'Member Already Exits'});
            }
        db.query(
            'INSERT INTO members(firstName,lastName,email,phone) VALUES(?,?,?,?)',
            [firstName,lastName,email,phone],
            (err,result)=>{
                if(err) return res.status(500).json({Error: err});
                res.status(200).json({message: 'Member registered'});
            }
        )
        }
    )
})

app.put('/api/update-members/:id',(req,res)=>{
    const{id} = req.params;
    const{firstName,lastName,email,phone}=req.body;
        db.query(
            'UPDATE members SET firstName=?,lastName=?,email=?,phone=? WHERE memberId=?',
            [firstName,lastName,email,phone,id],
            (err,result)=>{
                if(err) return res.status(500).json({Error: err});
                res.status(200).json({message: 'updated successfully'});
            }
    )
})

app.delete('/api/deleteMember/:id',(req,res)=>{
    const{id}=req.params;
    db.query(
        'DELETE FROM members WHERE memberId=?',
        [id],
        (err,result)=>{
            if(err) return res.status(500).json({Error:err});
            if(result.affectedRows==0){
                return res.status(409).json({message: 'member not found'})
            }
            res.status(200).json({message: 'Member Deleted'})
        }
    )
})

app.post('/api/add-media',(req,res)=>{
    const{title,type,author,publisher,year,availableCopies}=req.body;
    db.query(
        'SELECT * FROM media WHERE title=? AND type=?',
        [title,type],
        (selErr,selResult)=>{
            if(selErr) return res.status(500).json({Error: err});
            if(selResult.length>0){
                return res.status(409).json({message: 'Media Already Exits'});
            }
        db.query(
            'INSERT INTO media(title,type,author,publisher,year,availableCopies) VALUES(?,?,?,?,?,?)',
            [title,type,author,publisher,year,availableCopies],
            (err,result)=>{
                if(err) return res.status(500).json({Error: err});
                return res.status(200).json({message: 'Media registered'});
            }
        )
        }
    )
})

app.get('/api/getMedia',(req,res)=>{
    db.query(
        'SELECT * FROM media',
        (err,result)=>{
            if(err) return res.status(500).json({Error:err});
            res.status(200).json(result)
        }
    )
})

app.listen(port,()=>{
    console.log(`Server is listening on port: ${port}`);
})