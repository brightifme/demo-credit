import express, { Router, Request, Response } from 'express';
import usersRouter from './routes/users.routes';
import fundAccountRouter from './routes/fund-account.routes';
import transferFundsRouter from './routes/transfer-funds.routes';
import withdrawFundsRouter from './routes/withdraw-funds.routes';


const app = express();
app.use(express.json());


    app.use('/users',usersRouter)
    app.use('/fund-account',fundAccountRouter)
    app.use('/transfer-funds',transferFundsRouter)
    app.use('/withdraw-funds',withdrawFundsRouter)
    app.listen(3000, () => console.log('Server listening on port 3000'));
    export default app;