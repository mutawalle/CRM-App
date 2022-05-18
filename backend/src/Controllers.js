const models = require('./Models')
const bcrypt = require('bcryptjs')
const { body, validationResult } = require('express-validator')

// validasi user
exports.validasiUser = [
    body('email').isEmail().withMessage('Email harus valid').custom(value => {
        return models.user.findOne({email: value}).then(user => {
            if(user){
                return Promise.reject('Email sudah terdaftar')
            }
        })
    }),
    body('password').isLength({ min: 8 }).withMessage('Password minimal 8 karakter')
]

// create user
exports.buatUser = async (req, res) => {
    // hasil validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    
    // hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password, salt)

    const user = new models.user({
        fullName: req.body.fullName,
        companyName: req.body.companyName,
        email: req.body.email,
        serviceGroup: req.body.serviceGroup,
        serviceType: req.body.serviceType,
        channels: req.body.channels,
        password: hashedPassword,
        role: 'user',
        photoProfile: ''
    })

    try{
        const saveUser = await user.save()
        res.send(saveUser)
    }catch{
        res.status(400).send(err)
    }
}

// login user
exports.loginUser = async (req, res) => {
    // cek apakah akun ada berdasar email dan password benar
    const akunAda = await models.user.findOne({email: req.query.email})
    if (akunAda){
        const passwordBenar = await bcrypt.compare(req.query.password, akunAda.password)
        if(passwordBenar){
            res.send(akunAda)
        }else{
            res.status(400).send({msg:'email or password wrong'})
        }
    }else{
        res.status(400).send({msg: 'email or password wrong'})
    }
}

// upload photo
const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
        const name = Date.now().toString() + '-' + file.originalname
        cb(null, name)
    }
})

exports.uploadPhotoProfile = multer({ storage: storage }).single('gambar')

exports.buatPhotoProfile = (req, res) => {
    // update user photo profile
    models.user.findOneAndUpdate({email: req.body.email}, {photoProfile: req.file.path}, {new: true}, (err, user) => {
        if(err){
            res.status(400).send(err)
        }else{
            res.status(200).send(user)
        }
    })
}

// create ticket
exports.createTicket = async (req, res) => {
    const time = new Date().toString()
    const ticket = new models.ticket({
        subject: req.body.subject,
        description: req.body.description,
        status: 'waiting',
        date: time.substring(4,24),
        user: req.body.user,
        admin: '',
    })

    try{
        const saveTicket = await ticket.save()
        res.status(200).send(saveTicket)
    }catch{
        res.status(400).send(err)
    }
}

// get tickets
exports.getTicket = async (req, res) => {
    if(req.query.email === "admin"){
        ticket = await models.ticket.find()
    }else{
        ticket = await models.ticket.find({user: req.query.email})
    }

    res.status(200).send(ticket)
}

// update ticket
exports.updateTicket = async (req, res) => {
    const ticket = await models.ticket.findOneAndUpdate({_id: req.body._id}, {status: req.body.status, admin: req.body.admin}, {new: true})
    res.status(200).send(ticket)
}

// create pesan
exports.createPesan = async (req, res) => {
    const time = new Date().toString()
    const pesan = new models.pesan({
        pesan: req.body.pesan,
        date: time.substring(4,24),
        sender: req.body.sender,
        receiver: req.body.receiver,
        room: req.body.room,
    })

    try{
        const savePesan = await pesan.save()
        res.status(200).send(savePesan)
    }catch{
        res.status(400).send(err)
    }
}   

// get pesan
exports.getPesan = async (req, res) => {
    const pesan = await models.pesan.find({room: req.query.room})
    res.status(200).send(pesan)
}