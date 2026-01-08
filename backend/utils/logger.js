import winston from "winston";

const logger = winston.createLogger({
  level: "info",

  levels: {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    debug: 4
  },

  format: winston.format.combine(
    winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    winston.format.json()
  ),

  transports: [
    // Error logs
    new winston.transports.File({
      filename: "logs/error.log",
      level: "error"
    }),

    //  All logs
    new winston.transports.File({
      filename: "logs/combined.log"
    })
  ]
});

// Console logging for development only
if (process.env.NODE_ENV !== "production") {
  logger.add(
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      )
    })
  );
}

export default logger;
