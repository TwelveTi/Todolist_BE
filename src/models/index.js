const Sequelize = require("sequelize");
const sequelize = require("../configs/database");

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Task = require("./taskModel")(sequelize, Sequelize.DataTypes);

// tạo quan hệ giữa các bảng
// Object.keys(db).forEach(modelName => {
//   if (db[modelName].associate) {
//     db[modelName].associate(db);
//   }
// });

module.exports = db;