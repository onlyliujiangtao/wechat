/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define('menus', {
    id: {
      type: DataTypes.INTEGER(200),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    dec: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    using: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      defaultValue: '0'
    },
    user_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: true
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    tableName: 'menus'
  });

  Model.associate = function() {

  }

  return Model;
};
