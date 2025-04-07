import { app } from "./api/index.js";

const port = 8000;
app.listen(port, async () => {
    console.info(`Server is running on port http://localhost:${port}`);
});
