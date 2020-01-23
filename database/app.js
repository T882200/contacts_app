const express = require('express');
const bodyParser = require('body-parser');

const Sequelize = require('sequelize');
const Contact = require('./schemas/contact');


const app = express();
const { Op } = Sequelize;

// parse application/json
app.use(bodyParser.json());
// app.use(express.json());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.urlencoded({ extended: true }));


// ####
// demo
// const Artist = require('./schemas/artist_');
// const Album = require('./schemas/album_');
// const Track = require('./schemas/Track_');

// Artist.hasMany(Album,{
//     foreignKey: "ArtistId"
// })

// Album.belongsTo(Artist,{
//     foreignKey: "ArtistId"
// })

// Playlist.belongsToMany(Track,{
//     through: "playlist_track",
//     foreignKey: "playlistId",
//     timestamps: false
// });

// Track.belongsToMany(Playlist,{
//     through: "playlist_track",
//     foreignKey: "trackId",
//     timestamps: false
// });

// app.get('/api/artists/:id', function(req, res) {
    
//     let {id} = req.params;
    
//     Artist.findByPk(id, {
//         include: [Album]
//     }).then((artist) => {
//         if(artist) {
//             res.json(artist);
//         } else {
//             res.status(404).send();
//         }
//     });
// });

// app.get('/api/albums/:id', function(req, res) {
    
//     let {id} = req.params;
    
//     Album.findByPk(id, {
//         include: [Artist]
//     }).then((album) => {
//         if(album) {
//             res.json(album);
//         } else {
//             res.status(404).send();
//         }
//     });
// });

// app.get('/api/tracks/:id', function(req, res) {
    
//     let {id} = req.params;
    
//     Track.findByPk(id, {
//         include: [Playlist]
//     }).then((track) => {
//         if(track) {
//             res.json(track);
//         } else {
//             res.status(404).send();
//         }
//     });
// });
// end of demo
// ####

// copied to ./db/Sequelize.js
// const sequelize = new Sequelize("database_development", "root", "root", {
//     host: "127.0.0.1",
//     dialect: "mysql"
//   });

// the wrong
// const sequelize = new Sequelize('mysql:contacts.db');





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