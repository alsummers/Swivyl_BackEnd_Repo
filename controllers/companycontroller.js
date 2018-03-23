

const router = require('express').Router();
const db = require('../models/index');
const Company = db.sequelize.import('../models/company.js');
const Client = db.sequelize.import('../models/client.js')
const passport = require('passport');
require('../services/authorizeClient');
const requireJwt = passport.authenticate('jwt', { session: false})
const Log = db.sequelize.import('../models/log.js')
const multer = require('multer')
const cors = require('cors')
const fs = require('fs')
const path = require('path')







// CREATING COMPANY
    router.post('/', requireJwt, (req, res)  => {
        var name = req.body.company.name
        var img = req.body.company.img
        var owner = req.user.uid

        Company.create({
            name: name,
            img: img,
            owner: owner
        }).then(
            (successData) => {
                Log.create({
                    clientUid: req.user.uid,
                    description: req.user.uid + ' created a company with an id of ' + successData.uid,
                    message: 'created company',
                    companyId: successData.uid
                }).then(
                    (successLog) => {
                        res.json({log : successLog})
                    }
                )

            },
            (err) => {
                res.send({error: err})
            }
        )    
        })

//FINDING ALL COMPANIES OF SPECIFIC CLIENT
//RELOOK INTO WHEN DOING CLIENT SIDE
    router.get('/' ,requireJwt, function(req, res) {
        var data = req.user.uid;

        Company.findAll(
            {
                where: {owner: data}
            }
        )
        .then(
            //success
            function findAllSuccess(data) {
                console.log(data);
                
                res.json(data);
                
            },
            //failure
            function findAllError(err) {
                res.send(500, err.message);
            }
        )
        
    });

//FINDING ONE SPECIFIC COMPANY
    // router.get('/',requireJwt, function(req, res) {
    //     var data = req.params.id;
    //     // console.log(data); here for testing purposes
    //     Company
    //     .findOne({
    //         where: {id: data}
    //     }).then(
    //         function getSuccess(updateData) {
    //             res.json(updateData);
    //         },
    //         function getError(err) {
    //             res.send(500, err.message);
    //         }
    //     );
    // });

// UPDATING COMPANY logo
    


    router.put('/companyProfile', requireJwt,function (req, res) {
        var storage = multer.diskStorage({
            destination: function (req, file, cb) {
                cb(null, '/profile')
            },
            filename: function (req, file, cb) {
                cb(null, file.fieldname + '-' + req.user.uid + '.jpg')
                
            }
        });
        // console.log('storage here',storage)
        var upload = multer({ storage: storage }).single('companylogo');
        upload(req, res, function (err) {
            if (err) {
                // An error occurred when uploading
            }
            res.json({
                success: true,
                message: req.file.path
                
            });
            // console.log('trying to find the directory', req.file.fieldname + '-' + req.user.uid + '.jpg')
            
            Company.update({
                img:req.file.path
            },
            {where:{
                owner:req.user.uid
            }}
        )
            // Everything went fine
        })
        
        
    });
    router.get('/profile',requireJwt,(req, res)=>{
        console.log('--------------------------------DIRECTORY',__dirname)
        // res.sendFile(path.resolve(`/../profile/companylogo-f74914af-d371-4dde-9361-f7afbfb6ec38.jpg`))
        Company.findOne({where:{owner:req.user.uid}}).then(
            (successData)=>{
                console.log(req)
        
            
            res.sendFile(path.resolve(`/profile/`+successData.img))
        })
        
    })

//GET COMPANY LOGO

// DELETE SPECIFIC COMPANY
    router.delete('/:id',requireJwt, function(req, res) {
        var data = req.params.id;
        // console.log(data); here for testing purposes
        Company
        .destroy({
            where: {id: data}
        }).then(
            function getSuccess(updateData) {
                res.json(updateData);
            },
            function getError(err) {
                res.send(500, err.message);
            }
        );
    });

module.exports = router;