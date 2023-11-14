import winston from "winston";
import config from "config";

//vamos ter levels de erro pra categorizar o nível do erro  
const levels = {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    debug: 4
};

//definindo o tipo de ambiente que está vindo o error 
const level = () =>{
    const env = config.get<string>("env") || "development";
    const isDevelopment = env === "development" ;
    return isDevelopment ? "debug" : "warn";
};

const colors = {
    error: "red",
    warn: "yellow",
    info: "green",
    http: "magenta",
    debug: "white"
};

//definir as cores para o winston
winston.addColors(colors);

//formatar a mensagem 
const format = winston.format.combine(
    winston.format.timestamp({ format: "YYYY-MM-DD HH:MM" }),
    winston.format.colorize({ all: true }),
    winston.format.printf(
        (info) => `${info.timestamp} - ${info.level}: ${info.message}`
    )
);

const transports = [
    new winston.transports.Console(),
    new winston.transports.File({
        filename: "logs/error.log",
        level: "error"
    }),
    new winston.transports.File({
        filename: "logs/all.log"
    })
];

const Logger = winston.createLogger({
    level: level(),
    levels,
    format,
    transports,
});

export default Logger;
