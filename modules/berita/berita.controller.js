const express = require('express');
const router = express.Router();
const db = require('../../helpers/db');
const { ERROR: httpError } = require('../../helpers/httpError');
const response = require('../../helpers/wrapper');

const Berita = db.Berita;

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

    Berita.create(model, (err, value) => {
        if (err) {
          return response.wrapper_error(res, httpError.INTERNAL_ERROR, 'An error has occurred');
        }
  
        response.wrapper_success(res, 201, 'Berita has been inserted', value);
    });
  
}

async function getAll(req, res) {
    try {
        let query = await Berita.find();
        return response.wrapper_success(res, 200, 'Succes Get All Berita', query);            
    } catch (error) {
        return response.wrapper_error(res, httpError.INTERNAL_ERROR, 'An error has occurred');            
    }
}

async function getById(req, res) {
    try {
        let model = {
            _id : req.query.id
        }
    
        let query = await Berita.findById(model._id);
        return response.wrapper_success(res, 200, 'Succes Get Berita By Id', query);            
    } catch (error) {
        return response.wrapper_error(res, httpError.INTERNAL_ERROR, 'An error has occurred');                    
    }

}

async function _delete(req, res) {
    try {
        let model = {
            id : req.query.id
        }

        let query = await Berita.findOneAndRemove({ _id : model.id });
        return response.wrapper_success(res, 200, 'Succes Delete Berita', query);                    
    } catch (error) {
        return response.wrapper_error(res, httpError.INTERNAL_ERROR, 'An error has occurred');                            
    }
}
