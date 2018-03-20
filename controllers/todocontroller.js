const router = require('express').Router();
const db = require('../models/index');
const Todo = db.sequelize.import('../models/todo.js');
const Log = db.sequelize.import('../models/log.js')
const passport = require('passport');
require('../services/authorizeClient');
const requireJwt = passport.authenticate('jwt', { session: false})
// CREATING ENTITY
router.post('/', requireJwt, (req, res) => {
    var company = req.body.company.uid
    var date = req.body.todo.dateDue
    var desc = req.body.todo.description
    var owner = req.user.uid
    var letters = /^[a-zA-Z0-9\s-]+$/
    
    if(req.body.todo.dateDue.match(letters) && req.body.todo.description.match(letters)){

    Todo.create({
        companyId: company,
        dateDue: date,
        description: desc,
        owner: owner
    }).then(
        (successData) => {
            Log.create({
                clientUid: owner,
                description: owner + ' created a to-do task with an id of ' + successData.uid,
                message: 'created a to-do task',
                companyId: company
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
} else {
    res.send("Invalid characters")
}
})
//FINDING ALL TODO ASSIGNMENTS OF SPECIFIC CLIENT
//RELOOK INTO WHEN DOING CLIENT SIDE
router.get('/all/:companyId', requireJwt, function (req, res) {
    var data = req.params.companyId;
    Todo.findAll(
        {
            where: { companyId: data }
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
router.get('/:uid', requireJwt, function (req, res) {
    var data = req.params.uid;
    // console.log(data); here for testing purposes
    Todo
        .findOne({
            where: { uid: data }
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
    var company = req.body.company.uid
    var date = req.body.todo.dateDue
    var desc = req.body.todo.description
    var data = req.body.todo.uid
    var owner = req.user.uid


    Todo.update({
        companyId: company,
        dateDue: date,
        description: desc,
        owner: owner
    },
        { where: { uid: data } }
    ).then(
        (successData) => {
            Log.create({
                clientUid: owner,
                description: owner + ' updated a to-do task with an id of ' + data,
                message: 'updated a to-do task',
                companyId: company
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
router.delete('/:uid', requireJwt, function (req, res) {
    var data = req.params.uid;
    // console.log(data); here for testing purposes
    Todo
        .destroy({
            where: { uid: data }
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