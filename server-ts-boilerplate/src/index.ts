import "dotenv/config";
import app from "./app";
import _ from "./@types/global.d";
import { env } from "./constants";
const run = async () => {
    try {
        app.listen(env.server.port, () => console.info(`Server running at http://localhost:${env.server.port}`));
    } catch (error) {
        console.error("Failed to start server", { error });
        process.exit(1);
    }
};

run();