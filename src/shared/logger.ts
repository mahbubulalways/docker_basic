import { createLogger, format, transports } from "winston";
import path from "path";
import DailyRotateFile from "winston-daily-rotate-file";
const { printf, combine, timestamp, label } = format;
const logFomat = printf(({ level, message, timestamp, label }) => {
  const date = new Date(timestamp as string);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  return `${date.toDateString()} ${hours}:${minutes}:${seconds} [${label}] ${level}: ${message}`;
});

const successlogger = createLogger({
  level: "info",
  format: combine(label({ label: "DOCKER" }), timestamp(), logFomat),
  transports: [
    new transports.Console(),
    new DailyRotateFile({
      filename: path.join(
        "logs",
        "wiston",
        "success",
        "docker-%DATE%-success.log",
      ),
      datePattern: "YYYY-MM-DD-HH-mm-ss",
      zippedArchive: false,
      maxSize: "20m",
      maxFiles: "14d",
    }),
  ],
});

const errlogger = createLogger({
  level: "info",
  format: combine(label({ label: "DOCKER" }), timestamp(), logFomat),
  transports: [
    new transports.Console(),
    new DailyRotateFile({
      filename: path.join("logs", "wiston", "error", "docker-%DATE%-error.log"),
      datePattern: "YYYY-MM-DD-HH-mm-ss",
      zippedArchive: false,
      maxSize: "20m",
      maxFiles: "14d",
    }),
  ],
});

export { errlogger, successlogger };
