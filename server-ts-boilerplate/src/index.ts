import "dotenv/config";
import app from "./app";
import _ from "./@types";
import { config } from "./constants";
const run = async () => {
    try {
        app.listen(config.server.port, () => console.info(`Server running at http://localhost:${config.server.port}`));
    } catch (error) {
        console.error("Failed to start server", { error });
        process.exit(1);
    }
};

run();