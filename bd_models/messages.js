/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('messages', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    sender_user_id: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    data: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    text: {
      type: DataTypes.STRING,
      allowNull: true
    },
    to_id: {
      type: DataTypes.STRING,
      allowNull: true,
      references: {
        model: 'list_sup_workers',
        key: 'tel_number'
      }
    },
    chat_id: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    from_tp: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    react_time: {
      type: DataTypes.BIGINT,
      allowNull: true
    }
  }, {
    tableName: 'messages'
  });
};
