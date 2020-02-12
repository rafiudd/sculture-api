const express = require('express');
const router = express.Router();
const db = require('../../helpers/db');
const Berita = db.Berita;

// routes

router.post('/post/all', create);
router.get('/all', getAll);
router.get('/', getById);
router.delete('/delete', _delete);

module.exports = router;

async function create(req,res) {
}

async function getAll(req, res) {
        let query = await Berita.find();
        let result = res.json(
            {
                "message" : "Success Get All Materi Berita" , 
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

        let query = await Berita.findById(model._id);
        let result = res.json(
            {
                "message" : "Success Get Berita by Id" , 
                "code" : 200, 
                "data" : query 
            }
        )
        
        return result
   
}

async function _delete(req, res) {
        let query = await Berita.remove();
        let result = res.json(
            {
                "message" : "Success Remove Berita" , 
                "code" : 200, 
                "data" : query
            }
        )
        return result
 
}
