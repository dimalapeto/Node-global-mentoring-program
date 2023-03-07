import { createLogger, format, transports } from 'winston';

const { combine, timestamp, printf, simple } = format;

const myCustomFormat = printf(
  (msg) => `${msg.timestamp} ${msg.level.toUpperCase()}: ${msg.message}`
);

export const logger = createLogger({
  level: 'info',
  format: combine(
    simple(),
    timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    myCustomFormat
  ),
  defaultMeta: { service: 'app' },
  transports: [
    new transports.File({
      filename: 'logs/error.log',
      level: 'error',
    }),
    new transports.File({ filename: 'logs/combined.log' }),
  ],
  exceptionHandlers: [new transports.File({ filename: 'logs/exceptions.log' })],
  rejectionHandlers: [new transports.File({ filename: 'logs/rejections.log' })],
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new transports.Console({
      format: combine(
        simple(),
        timestamp({
          format: 'YYYY-MM-DD HH:mm:ss',
        }),
        myCustomFormat
      ),
    })
  );
}
