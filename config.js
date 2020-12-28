const dotenv = require("dotenv-safe");

dotenv.config();

module.exports = {
    API_PORT: process.env.PORT,
};
