/**
 * Standard logger (to console for 12factor)
 */
import winston from "winston";
​
​
const { createLogger, format, transports } = winston;
const { combine, printf } = format;
​
const devFormat = () => {
  const formatMessage = (info: any) => `${info.level}: ${info.message}`;
  const formatError = (info: any) => `${info.level}: ${info.message}\n\n${info.stack}\n`;
​
  const fmt = (info: any) =>
    info instanceof Error ? formatError(info) : formatMessage(info);
  return combine(
    format.timestamp(),
    format((info) => {
      info.level = info.level.toUpperCase();
      return info;
    })(),
    printf(fmt)
  );
};
​
const logger = createLogger({
  exitOnError: false,
  format: devFormat(),
  level: "info",
  transports: [
    new transports.Console(),
  ],
});
​
export default logger;
