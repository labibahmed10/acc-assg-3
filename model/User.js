const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs')

// {
//     "name":"",
//     "email":"@gmail.com",
//     "password":"Asdasd1!",
//     "confirmPassword":"Asdasd1!",
//     "contactNumber":"5454548",    
// }



const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minLength: [3, 'Name must contain at least 3 characters'],
        maxLength: [20, 'Name can not be more than 20 characters'],
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
        validate: [validator.isEmail, 'Please provide a valid Email']
    },
    password: {
        type: String,
        required: [true, "Please type your password"],
        validate: {
            validator: (value) => validator.isStrongPassword(value, {
                minLength: 5,
                minLowercase: 1,
                minUppercase: 1,
                minNumbers: 1,
                minSymbols: 1,
            }),
            message: "Password is not strong enough.",
        },
    },
    confirmPassword: {
        type: String,
        required: [true, "Please confirm your password"],
        validate: {
          validator: function (value) {
            return value === this.password;
          },
          message: "Passwords don't match!",
        },
    },
    role: {
        type: String,
        default: 'candidate',
        enum: {
            values: ['candidate', 'hiring-manager', 'admin'],
            message: "User role can't be {VALUE}"
        }
    },
    contactNumber: {
        type: String,
        validate: [validator.isMobilePhone, "Please provide a valid contact number"],
    },
    imageURL: {
        type: String,
        validate: [validator.isURL, "Please provide a valid url"],
    },
    appliedJobs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Job",
    }],
 }, {
     timestamps: true
})

// Hash Password_____________
userSchema.pre('save', function (next) {
    const hashedPass = bcrypt.hashSync(this.password, 10)
    this.password = hashedPass;
    this.confirmPassword = undefined;
    next()
})

// Compare hash Password_____________
userSchema.methods.comparePass = (pass, hashedPass) => {
    const isValidPassword = bcrypt.compareSync(pass, hashedPass)
    return isValidPassword
}

const User = mongoose.model('User', userSchema)
module.exports = User
