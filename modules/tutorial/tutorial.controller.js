const express = require('express');
const router = express.Router();
const db = require('../../helpers/db');
const Tutorial = db.Tutorial;

// routes

router.post('/post/all', create);
router.get('/all', getAll);
router.get('/', getById);
router.delete('/delete', _delete);

module.exports = router;

async function create(req,res) {
}

async function getAll(req, res) {
        let query = await Tutorial.find();
        let result = res.json(
            {
                "message" : "Success Get All Tutorial Tutorial" , 
                "code" : 200, 
                "data" : query 
            }
        )
        
        return result
   
}

async function getById(req, res) {
    let model = {
        _id : req.query.id
    }

        let query = await Tutorial.findById(model._id);
        let result = res.json(
            {
                "message" : "Success Get Tutorial by Id" , 
                "code" : 200, 
                "data" : query 
            }
        )
        
        return result
   
}

async function _delete(req, res) {
        let query = await Tutorial.remove();
        let result = res.json(
            {
                "message" : "Success Remove Tutorial" , 
                "code" : 200, 
                "data" : query
            }
        )
        return result
 
}
