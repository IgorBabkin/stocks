import 'reflect-metadata';
import Boom from '@hapi/boom';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import express from 'express';
import path from 'path';
import pino from 'pino';
import {ExpressActionFactory, ExpressRequestHandlerFactory, MediatorFactory} from "./presentation/framework";
import {HomeAction} from "./presentation/actions/HomeAction";
import {ILocatorFactory} from "./di/ILocatorFactory";
import {LocatorFactory} from "./di/LocatorFactory";
import {EnvFactory} from "./env/EnvFactory";
import {DevLocatorFactory} from "./di/DevLocatorFactory";
import {ProdLocatorFactory} from "./di/ProdLocatorFactory";
import {LoggerMiddleware} from "./operation/middleware/LoggerMiddleware";
import {SomeError} from "./domain/errors/SomeError";
import {GetTradesAction} from "./presentation/actions/trades/GetTradesAction";
import {CreateTradeAction} from "./presentation/actions/trades/CreateTradeAction";
import {CollisionError} from "./domain/errors/CollisionError";
import {DeleteTradesAction} from "./presentation/actions/trades/DeleteTradesAction";
import {GetUserTradesAction} from "./presentation/actions/trades/GetUserTradesAction";
import {GetPriceExtremumAction} from "./presentation/actions/stocks/GetPriceExtremumAction";

const logger = pino({});

const app = express();
const port = 3002;

// view engine setup
app.set('views', path.join(__dirname, 'presentation', 'views'));
app.set('view engine', 'jade');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const env = new EnvFactory().create();
let locatorFactory: ILocatorFactory = new LocatorFactory();
if (env.name === 'production') {
    locatorFactory = new ProdLocatorFactory(locatorFactory);
} else {
    locatorFactory = new DevLocatorFactory(locatorFactory);
}
const handlerFactory = new ExpressRequestHandlerFactory(
    locatorFactory.create(env),
    new MediatorFactory([LoggerMiddleware]),
    new ExpressActionFactory({
        badRequest: [CollisionError],
        notFound: [SomeError],
    }),
)
app.get('/', handlerFactory.create(HomeAction));
app.get('/trades', handlerFactory.create(GetTradesAction));
app.post('/trades', handlerFactory.create(CreateTradeAction));
app.delete('/erase', handlerFactory.create(DeleteTradesAction));
app.get('/trades/users/:userID', handlerFactory.create(GetUserTradesAction));
app.get('/stocks/:symbol/price', handlerFactory.create(GetPriceExtremumAction));

// catch 404 and forward to error handler
app.use((req, res, next) => {
    const err = Boom.notFound('Route not found');
    next(err);
});

// error handler
app.use((err, req, res, next) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});


app.addListener('error', (error) => {
    if (error.syscall !== 'listen') {
        throw error;
    }
    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EADDRINUSE':
            console.error(`${port} is already in use`);
            process.exit(1);
        default:
            throw error;
    }
});


app.listen(port, () => logger.info(`Example app listening at http://localhost:${port}`))

export {app};
