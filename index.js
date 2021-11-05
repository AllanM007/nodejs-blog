const path = require('path');

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const fileUpload = require("express-fileupload");

const Post = require('./database/models/Post');


const app = new express();

mongoose.connect('mongodb://localhost:27017/nodejs-blog', { useNewUrlParser: true })
    .then(() => 'You are now connected to Mongo!')
    .catch(err => console.error('Something went wrong', err))

app.use(express.static('public'));
app.use(fileUpload());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}));

// app.get('/', (req, res) => {
//     res.sendFile(path.resolve(__dirname, 'pages/index.html'));
// });

app.get('/', async (req, res) => {
    const posts = await Post.find({})
    res.sendFile(path.resolve(__dirname, 'pages/index.html'), {
        posts
    })
});

app.get('/posts/new', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'pages/create.html'));
})

app.post("/posts/store", (req, res) => {
    const {
        image
    } = req.files

    image.mv(path.resolve(__dirname, 'public/posts', image.name), (error) => {
        Post.create({
            ...req.body,
            image: `/posts/${image.name}`
        }, (error, post) => {
            res.redirect('/');
        });
    })
});

app.get('/post', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'pages/post.html'));
});

app.get('/contact', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'pages/contact.html'));
});

app.get('/about', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'pages/about.html'));
});

app.post('/posts/store', (req, res) => {
    Post.create(req.body, (error, post) => {
        res.redirect('/')
    })
});

app.listen(4000, () => {
    console.log('App listening on port 4000')
}); 
