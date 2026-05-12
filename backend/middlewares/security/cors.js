import cors from "cors";
import { corsConfig } from "../../config/cors.js";

/** Express CORS middleware configured with allowed origins and credentials. @type {import("express").RequestHandler} */
export const corsMiddleware = cors(corsConfig);
