export default (mongoose) => {

    let gracefulExit = function() {
        mongoose.connection.close(() => {
            console.log('mongo closed');
            process.exit(0);
        });
    };

    mongoose.connection.on('connected', (ref) => {
        console.log('mongo database successfully connected');
    });

    mongoose.connection.on('error', (err) => {
        console.log('Failed to connect to mongo');
    });

    mongoose.connection.on('disconnected', () => {
        console.log('mongo disconnected');
    });

    process.on('SIGINT', gracefulExit).on('SIGTERM', gracefulExit);

    let mongo_uri = (process.env.NODE_ENV === 'test') ? 'mongodb://localhost/inventory_app_test' : 'mongodb://localhost/inventory_app'

    mongoose.connect(mongo_uri, {
        reconnectTries: 100,
        reconnectInterval: 1000,
        keepAlive: 1,
        connectTimeoutMS: 30000
    }, (error) => {
        if (error) {
            {throw error; }
        }
    });
}