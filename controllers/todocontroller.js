const router = require('express').Router();
const db = require('../models/index');
const Todo = db.sequelize.import('../models/todo.js');
const Log = db.sequelize.import('../models/log.js')
const passport = require('passport');
require('../services/authorizeClient');
const requireJwt = passport.authenticate('jwt', { session: false})
// CREATING ENTITY
router.post('/', requireJwt, (req, res) => {
    var company = req.body.company.id
    var date = req.body.todo.dateDue
    var desc = req.body.todo.description
    var owner = req.user.uid

    Todo.create({
        companyID: company,
        dateDue: date,
        description: desc,
        owner: owner
    }).then(
        (successData) => {
            Log.create({
                clientUid: owner,
                description: owner + ' created a to-do task with an id of ' + successData.id,
                message: 'created a to-do task'
            }).then(
                (successLog) => {
                    res.json({log : successLog})
                }
            )
        },
        (err) => {
            res.send({ error: err })
        }
    )
})
//FINDING ALL TODO ASSIGNMENTS OF SPECIFIC CLIENT
//RELOOK INTO WHEN DOING CLIENT SIDE
router.get('/all/:companyID', requireJwt, function (req, res) {
    var data = req.params.companyID;
    Todo.findAll(
        {
            where: { companyID: data }
        }
    )
        .then(
            //success
            function findAllSuccess(data) {
                // console.log(data);
                res.json(data);
            },
            //failure
            function findAllError(err) {
                res.send(500, err.message);
            }
        );
});
//FINDING ONE SPECIFIC COMPANY
router.get('/:id', requireJwt, function (req, res) {
    var data = req.params.id;
    // console.log(data); here for testing purposes
    Todo
        .findOne({
            where: { id: data }
        }).then(
            function getSuccess(updateData) {
                res.json(updateData);
            },
            function getError(err) {
                res.send(500, err.message);
            }
        );
});
// UPDATING TODO
router.put('/', requireJwt, (req, res) => {
    var company = req.body.company.id
    var date = req.body.todo.dateDue
    var desc = req.body.todo.description
    var data = req.body.todo.id
    var owner = req.user.uid


    Todo.update({
        companyID: company,
        dateDue: date,
        description: desc,
        owner: owner
    },
        { where: { id: data } }
    ).then(
        (successData) => {
            Log.create({
                clientUid: owner,
                description: owner + ' updated a to-do task with an id of ' + data,
                message: 'updated a to-do task'
            }).then(
                (successLog) => {
                    res.json({log : successLog})
                }
            )
        },
        (err) => {
            res.send({ error: err })
        }
    )
});
// DELETE SPECIFIC TODO ASSIGNMENT
router.delete('/:id', requireJwt, function (req, res) {
    var data = req.params.id;
    // console.log(data); here for testing purposes
    Todo
        .destroy({
            where: { id: data }
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