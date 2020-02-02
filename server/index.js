require('dotenv').config();

//Middlewares
const bodyParser = require("body-parser");
const session = require('express-session');
const cors = require('cors');


//CONTROLLERS
const adminController = require('./controllers/admin_controller');
const cloudinaryController = require('./controllers/cloudinary_controller');
const userController = require('./controllers/user_controller');
const productsController = require('./controllers/products_controller');
const mongoose = require('mongoose');
const express = require('express');
const app = express();
const PORT = 3001;

mongoose.connect(process.env.CONNECTION_STRING,
    { useNewUrlParser: true },
    (err) => {
    if(err) {
        console.log('Database Error----------------', err);
    }
    console.log('Connected to database');
});

//MIDDLEWARE
//For initializing the req.body
app.use(bodyParser.json());
//For storing cookies for the user.
app.use(session({
    //Secret
    secret: process.env.SESSION_SECRET,
    //this for resaving the cookie false
    resave: false,
   //saveUnitialized best false
    saveUninitialized: false,
    cookie: {
        //The max age of the cookie
        maxAge: 1000 * 60 * 60 * 24 * 14
    }
}));

setTimeout(() => {
    app.get('/api/upload', cloudinaryController.upload);
    //Read the user's session.
    app.get('/api/user-data', userController.readUserData);
    //Add a item to cart.
    app.post('/api/user-data/cart', userController.addToCart);
    //Remove a item from the cart.
    app.delete('/api/user-data/cart/:id', userController.removeFromCart);
    //When user login
    app.get('/auth/callback', userController.login)
    //NO NEED FOR A REGISTER SINCE YOUR ARE USING AUTH0.
    //When the user logouts
    app.post('/api/logout', userController.logout);
    //Products Endpoints
    app.get('/api/products', productsController.readAllProducts);
    //Getting a specified product
    app.get('/api/products/:id', productsController.readProduct);
    //Gets the admin users.
    app.get('/api/users', adminController.getAdminUsers);
    app.post('/api/products', adminController.createProduct);
    app.put('/api/products/:id', adminController.updateProduct);
    app.delete('/api/products/:id', adminController.deleteProduct);
}, 200);

//listen on the port.
app.listen(PORT, () => console.log('Listening on Port:', PORT));