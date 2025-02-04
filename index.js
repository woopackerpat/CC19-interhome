require("dotenv").config();
const express = require("express");
const cors = require("cors");
const notFoundHandler = require("./middlewares/not-found");
const errorHandler = require("./middlewares/error");
const propertyRoute = require("./routes/property-routes");
const agentRoute = require("./routes/agent-routes");
const authRoute = require("./routes/auth-routes");
const adminRoute = require("./routes/admin-routes");
const authenticate = require("./middlewares/authenticate");
const admin = require("./middlewares/admin");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/property", propertyRoute);
app.use("/agent", authenticate, agentRoute);
app.use("/auth", authRoute);
app.use("/admin", authenticate, admin, adminRoute);

app.use(errorHandler);
app.use(notFoundHandler);

app.listen(8000, () => console.log("Server is running on port 8000"));
