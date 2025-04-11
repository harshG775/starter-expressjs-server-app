import { app } from "./app/index.js";
import { config } from "./config/index.js";

const { port, host } = config;
app.listen(port, async () => {
    console.info(`Server is running on port http://${host}:${port}`);
});
