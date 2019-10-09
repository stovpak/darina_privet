const Sequelize = require("sequelize");
require('dotenv').config();




const sequelize = new Sequelize(process.env.DB_NAME,process.env.DB_USER,process.env.DB_PASS, {
    dialect: "mysql",
    host: "localhost",
    logging: false,
    define: {
        timestamps: false,
    }
});
module.exports.sequelize = sequelize;
module.exports.Sequelize = Sequelize;