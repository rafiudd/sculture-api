const express = require('express');
const router = express.Router();
const db = require('../../helpers/db');
const { ERROR: httpError } = require('../../helpers/httpError');
const response = require('../../helpers/wrapper');

const Materi = db.Materi;
// routes

router.post('/post', create);
router.get('/all', getAll);
router.get('/', getById);
router.delete('/delete', _delete);

module.exports = router;

function create(req,res) {
    let model = {
        title: req.body.title,
        image: req.body.image,
        description: req.body.description,
    }

    Materi.create(model, (err, value) => {
        if (err) {
          return response.wrapper_error(res, httpError.INTERNAL_ERROR, 'An error has occurred');
        }
  
        response.wrapper_success(res, 201, 'Materi has been inserted', value);
    });
  
}

async function getAll(req, res) {
    try {
        let query = await Materi.find();
        return response.wrapper_success(res, 200, 'Succes Get All Materi', query);            
    } catch (error) {
        return response.wrapper_error(res, httpError.INTERNAL_ERROR, 'An error has occurred');            
    }
}

async function getById(req, res) {
    try {
        let model = {
            _id : req.query.id
        }
    
        let query = await Materi.findById(model._id);
        return response.wrapper_success(res, 200, 'Succes Get Materi By Id', query);            
    } catch (error) {
        return response.wrapper_error(res, httpError.INTERNAL_ERROR, 'An error has occurred');                    
    }

}

async function _delete(req, res) {
    try {
        let model = {
            id : req.query.id
        }

        let query = await Materi.findOneAndRemove({ _id : model.id });
        return response.wrapper_success(res, 200, 'Succes Delete Materi', query);                    
    } catch (error) {
        return response.wrapper_error(res, httpError.INTERNAL_ERROR, 'An error has occurred');                            
    }
}
