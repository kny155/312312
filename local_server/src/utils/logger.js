import { createLogger, transports, format } from 'winston';

export default createLogger({
  format: format.combine(
    format.simple(),
    format.timestamp(),
    format.printf(info => `[${info.timestamp}] [${info.level}]: ${info.message}`)
  ),
  transports: [
    new transports.File({
      maxsize: 5120000,
      maxFiles: 5,
      filename: './data/logs/errors.log',
      level: 'error',
    })
  ]
})