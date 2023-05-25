const express = require('express');
const app = express();
const path = require('path');
const ejsMate = require('ejs-mate');
const methodOverride = require('method-override');
const helmet = require('helmet')
const session = require('express-session');
const flash = require('connect-flash');
const AppError = require('./utils/AppError');
const cookie = require('cookie')


app.set('views', path.join(__dirname, 'views'));

app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

const sessionOptions = {
    secret: process.env.SESSION_SECRET || 'notagoodsecret',
    name: 'session',
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7,
        // secure: true,
        // sameSite: 'none'
    }
}

if (process.env.NODE_ENV !== 'production') { //if we ar enot in production mode
    require('dotenv').config();//require our .env file,
}

app.use(session(sessionOptions))
app.use(flash());
app.use(helmet())


app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));


const scriptSrcUrls = [
    "https://stackpath.bootstrapcdn.com",
    "https://kit.fontawesome.com",
    "https://cdnjs.cloudflare.com",
    "https://cdn.jsdelivr.net",
    "https://unpkg.com/aos@next/dist/aos.js",
    "https://code.jquery.com/jquery-3.6.0.min.js",
    "https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js",
    "https://widget.songkick.com/9881049/widget.js",
    "https://stackpath.bootstrapcdn.com",
    "https://widget-app.songkick.com/injector",
    "https://widget-app.songkick.com",
];
const styleSrcUrls = [
    "https://unpkg.com/aos@next/dist/aos.css",
    "https://kit-free.fontawesome.com",
    "https://stackpath.bootstrapcdn.com",
    "https://fonts.googleapis.com",
    "https://use.fontawesome.com",
    "https://cdn.jsdelivr.net",
    "https://cdnjs.cloudflare.com",
    "https://unpkg.com"
];
const childSrcUrls = [
    "https://www.youtube.com",
    "https://drive.google.com",
    "https://widget-app.songkick.com"
]

const fontSrcUrls = [
    "https://fonts.gstatic.com",
    "https://cdnjs.cloudflare.com",
];

const imageSrcUrls = [
    "https://images.unsplash.com",
    "https://i.ytimg.com",
    "https://files.cdn.printful.com",
    "https://globehall.com"
];
const frameSrcUrls = [
    "https://widget-app.songkick.com/injector",
    "https://widget-app.songkick.com",
]
// app.use(
//     helmet.contentSecurityPolicy({
//         directives: {
//             defaultSrc: [
//             ],
//             connectSrc: ["'self'"],
//             scriptSrc: ["'unsafe-inline'", "'self'", "'unsafe-eval'", ...scriptSrcUrls],
//             styleSrc: ["'self'", "'unsafe-inline'", ...styleSrcUrls],
//             workerSrc: ["'self'", "blob:"],
//             childSrc: ["blob:", ...childSrcUrls],
//             objectSrc: [],
//             imgSrc: ["'self'", "blob:", "data:", ...imageSrcUrls],
//             fontSrc: ["'self'", ...fontSrcUrls],
//         },
//     })
// );

app.use(
    helmet({
        // crossOriginEmbedderPolicy: { policy: "credentialless" },
        // crossOriginResourcePolicy: { policy: "cross-origin" },
        contentSecurityPolicy: {
            directives: {
                defaultSrc: [
                ],
                connectSrc: ["'self'"],
                scriptSrc: ["'unsafe-inline'", "'self'", "'unsafe-eval'", ...scriptSrcUrls],
                styleSrc: ["'self'", "'unsafe-inline'", ...styleSrcUrls],
                workerSrc: ["'self'", "blob:"],
                childSrc: ["blob:", ...childSrcUrls],
                objectSrc: [],
                imgSrc: ["'self'", "blob:", "data:", ...imageSrcUrls],
                fontSrc: ["'self'", ...fontSrcUrls],
                frameSrc: ["'self'", ...frameSrcUrls]
            }
        },

    })
);

app.use((req, res, next) => {
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    res.locals.path = req.path;
    next();
})


app.get('/', (req, res) => {
    res.render('home')
})

app.get('/shows', (req, res) => {
    res.render('shows');
})

app.get('/music', (req, res) => {
    res.render('music')
})


app.all('*', (req, res, next) => {
    next(new AppError('Page Not Found', 404))
})

app.use((err, req, res, next) => {
    const { statusCode = 500 } = err;
    if (!err.message) err.message = 'Oh No, Something Went Wrong!'
    res.status(statusCode).render('error', { err })
    // res.redirect(`${req.originalUrl}`) //save this for flash error redirection
})

const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log(`SERVING ON PORT ${port}`)
})
