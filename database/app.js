const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const Sequelize = require('sequelize');
const Contact = require('./schemas/contact');


const app = express();
const { Op } = Sequelize;

// parse application/json
app.use(bodyParser.json());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));


// copied to ./db/Sequelize.js
// const sequelize = new Sequelize("database_development", "root", "root", {
//     host: "127.0.0.1",
//     dialect: "mysql"
//   });

// the wrong
// const sequelize = new Sequelize('mysql:contacts.db');

// var whitelist = ['http://localhost:3000/']
// var corsOptions = {
//     origin: function (origin, callback) {
//       if (whitelist.indexOf(origin) !== -1 || !origin) {
//         callback(null, true)
//       } else {
//         callback(new Error('Not allowed by CORS'))
//       }
//     }
//   }

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
    
    if(req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET, OPTIONS');
        return res.status(200).json({});
    }
    next();
})



// GET all contacts, or GET contacts by query string
app.get('/api/contacts/', function(req, res) {
    let filter = {};

    let {q} = req.query;
    
    if (q) {
        filter = {
            where: {
                name:{
                    [Op.like]: `${q}%`
                }
            }
        };
    }

    Contact.findAll(filter).then((contacts) => {
        res.json(contacts);
    });
});

// GET single contact by ID
app.get('/api/contacts/:id', function(req, res) {
    
    let {id} = req.params;
    
    Contact.findByPk(id).then((contact) => {
        if(contact) {
            res.json(contact);
        } else {
            res.status(404).send();
        }
    });
});

//  POST
app.post("/api/contacts/", function(req, res) {
    Contact.create(
        {
            name: req.body.name,
            phone: req.body.phone,
            title: req.body.title,
            avatar: req.body.avatar,
            createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
            updatedAt: Sequelize.literal('CURRENT_TIMESTAMP')
        }
    ).then((contact) => {
        res.json(contact);
    }, (validaion) => {
        res.status(422).json({
            errors: validaion.errors.map((error) => {
                return {
                    attribute: error.path,
                    msessage: error.message
                };
            })
        });
    });
    console.log(req);
});

// DELETE
app.delete('/api/contacts/:id', function(req, res){
    let { id } = req.params;

    Contact.findByPk(id).then((contact) => {
        if(contact){
            contact.destroy().then(() => {
                res.status(204).send();
            });
        } else {
            res.status(404).send();
        }
    });
});

// UPDATE
app.put('/api/contacts/:id', function(req, res) {
    let { id } = req.params;

    Contact.findByPk(id).then((contact) => {
        if(contact){
            contact.update(
                {
                    name: req.body.name,
                    phone: req.body.phone,
                    title: req.body.title,
                    avatar: req.body.avatar,
                    updatedAt: Sequelize.literal('CURRENT_TIMESTAMP')
                }
            ).then((contact) => {
                res.json(contact);
            }, (validaion) => {
                res.status(422).json({
                    errors: validaion.errors.map((error) => {
                        return {
                            attribute: error.path,
                            msessage: error.message
                        };
                    })
                });
            });
            console.log(req);
        } else {
            res.status(404).send();
        }
    })
})


app.listen(8000);