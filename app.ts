import express from 'express'
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import session from 'express-session';
import router from './src/routes/index.ts'
import redisClient from './src/config/redis-config.ts';
import { RedisStore } from 'connect-redis';
import cors from 'cors'


declare module 'express-session' {
  interface SessionData {
    userId?: number;
    role:string | undefined
  }
}

// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000, // 15 minutes
//   max: 100, // Limit each IP to 100 requests per 15 minutes
//   message:
//     'Too many requests from this IP, please try again after 15 minutes',
//   standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
//   legacyHeaders: false, // Disable the `X-RateLimit-*` headers
// });

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

const app = express();
// app.use(limiter)
app.set('trust proxy', 1)
app.use(logger('dev'));
app.use(cors({
  origin: [
    'http://localhost:3000', // Local development
    'http://localhost:5173' // Vite development
  ],
  credentials: true, // Allow cookies/session
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS','PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Cookie'],
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static('public'));
app.use(session({
  store:new RedisStore({
    client: redisClient,
    prefix:'task:',
  }),
  secret: 'keyboard cat',
  resave: false,
  name:'task_sid',
  saveUninitialized: false,
  cookie: { 
    secure: false, // Render provides HTTPS
    maxAge: 86400000, // 1 day
    sameSite: 'lax' // Required for cross-origin requests with credentials
  },
  rolling:true,
}))

app.use('/api', router);
 

export default app
