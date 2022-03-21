'use strict';
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsToMany(models.Role, {through: models.UserRole, foreignKey: 'userId', otherKey: 'roleId'});
    }
  }
  User.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    phone_number: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: DataTypes.STRING,
    email_address: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    is_verified: DataTypes.BOOLEAN,
    status: DataTypes.BOOLEAN,
    last_login: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'User',
    instanceMethods: {},

    hooks: {
      beforeCreate(user, options) {
        user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10));
      },
      afterCreate(user, options) {
        if(user.Roles == null){
          user.getRoles().then(roles=>{
            if(roles == null || roles.length === 0){
              return this.sequelize.models.Role.findOrCreate({
                where: {'name':'ROLE_USER'},
                defaults:{description:'For standard users'}
              }).then((role,created)=>{
                new this.sequelize.models.UserRole({
                  userId: user.id,
                  roleId: role[0].id
                }).save().then((ur)=>{
                  console.log('Attached to ROLE_USER')
                }).catch(err=>{
                  console.log(err);
                })
              }).catch((err)=>{
                console.log(err)
              })
            }
          })
        }
      }
    }
  });

  User.beforeBulkUpdate( (user) => {
    user.attributes.updateTime = new Date();
    return user;
  })

  User.beforeCreate((user)=>{
    //console.log(user);
    return user;
  });

  User.afterCreate((user)=>{
    //console.log(user);
    return user;
  });
  User.prototype.isAdminAsync = async function(){
    return this.roles !== null && this.roles.some(role=>role.name === 'ROLE_ADMIN')
  };
  User.prototype.isAdminAsync = async function () {
    let isAdmin = false;
    await this.getRoles().then(roles => {
      isAdmin = roles.some(r => r.name === 'ROLE_ADMIN');
    }).catch(err => {
      console.error(err);
    });

    return isAdmin;
  };

  User.prototype.isValidPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
  };

  User.prototype.generateJwt = function () {
    return jwt.sign(
        {
          userId: this.id,
          username: this.get('phone_number'),
          roles: this.Roles.map(role => role.name)
        },
        process.env.JWT_KEY || 'JWT_SUPER_SECRET',
        {expiresIn: process.env.EXPIRE_TIME || 360000}
    );
  };

  return User;
};