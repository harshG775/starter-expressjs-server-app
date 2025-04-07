import { app } from "./api/index.js";
import { config } from "./constants/index.js";
const { port, host } = config.server;
app.listen(port, async () => {
    console.info(`Server is running on port http://${host}:${port}`);
});
