// import routes here
import { shoppingCentreRoutes } from './routes/shopping.router';
import { assetsRoutes } from './routes/assets.router';
import { checkUser } from './middleware/middleware.js';

export default (app, router) => {

    var allowCrossDomain = function(req, res, next) {

        var allowedHost = [
            'http://localhost',
            'localhost'
        ];
        var re = new RegExp('((http)s?:\/\/)?[a-zA-Z0-9_.-]*:[0-9]{1,}.*');
        var origin = req.headers.origin || req.headers.host;

        if (re.test(origin)) {
        origin = origin.substring(0, origin.lastIndexOf(':'));
        }

        res.header('Access-Control-Allow-Credentials', true);
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
        res.header('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');
        next();
    };

    app.use(allowCrossDomain);

    router.use((req, res, next) => {
        console.log('I sense a disturbance in the force...');
        if (checkUser(req, res, next)) {
            next();
        } else {
            res.status(401).json({error: 'Unauthorized'});
        }
    });

    //Restful API routes go here
    shoppingCentreRoutes(app, router);
    assetsRoutes(app, router);    

    // api prefix
    app.use('/api', router);
}