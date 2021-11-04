const path = require('path');

const express = require('express');
const mongoose = require('mongoose');
const app = new express();

mongoose.connect('mongodb://localhost:27017/nodejs-blog', { useNewUrlParser: true })
    .then(() => 'You are now connected to Mongo!')
    .catch(err => console.error('Something went wrong', err))

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'pages/index.html'));
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

app.listen(4000, () => {
    console.log('App listening on port 4000')
}); 
