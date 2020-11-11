const winston = require('winston');
const { createLogger, format, transports}  = require('winston')

const logger = winston.createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`+(info.splat!==undefined?`${info.splat}`:" "))
  ),
  transports: [
   
    new winston.transports.File({ 
        filename: 'error.log', 
        level: 'error'
    }),
    new winston.transports.File({ 
        filename: 'combined.log'
     })
    //  new winston.transports.Http({
    //    host:'localhost',
    //    port: 3000,
    //    path: "/errors"
    //  })
  ],
});

module.exports = logger
