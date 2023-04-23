// This File is not used in this project

require("dotenv").config();

const dev = {
  app: {
    port: process.env.PORT || 3002,
  },
  db: {
    url: process.env.MONGO_DB_URI || "mongodb://localhost:27017/userDemoDB",
  },
};

module.exports = dev;