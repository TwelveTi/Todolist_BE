module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define(
    "Task",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },

      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
          len: [1, 120],
        },
      },

      description: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notEmpty: true,
          len: [1, 500],
        },
      },

      status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },

      taskDate: {
        type: DataTypes.DATEONLY,
        allowNull: true,
        validate: {
          isDate: true,
        },
      },
    },
    {
      tableName: "tasks",
      timestamps: true,
    }
  );

  Task.associate = (models) => {
    // kết nối mối quan hệ giữa Task và User
  };

  return Task;
};
