import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';
import postRouter from './routes/post.route.js';
import addRouter from './routes/add.route.js'
import commentRoutes from './routes/comment.route.js'
import cookieParser from 'cookie-parser';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';

dotenv.config();

// Swagger configuration
const swaggerOptions = {
    definition: {
        openapi: '3.1.0',
        info: {
            title: 'MERN Blog API',
            version: '1.0.0',
            description: 'API documentation for MERN Blog application',
        },
        servers: [
            {
                url: 'http://localhost:3000',
                description: 'Development server',
            },
        ],
        components: {
            securitySchemes: {
                cookieAuth: {
                    type: 'apiKey',
                    in: 'cookie',
                    name: 'access_token',
                },
            },
        },
    },
    apis: ['./api/routes/*.js'], // Path to route files for annotations
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

mongoose
    .connect(
        process.env.MONGO
    )
    .then(() => 
        {console.log('mongodb is connected');
    })
    .catch((err) => {
        console.log(err);

    });




const app = express();

app.use(express.json());

// CORS configuration - update with your Choreo frontend URL
const corsOptions = {
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true,
};
app.use(cors(corsOptions));
app.use(cookieParser())

// Swagger UI route
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Health check endpoint
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK', message: 'Server is running' });
});

app.listen(3000, () => {
    console.log('server is running on part 3000!!!');
});


app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/post', postRouter);
app.use('/api/add', addRouter);
app.use('/api/comment', commentRoutes);


app.use((err, req, res, next ) =>{
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    });
});

