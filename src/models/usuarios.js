'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Usuarios extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Usuarios.init({
    nome: {
      type: DataTypes.STRING,
      validate: {
        funcaoValidadora: function(dado) {
          if(typeof dado !== 'string' || dado.length === 0) {
            throw new Error(`O campo nome deve ser preenchido corretamente`)
          }
        }
      }
    }, 
    email: {
      type: DataTypes.STRING,
      validate: {
        funcaoValidadora: function(dado) {
          if(typeof dado !== 'string' || dado.length === 0) {
            throw new Error(`O campo email deve ser preenchido corretamente`)
          }
        }
      }
    },
    senha: {
      type: DataTypes.STRING,
      validate: {
        funcaoValidadora: function(dado) {
          if(dado.length < 8){
            throw new Error(`O campo senha deve possuir pelo menos 8 caracteres`)
          }
          if(dado.length > 64){
            throw new Error(`O campo senha deve possui menos que 64 caracteres`)
          }
        }
      }
    } 
  }, {
    sequelize,
    paranoid: true,
    modelName: 'Usuarios',
  });
  return Usuarios;
};