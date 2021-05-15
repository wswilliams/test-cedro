import './pre-start'; // Must be the first import
import app from '@server';
import logger from '@shared/Logger';
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;

const port = Number(process.env.PORT || 3000);

if (cluster.isMaster) {
    console.log('Master process is running');

    // Fork workers
    for (let i = 0; i < (numCPUs-2); i++) {
        cluster.fork();
    }

    cluster.on('exit', (worker: any, code: any, signal: any) => {
        console.log(`Worker ${worker.process.pid} died with code: ${code}, and signal: ${signal}`);
        console.log('Starting a new worker');
        cluster.fork();
    });
} else {

    app.listen(port, () => {
        logger.info('Express server started on port: ' + port);
    });
}
