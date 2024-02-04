const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
const multer = require('multer')
const fs = require('fs')
const path = require('path')

const port = 3000
const salt = bcrypt.genSaltSync(10)
const secret = "kj23b423klb34h543nrhbfnjhb45mk43"
const uploadMiddleware = multer({ dest: 'uploads/' })
const app = express()

const UserModel = require('./models/User')
const TicketModel = require('./models/Tickets')

mongoose.connect('mongodb+srv://ranjansinhaharikesh:cQcCt7oTjuJyLq4u@cluster0.9oiugsm.mongodb.net/')

app.use(express.json())
app.use(cookieParser())
app.use(cors({ credentials: true, origin: 'http://localhost:5173' }))
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

app.post("/register-user", async (req, res) => {
    const { firstName, lastName, email, number, password } = req.body

    try {
        const userDoc = await UserModel.create({
            firstName,
            lastName,
            email,
            number,
            password: bcrypt.hashSync(password, salt)
        })

        res.json(userDoc)
    } catch (err) {
        if (err.code === 11000) {
            res.status(400).json({ error: "User already exists" })
        }
    }
})

app.post('/login', async (req, res) => {
    const { username, password } = req.body
    const userDoc = await UserModel.findOne({ email: username })

    if (!userDoc) {
        return res.status(400).json({ error: 'User not found' })
    }

    const passOk = bcrypt.compareSync(password, userDoc.password)

    if (passOk) {
        const tokenPayload = {
            username,
            firstName: userDoc.firstName,
            lastName: userDoc.lastName,
            number: userDoc.number,
            id: userDoc._id
        }

        jwt.sign(tokenPayload, secret, {}, (err, token) => {
            if (err) {
                console.error("Error signing token: ", err)
                return res.status(401).json({ error: "Internal Server Error" })
            }

            res.cookie('token', token, { httpOnly: true, secure: true }).json({
                id: userDoc._id,
                username,
                firstName: userDoc.firstName,
                lastName: userDoc.lastName,
                number: userDoc.number
            })
        })
    } else {
        res.status(400).json({ error: 'Incorrect credentials' })
    }
})

app.get('/profile', (req, res) => {
    const { token } = req.cookies

    if (!token) {
        return res.status(401).json({ error: "Unauthorized User" })
    }

    jwt.verify(token, secret, {}, (err, info) => {
        if (err) {
            console.error("JWT Verification Error: \n\n", err)
            return res.status(401).json({ error: "Unauthorized User" })
        }

        res.json(info)
    })
})

app.post('/logout', (req, res) => {
    res.cookie('token', '').json('ok')
})

app.get('/user-profile', (req, res) => {
    const { token } = req.cookies

    if (!token) {
        return res.status(401).json({ error: "Unauthorized User" })
    }

    jwt.verify(token, secret, {}, (err, info) => {
        if (err) {
            console.error("JWT Verification Error: \n\n", err)
            return res.status(401).json({ error: "Unauthorized User" })
        }

        res.json(info)
    })
})

app.get('/tickets', async (req, res) => {
    try {
        const tickets = await TicketModel
            .find()
            .populate('author', ['firstName', 'lastName', 'number', 'email'])
            .sort({ createdAt: -1 });

        res.json(tickets);
    } catch (error) {
        console.error('Error fetching tickets:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post('/tickets', uploadMiddleware.fields([
    { name: 'img1', maxCount: 1 },
    { name: 'img2', maxCount: 1 },
    { name: 'img3', maxCount: 1 },
    { name: 'img4', maxCount: 1 },
]), async (req, res) => {
    try {
        let img1NewPath, img2NewPath, img3NewPath, img4NewPath;

        // Process img1
        const img1Info = req.files && req.files['img1'] && req.files['img1'][0];
        if (img1Info) {
            const img1Originalname = img1Info.originalname;
            const img1Path = img1Info.path;
            const img1Part = img1Originalname.split('.');
            const img1Ext = img1Part[img1Part.length - 1];
            img1NewPath = img1Path + '.' + img1Ext;
            fs.renameSync(img1Path, img1NewPath);
        }

        // Process img2 (similar checks)
        const img2Info = req.files && req.files['img2'] && req.files['img2'][0];
        if (img2Info) {
            const img2Originalname = img2Info.originalname;
            const img2Path = img2Info.path;
            const img2Part = img2Originalname.split('.');
            const img2Ext = img2Part[img2Part.length - 1];
            img2NewPath = img2Path + '.' + img2Ext;
            fs.renameSync(img2Path, img2NewPath);
        }

        // Process img3 (similar checks)
        const img3Info = req.files && req.files['img3'] && req.files['img3'][0];
        if (img3Info) {
            const img3Originalname = img3Info.originalname;
            const img3Path = img3Info.path;
            const img3Part = img3Originalname.split('.');
            const img3Ext = img3Part[img3Part.length - 1];
            img3NewPath = img3Path + '.' + img3Ext;
            fs.renameSync(img3Path, img3NewPath);
        }

        // Process img4 (similar checks)
        const img4Info = req.files && req.files['img4'] && req.files['img4'][0];
        if (img4Info) {
            const img4Originalname = img4Info.originalname;
            const img4Path = img4Info.path;
            const img4Part = img4Originalname.split('.');
            const img4Ext = img4Part[img4Part.length - 1];
            img4NewPath = img4Path + '.' + img4Ext;
            fs.renameSync(img4Path, img4NewPath);
        }

        const { token } = req.cookies
        jwt.verify(token, secret, {}, async (err, info) => {
            if (err) throw err

            const { title, summary, content, date, time, ticket, dressCode, ticketPrice, upi } = req.body
            const ticketDoc = await TicketModel.create({
                title,
                summary,
                content,
                date,
                time,
                ticket,
                dressCode,
                ticketPrice,
                upi,
                img1Cover: img1NewPath || null,
                img2Cover: img2NewPath || null,
                img3Cover: img3NewPath || null,
                img4Cover: img4NewPath || null,
                author: info.id,
            })

            res.json(ticketDoc)
        })
    } catch (err) {
        console.error('Error creating post:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

app.get('/ticket/:id', async (req, res) => {
    const { id } = req.params;

    // Check if id is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'Invalid ticket ID' });
    }

    const ticketDoc = await TicketModel.findById(id).populate('author', ['firstName']);

    if (!ticketDoc) {
        return res.status(404).json({ error: 'Ticket not found' });
    }

    res.json(ticketDoc);
});

app.listen(port, (req, res) => {
    console.log(`Your server is running at port ${port}`)
})

// cQcCt7oTjuJyLq4u