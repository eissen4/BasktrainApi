const router = require('express').Router();
const bcrypt = require('bcryptjs/dist/bcrypt');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const {registerValidation, loginValidation} = require ('../validation')

//REGISTER
router.post('/register', async (req, res) => {
    //Valida que los datos sean correctos
    const {error} = registerValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    //Usuario no existe
    const usernameExist = await User.findOne({username: req.body.username});
    if (usernameExist) return res.status(400).send('El usuario ya existe');

    //Hashear la contraseña
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt)

    //Crea usuario
    const user = new User ({
        username: req.body.username,
        password: hashedPassword,
        email: req.body.email
    });
    try {
        const savedUser = await user.save();
        res.send(savedUser);
    }catch (err) {
        res.status(400).send(err);
    }
});

//LOGIN
router.post('/login', async (req,res) => {
    console.log(req.body)
    //Valida que los datos sean correctos
    const {error} = loginValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    
    //Usuario no existe
    const username = await User.findOne({username: req.body.username});
    if (!username) return res.status(400).send('El usuario o la contraseña no son correctas.');

    //Contraseña no es correcta
    const validPassword = await bcrypt.compare(req.body.password, username.password);
    if (!validPassword) return res.status(400).send('El usuario o la contraseña no son correctas.');

    //Crea y asigna un token
    const token = jwt.sign({_id: username._id}, process.env.SECRET_TOKEN);
    res.header("auth-token", token).send({token});

    //res.send('Logged in')
});

module.exports = router;