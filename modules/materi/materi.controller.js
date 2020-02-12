const express = require('express');
const router = express.Router();
const db = require('../../helpers/db');
const Materi = db.Materi;

// routes

router.post('/post/all', create);
router.get('/all', getAll);
router.get('/', getById);
router.delete('/delete', _delete);

module.exports = router;

async function create(req,res) {
}

async function getAll(req, res) {
        let query = await Materi.find();
        let result = res.json(
            {
                "message" : "Success Get All Materi Materi" , 
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

        let query = await Materi.findById(model._id);
        let result = res.json(
            {
                "message" : "Success Get Materi by Id" , 
                "code" : 200, 
                "data" : query 
            }
        )
        
        return result
   
}

async function _delete(req, res) {
        let query = await Materi.remove();
        let result = res.json(
            {
                "message" : "Success Remove Materi" , 
                "code" : 200, 
                "data" : query
            }
        )
        return result
 
}
