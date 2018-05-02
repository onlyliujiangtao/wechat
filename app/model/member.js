/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define('member', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    openid: {
      type: DataTypes.STRING(28),
      allowNull: true
    },
    nickname: {
      type: DataTypes.STRING(15),
      allowNull: true
    },
    mobile: {
      type: DataTypes.STRING(11),
      allowNull: true
    },
    level: {
      type: DataTypes.INTEGER(1),
      allowNull: true
    },
    bp: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    balance: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    sex: {
      type: DataTypes.INTEGER(1),
      allowNull: true
    },
    headimgurl: {
      type: DataTypes.STRING(150),
      allowNull: true
    },
    city: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    province: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    groupid: {
      type: DataTypes.INTEGER(10),
      allowNull: true
    },
    subscribe: {
      type: DataTypes.INTEGER(1),
      allowNull: true
    },
    subscribe_time: {
      type: DataTypes.STRING(10),
      allowNull: true
    }
  }, {
    tableName: 'member'
  });

  Model.associate = function() {

  }

  return Model;
};
