const Sequelize = require('sequelize');

const sequelize = require('./../db/sequelize');



module.exports = sequelize.define('contact', {
    id: {
        field: 'id',
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        field: 'name',
        type: Sequelize.STRING,
        validate: {
            notEmpty: {
                args: true,
                msg: 'Name is required'
            },
            len:{
                args: [2,30],
                msg: "Name must be between 2 and 30 characters"
            }
        }
    },
    phone: {
        field: 'phone',
        type: Sequelize.STRING,
        validate: {
            notEmpty: {
                args: true,
                msg: 'Phone number is required'
            },
            len:{
                args: [1,15],
                msg: "Phone number must be under 15 characters"
            }
        }
    },
    title: {
        field: 'title',
        type: Sequelize.STRING,
        validate: {
            len:{
                args: [2,10],
                msg: "Title must be between 2 and 10 characters"
            }
        }
    },
    avatar: {
        field: 'avatar',
        type: Sequelize.STRING
    },
    createdAt: {
        field: 'createdAt',
        type: Sequelize.DATE,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    updatedAt: {
        field: 'updatedAt',
        type: Sequelize.DATE,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    }
},
{
    timestamps: true
});