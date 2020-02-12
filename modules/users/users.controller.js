const express = require('express');
const router = express.Router();
const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../../helpers/db');
const { ERROR: httpError } = require('../../helpers/httpError');
const response = require('../../helpers/wrapper');

const User = db.User;

// routes
router.post('/login', authenticate);
router.post('/register', create);

module.exports = router;

async function create(req,res) {
    let model = {
        name : req.body.name,
        school : req.body.school,
        email : req.body.email,
        phone : req.body.phone,
        password : bcrypt.hashSync(req.body.password, 10)
    }
    let checkEmail = await User.findOne({ "email" : model.email });

    if (checkEmail) {
        return response.wrapper_error(res, httpError.INTERNAL_ERROR, 'Email is already taken')
    }

    const user = new User(model)
    let query = await user.save();

    return response.wrapper_success(res, 200, 'Succes Register User', query )
}

async function authenticate(req, res) {
    let model = {
        email : req.body.email,
        password : req.body.password
    }
    const checkEmail = await User.findOne({ "email" : model.email });

    if(!checkEmail) {
        return res.status(204).json({"message" : "email not found"})
    }

    if(checkEmail && bcrypt.compareSync(model.password, checkEmail.password)) {
        const token = jwt.sign({ sub: checkEmail.id }, config.secret);
        return response.wrapper_success(res, 200, 'Succes Register User', checkEmail,token )
    } else {
        return response.wrapper_error(res, httpError.INTERNAL_ERROR, 'Password Incorrect')
    }
}

