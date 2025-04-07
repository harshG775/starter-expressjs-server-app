// src/index.ts
import "dotenv/config";

// src/app/index.ts
import express from "express";

// src/app/router/index.ts
import { Router as Router2 } from "express";

// src/app/router/health.router.ts
import { Router } from "express";

// src/exception/catchAsync.ts
var catchAsync = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
};

// src/app/controllers/health.controller.ts
var healthController = {
  health: catchAsync(async (_req, res) => {
    res.status(200).json({ success: true, message: "Server is running" });
  })
};

// src/app/router/health.router.ts
var healthRouter = Router();
healthRouter.route("/").get(healthController.health);

// src/app/router/index.ts
var router = Router2();
router.use("/health", healthRouter);

// src/middlewares/errorHandler.middleware.ts
import { StatusCodes, ReasonPhrases } from "http-status-codes";

// src/exception/BaseError.ts
var BaseError = class _BaseError extends Error {
  constructor(message) {
    super(message);
    Object.setPrototypeOf(this, _BaseError.prototype);
  }
};

// src/exception/CustomError.ts
var CustomError = class _CustomError extends BaseError {
  _statusCode;
  _logging;
  _errors;
  constructor({ message = "Internal Server Error", statusCode = 500, logging = false, errors }) {
    super(message);
    this._statusCode = statusCode;
    this._logging = logging;
    this._errors = errors && errors.length ? errors : void 0;
    this.name = "CustomError";
    Object.setPrototypeOf(this, _CustomError.prototype);
  }
  get statusCode() {
    return this._statusCode;
  }
  get errors() {
    return this._errors;
  }
  get logging() {
    return this._logging;
  }
  get details() {
    return {
      success: false,
      statusCode: this._statusCode,
      message: this.message,
      ...this._errors ? { errors: this._errors } : {}
    };
  }
};

// src/middlewares/errorHandler.middleware.ts
function errorHandlerMiddleware(err, _req, res, _next) {
  if (err instanceof BaseError) {
    const { statusCode, details, logging } = err;
    if (logging) {
      console.error(
        JSON.stringify(
          {
            code: err.statusCode,
            errors: err.errors,
            stack: err.stack
          },
          null,
          2
        )
      );
    }
    res.status(statusCode).send(details);
  } else {
    console.error(err);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
      errors: [{ message: ReasonPhrases.INTERNAL_SERVER_ERROR }]
    });
  }
}

// src/middlewares/notFound.middleware.ts
import { StatusCodes as StatusCodes2 } from "http-status-codes";
var notFoundMiddleware = (req, _res) => {
  throw new CustomError({
    statusCode: StatusCodes2.NOT_FOUND,
    message: "Endpoint Not Found",
    errors: [{ endpoint: req.originalUrl }],
    logging: true
  });
};

// src/middlewares/cors.middleware.ts
import { StatusCodes as StatusCodes3 } from "http-status-codes";
import cors from "cors";

// src/constants/config.ts
var config = {
  server: {
    version: process.env.VERSION || "v1",
    port: parseInt(process.env.PORT || "8000"),
    allowedOrigins: JSON?.parse(process.env.ALLOWED_ORIGINS || "[]"),
    nodeEnv: process?.env?.NODE_ENV || "development"
  },
  database: {
    url: process.env.DATABASE_URL
  }
};

// src/middlewares/cors.middleware.ts
var corsMiddleware = cors({
  origin: (origin, callback) => {
    if (!origin) {
      return callback(null, true);
    }
    const isAllowed = config.server.allowedOrigins.some(
      (allowedOrigin) => new URL(allowedOrigin).origin === new URL(origin).origin
    );
    if (isAllowed) {
      callback(null, true);
    } else {
      callback(
        new CustomError({
          statusCode: StatusCodes3.FORBIDDEN,
          message: `Origin ${origin} not allowed by CORS`,
          logging: true
        })
      );
    }
  },
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders: ["Content-Type", "Authorization", "Accept-Version"],
  exposedHeaders: ["X-Total-Count", "Content-Range"],
  credentials: true,
  preflightContinue: false,
  maxAge: 600,
  optionsSuccessStatus: StatusCodes3.NO_CONTENT
});

// src/middlewares/morgan.middleware.ts
import morgan from "morgan";

// src/lib/logger.ts
import winston from "winston";
import { join } from "path";
var isDevelopment = config.server.nodeEnv === "development";
var logDir = isDevelopment ? join(process.cwd(), "/tmp", "logs") : join("/tmp", "logs");
var defaultMeta = { service: "express-server" };
var levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  verbose: 4,
  debug: 5,
  silly: 6
};
var colors = {
  error: "red",
  warn: "yellow",
  info: "green",
  http: "magenta",
  debug: "black"
};
var level = () => {
  return isDevelopment ? "debug" : "warn";
};
winston.addColors(colors);
var format = winston.format.combine(
  // Add the message timestamp with the preferred format
  winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss:ms" }),
  // Tell Winston that the logs must be colored
  winston.format.colorize({ all: true }),
  // Define the format of the message showing the timestamp, the level and the message
  winston.format.printf((info) => `${info.timestamp} ${info.level}: ${info.message}`)
);
var transports = [
  new winston.transports.Console(),
  new winston.transports.File({ filename: join(logDir, "/error.log"), level: "error" }),
  new winston.transports.File({ filename: join(logDir, "/all.log") })
];
var logger = winston.createLogger({
  defaultMeta,
  level: level(),
  levels,
  format,
  transports
});

// src/middlewares/morgan.middleware.ts
var stream = {
  // Use the http severity
  write: (message) => logger.http(message)
};
var skip = () => {
  const env = config.server.nodeEnv || "development";
  return env !== "development";
};
var morganMiddleware = morgan(
  // Define message format string (this is the default one).
  // The message format is made from tokens, and each token is
  // defined inside the Morgan library.
  // You can create your custom token to show what do you want from a request.
  ":remote-addr :method :url :status :res[content-length] - :response-time ms",
  // Options: in this case, I overwrote the stream and the skip logic.
  // See the methods above.
  { stream, skip }
);

// src/middlewares/validation.middleware.ts
import { StatusCodes as StatusCodes4 } from "http-status-codes";

// src/middlewares/rateLimiter.middleware.ts
import rateLimit from "express-rate-limit";
import { StatusCodes as StatusCodes5 } from "http-status-codes";
var rateLimiterMiddleware = rateLimit({
  windowMs: 5 * 60 * 1e3,
  // 5 minutes
  max: 100,
  // Limit each IP to 100 requests per windowMs
  message: {
    success: false,
    statusCode: StatusCodes5.TOO_MANY_REQUESTS,
    message: "Too many requests, please try again later."
  },
  standardHeaders: true,
  // Return rate limit info in headers
  legacyHeaders: false
  // Disable the `X-RateLimit-*` headers
});

// src/docs/configure-open-api.ts
import { apiReference } from "@scalar/express-api-reference";
var configureOpenAPI = apiReference({
  theme: "kepler",
  defaultHttpClient: {
    targetKey: "js",
    clientKey: "fetch"
  },
  pageTitle: "Awesome API",
  url: `/public/docs/openapi.yaml`
});

// src/app/index.ts
import path from "path";
import { cwd } from "process";
var app = express();
app.use(rateLimiterMiddleware);
app.use(corsMiddleware);
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(morganMiddleware);
app.use("/public", express.static(path.join(cwd(), "/public")));
app.use("/api/docs/reference", configureOpenAPI);
app.use("/api", router);
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);
var app_default = app;

// src/index.ts
var run = async () => {
  try {
    app_default.listen(config.server.port, () => console.info(`Server running at http://localhost:${config.server.port}`));
  } catch (error) {
    console.error("Failed to start server", { error });
    process.exit(1);
  }
};
run();
//# sourceMappingURL=index.js.map