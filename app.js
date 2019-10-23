const express = require('express');
const session = require('express-session');
const redis = require('redis');
const bot = require('./bot');

const app = express();
const token = process.env.TOKEN;

/**
 * Session handling, so there's a bunch of useful data available.
 * This also initializes the connection to the Redis server which caches all the sessions.
 */
let redisClient = redis.createClient({
    host: 'redis'
});
let storage = require('connect-redis')(session);
app.use(
    session({
        store: new storage({client: redisClient}),
        secret: 'skidaddle skidoodle, your dick is now a noodle', // Excuse me.
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 3 * 24 * 60 * 60 * 1000 // 3 days. Discord's tokens last 7 days. This is to prevent having to re-generate tokens, that's boring.
        }
    })
);

/**
 * Setting routes.
 */
const routeIndex = require('./routes/index');
const routeDiscord = require('./routes/discord');
const routeLogin = require('./routes/login');
const routeLogout = require('./routes/logout');
const routeVerify = require('./routes/verify');
app.use('/discord', routeDiscord);
app.use('/login', routeLogin);
app.use('/logout', routeLogout);
app.use('/verify', routeVerify);
app.use('/assets', express.static('static/assets'));
app.use('/', routeIndex);

/**
 * Starts the server when the bot is ready.
 */
bot.on('ready', () => {
    app.listen(80);
});

bot.login(token);