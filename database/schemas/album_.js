const Sequelize = require('sequelize');

const sequelize = require('./../db/sequelize');



module.exports = sequelize.define('contact', {
    id: {
        field: 'id',
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    name: {
        field: 'name',
        type: Sequelize.STRING
    },
    phone: {
        field: 'phone',
        type: Sequelize.STRING
    },
    title: {
        field: 'title',
        type: Sequelize.STRING
    },
    avatar: {
        field: 'avatar',
        type: Sequelize.STRING
    },
    createdAt: {
        field: 'createdAt',
        type: Sequelize.DATE
    },
    updatedAt: {
        field: 'updatedAt',
        type: Sequelize.DATE
    }
},
{
    timestamps: true
});