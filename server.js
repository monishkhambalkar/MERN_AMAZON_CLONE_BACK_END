const config = require("./src/ADMIN/config/config");
const connectDB = require("./src/ADMIN/config/db");
const app = require("./app");

const startServer = async () => {
  // await

  const port = 3000;
  app.listen(port, () => {
    console.log(`listening on port ${port}`);
  });
};

startServer();
