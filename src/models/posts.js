'use strict';
const { InvalidArgumentError } = require('../err/erros')
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Posts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Posts.init({
    titulo: {
      type: DataTypes.STRING,
      validate: {
        funcaoValidadora: function(dado) {
          if(typeof dado !== 'string' || dado.length === 0){
            throw new Error(`É necessário preencher o campo Título`)
          }
          if(dado.length < 5){
            throw new Error(`O campo Título precisa ter mais que 5 caracteres`)
          }
        }
      }
    },
    conteudo: {
      type: DataTypes.STRING,
      validate: {
        funcaoValidadora: function(dado) {
          if(typeof dado !== 'string' || dado.length === 0){
            throw new Error(`É necessário preencher o campo Conteúdo`)
          }
          if(dado.length > 140){
            throw new Error(`O campo Conteúdo não deve ter mais que 140 caracteres`)
          }
        }
      }
    },
  }, {
    sequelize,
    paranoid: true,
    modelName: 'Posts',
  });
  return Posts;
};