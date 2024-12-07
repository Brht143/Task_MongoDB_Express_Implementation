const express = require("express");
const app = express();
const port = 3000;

const connectDb = require("./database");
connectDb();

app.use(express.json());

const accountsRouter = require("./apis/accounts/routes");
app.use("/accounts", accountsRouter);

app.listen(port, () => console.log(`the application is online ${port}`));
