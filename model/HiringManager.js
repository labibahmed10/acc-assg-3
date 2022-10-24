const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types

// {
//     "name":"hr-1",
// }


const hiringManagerSchema = mongoose.Schema({
    name: {
        type: String,
        minLength: [3, 'Name must be more than 3 characters'],
        trim: true
    },
    user: {
        type: ObjectId,
        ref: 'User',
        required: true
    },
    jobPosted: [{
        type: ObjectId,
        ref: 'Job'
    }]
})

const HiringManager = mongoose.model('HiringManager', hiringManagerSchema)
module.exports = HiringManager