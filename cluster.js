#!/usr/bin/node

var server = require('./server.js')
  , cluster = require('cluster')
  , nCPUs = require('os').cpus().length
  , domain = require('domain')
  , logger = require('./lib/logger.js')
  ;

if (cluster.isMaster) {
    for (var i=0; i < nCPUs; i++) {
	cluster.fork();
    }

    cluster.on('listening', function (worker, addr) {
        logger.info({ workerId: worker.process.pid, status: 'listening', address: addr.address + ":" + addr.port });
    }); 
    
    cluster.on('disconnect', function (worker) {
        logger.info({ workerId: worker.process.pid, status: 'disconnected' });
	cluster.fork();
    });
} else {
   var serverDomain = domain.create();
   serverDomain.on('error', function (e) {
       try {
           logger.error({ workerId: cluster.worker.process.pid, status: 'error', err: e }, "Error on server domain, closing server");       
	   server.stopserver();
           cluster.worker.disconnect();
       } catch (ex) {
          logger.error({ workerId: cluster.worker.process.pid, status: 'error', err: ex }, "Exception while trying to close server:");  
       }
   });
   serverDomain.bind(server.startserver());

   serverDomain.run(function () {
       logger.info({ workerId: cluster.worker.process.pid, status: 'starting server' }); 
       server.startserver();
   });
}
