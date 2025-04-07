"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }// src/index.ts
require('dotenv/config');

// src/app/index.ts
var _express = require('express'); var _express2 = _interopRequireDefault(_express);

// src/app/router/index.ts


// src/app/router/health.router.ts


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
var healthRouter = _express.Router.call(void 0, );
healthRouter.route("/").get(healthController.health);

// src/app/router/index.ts
var router = _express.Router.call(void 0, );
router.use("/health", healthRouter);

// src/middlewares/errorHandler.middleware.ts
var _httpstatuscodes = require('http-status-codes');

// src/exception/BaseError.ts
var BaseError = class _BaseError extends Error {
  constructor(message) {
    super(message);
    Object.setPrototypeOf(this, _BaseError.prototype);
  }
};

// src/exception/CustomError.ts
var CustomError = class _CustomError extends BaseError {
  
  
  
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
    res.status(_httpstatuscodes.StatusCodes.INTERNAL_SERVER_ERROR).send({
      errors: [{ message: _httpstatuscodes.ReasonPhrases.INTERNAL_SERVER_ERROR }]
    });
  }
}

// src/middlewares/notFound.middleware.ts

var notFoundMiddleware = (req, _res) => {
  throw new CustomError({
    statusCode: _httpstatuscodes.StatusCodes.NOT_FOUND,
    message: "Endpoint Not Found",
    errors: [{ endpoint: req.originalUrl }],
    logging: true
  });
};

// src/middlewares/cors.middleware.ts

var _cors = require('cors'); var _cors2 = _interopRequireDefault(_cors);

// src/constants/config.ts
var _a;
var config = {
  server: {
    version: process.env.VERSION || "v1",
    port: parseInt(process.env.PORT || "8000"),
    allowedOrigins: JSON == null ? void 0 : JSON.parse(process.env.ALLOWED_ORIGINS || "[]"),
    nodeEnv: ((_a = process == null ? void 0 : process.env) == null ? void 0 : _a.NODE_ENV) || "development"
  },
  database: {
    url: process.env.DATABASE_URL
  }
};

// src/middlewares/cors.middleware.ts
var corsMiddleware = _cors2.default.call(void 0, {
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
          statusCode: _httpstatuscodes.StatusCodes.FORBIDDEN,
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
  optionsSuccessStatus: _httpstatuscodes.StatusCodes.NO_CONTENT
});

// src/middlewares/morgan.middleware.ts
var _morgan = require('morgan'); var _morgan2 = _interopRequireDefault(_morgan);

// src/lib/logger.ts
var _winston = require('winston'); var _winston2 = _interopRequireDefault(_winston);
var _path = require('path'); var _path2 = _interopRequireDefault(_path);
var isDevelopment = config.server.nodeEnv === "development";
var logDir = isDevelopment ? _path.join.call(void 0, process.cwd(), "/tmp", "logs") : _path.join.call(void 0, "/tmp", "logs");
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
_winston2.default.addColors(colors);
var format = _winston2.default.format.combine(
  // Add the message timestamp with the preferred format
  _winston2.default.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss:ms" }),
  // Tell Winston that the logs must be colored
  _winston2.default.format.colorize({ all: true }),
  // Define the format of the message showing the timestamp, the level and the message
  _winston2.default.format.printf((info) => `${info.timestamp} ${info.level}: ${info.message}`)
);
var transports = [
  new _winston2.default.transports.Console(),
  new _winston2.default.transports.File({ filename: _path.join.call(void 0, logDir, "/error.log"), level: "error" }),
  new _winston2.default.transports.File({ filename: _path.join.call(void 0, logDir, "/all.log") })
];
var logger = _winston2.default.createLogger({
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
var morganMiddleware = _morgan2.default.call(void 0, 
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


// src/middlewares/rateLimiter.middleware.ts
var _expressratelimit = require('express-rate-limit'); var _expressratelimit2 = _interopRequireDefault(_expressratelimit);

var rateLimiterMiddleware = _expressratelimit2.default.call(void 0, {
  windowMs: 5 * 60 * 1e3,
  // 5 minutes
  max: 100,
  // Limit each IP to 100 requests per windowMs
  message: {
    success: false,
    statusCode: _httpstatuscodes.StatusCodes.TOO_MANY_REQUESTS,
    message: "Too many requests, please try again later."
  },
  standardHeaders: true,
  // Return rate limit info in headers
  legacyHeaders: false
  // Disable the `X-RateLimit-*` headers
});

// src/docs/configure-open-api.ts
var _expressapireference = require('@scalar/express-api-reference');
var configureOpenAPI = _expressapireference.apiReference.call(void 0, {
  theme: "kepler",
  defaultHttpClient: {
    targetKey: "js",
    clientKey: "fetch"
  },
  pageTitle: "Awesome API",
  url: `/public/docs/openapi.yaml`
});

// src/app/index.ts

var app = _express2.default.call(void 0, );
app.use(rateLimiterMiddleware);
app.use(corsMiddleware);
app.use(_express2.default.json({ limit: "10mb" }));
app.use(_express2.default.urlencoded({ limit: "10mb", extended: true }));
app.use(morganMiddleware);
app.use("/public", _express2.default.static(_path2.default.join(__dirname, "../../public")));
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