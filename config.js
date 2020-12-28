const dotenv = require("dotenv-safe");

dotenv.config();

module.exports = {
    API_PORT: process.env.PORT,
    DB_URL: process.env.DB_URL,
    DB_NAME: process.env.DB_NAME,
};
