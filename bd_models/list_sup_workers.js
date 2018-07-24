/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('list_sup_workers', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    chat_id: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    tel_number: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    tableName: 'list_sup_workers'
  });
};
