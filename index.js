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
    "https://open.spotify.com",
    "https://widget-app.songkick.com/injector",
    "https://www.instagram.com/embed.js",
    "https://www.instagram.com/blialcabal/embed",
    "https://www.instagram.com",
    "http://www.instagram.com",
    "https://static.elfsight.com",
    "*.jotform.com",
    "*.jotfor.ms",
    "https://hcaptcha.com"
    

];
const styleSrcUrls = [
    "https://unpkg.com/aos@next/dist/aos.css",
    "https://kit-free.fontawesome.com",
    "https://stackpath.bootstrapcdn.com",
    "https://fonts.googleapis.com",
    "https://use.fontawesome.com",
    "https://cdn.jsdelivr.net",
    "https://cdnjs.cloudflare.com",
    "https://unpkg.com",
    "https://open.spotify.com",
    "https://www.instagram.com",
    "http://www.instagram.com",
    "http://www.instagram.com/embed.js",
    "*.jotfor.ms",
    "*.jotform.com"

];
const childSrcUrls = [
    "https://www.youtube.com",
    "https://drive.google.com",
    "https://open.spotify.com",
    "https://www.instagram.com/embed.js",
    "https://www.instagram.com/",
    "http://www.instagram.com",
    "https://www.instagram.com/embed.js",
    "https://86441960992e48e9a2d5fcd6ff202f5b.elf.site",
    "*.hcaptcha.com",
    "*.jotform.com"
]

const fontSrcUrls = [
    "https://fonts.gstatic.com",
    "https://cdnjs.cloudflare.com",
    "https://www.instagram.com",
    "http://www.instagram.com",
    "https://www.instagram.com/embed.js",
    "*.jotfor.ms",
    "*.fontawesome.com"
];

const imageSrcUrls = [
    "https://images.unsplash.com",
    "https://i.ytimg.com",
    "https://files.cdn.printful.com",
    "https://globehall.com",
    "https://www.instagram.com",
    "http://www.instagram.com",
    "https://www.instagram.com/embed.js",
    "https://files.elfsight.com",
    "https://files.elfsightcdn.com",
    "https://unsplash.it",
    "https://cdn.jotfor.ms/",
    "*.jotfor.ms",
    "*.jotform.com"
];
const frameSrcUrls = [
    "https://widget-app.songkick.com/injector",
    "https://widget-app.songkick.com",
    "https://www.instagram.com",
    "http://www.instagram.com"
]
const connectSrcUrls = [
    "https://core.service.elfsight.com",
    "*.jotform.com",
    "*.fontawesome.com"
]

app.use(
    helmet({
      contentSecurityPolicy: { directives: {
        defaultSrc: [
        ],
        connectSrc: ["'self'", ...connectSrcUrls],
        scriptSrc: ["'unsafe-inline'", "'self'", "'unsafe-eval'", ...scriptSrcUrls],
        styleSrc: ["'self'", "'unsafe-inline'", ...styleSrcUrls],
        workerSrc: ["'self'", "blob:"],
        childSrc: ["blob:", ...childSrcUrls],
        objectSrc: [],
        imgSrc: [
            "'self'",
            "blob:",
            "data:",
            "https://images.unsplash.com",
            "https://i.ytimg.com",
            ...imageSrcUrls
        ],
        fontSrc: ["'self'", ...fontSrcUrls],
    }  
      },
      crossOriginResourcePolicy: { policy: "cross-origin" },
      crossOriginEmbedderPolicy: false,
    })
  );
  

  

// app.use(
//     helmet.contentSecurityPolicy({
//         directives: {
//             defaultSrc: [
//             ],
//             connectSrc: ["'self'"],
//             scriptSrc: ["'unsafe-inline'", "'self'", "'unsafe-eval'", "'frame-src'", "'script-src-elem'", ...scriptSrcUrls],
//             styleSrc: ["'self'", "'unsafe-inline'", ...styleSrcUrls],
//             workerSrc: ["'self'", "blob:"],
//             childSrc: ["blob:", "frame-src", ...childSrcUrls],
//             objectSrc: [],
//             imgSrc: ["'self'", "blob:", "data:", ...imageSrcUrls],
//             fontSrc: ["'self'", ...fontSrcUrls],
//         },

//     })
// );
// app.use(helmet({ crossOriginResourcePolicy: { policy: "cross-origin" } }));



app.use((req, res, next) => {
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    res.locals.path = req.path;
    next();
})


app.get('/', (req, res) => {
    res.render('home')
})

app.get('/booking', (req, res) => {
    res.render('booking');
})

app.get('/tattoos', (req, res) => {
    res.render('tattoos')
})
app.get('/designs', (req, res) => {
    res.render('designs')
})
app.get('/paintings', (req, res) => {
    res.render('paintings')
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
