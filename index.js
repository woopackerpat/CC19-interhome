const express = require("express");
const cors = require("cors");
const notFoundHandler = require("./middlewares/not-found");
const errorHandler = require("./middlewares/error");
const propertyRoute = require("./routes/property-routes");
const agentRoute = require("./routes/agent-routes");
const authRoute = require("./routes/auth-routes");

const app = express();

app.use(cors());

app.use("/property", propertyRoute);
app.use("/agent", agentRoute);
app.use("/auth", authRoute);

app.use(errorHandler);
app.use(notFoundHandler);

app.listen(8000, () => console.log("Server is running on port 8000"));
