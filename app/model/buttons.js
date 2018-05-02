/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define('buttons', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    type: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    key: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    media_id: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    url: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    pid: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    menu_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'menus',
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
    tableName: 'buttons'
  });

  Model.associate = function() {

  }

  return Model;
};
