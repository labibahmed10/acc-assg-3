const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types

// {
//     "title":"fronend-dev",
//     "location":"Asia",
//     "jobType":"On-site",
//     "salary":25000,
//     "deadLine":"2022-12-10",
//     "status":"active"
// }



const jobSchema = mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Job title is required'],
        trim: true
    },
    location: {
        type: String,
        trim: true,
        enum: {
            values: ['Asia', 'Africa', 'America', 'Europe'],
            message: '{VALUE} is not accepted as location. Chose from Asia/Africa/America/Europe '
        },
        required: [true, 'Job location is required']
    },
    jobType: {
        type: String,
        enum: {
            values: ['On-site', 'Remote', 'Hybrid'],
            message: '{VALUE} is not accepted as Job type. Chose from On-site/Remote/Hybrid '
        },
        required: [true, 'Job type is required']
    },
    salary: {
        type: Number,
        required: [true, 'Job salary is required'],
        min: [0, 'Job salary can\'t be negative']
    },
    deadLine: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        default: 'active',
        enum: {
            values: ['active', 'inactive', 'removed'],
            message: "{VALUE} is not accepted."
        }
    },
    applyCount: {
        type: Number,
        default: 0
    },
    postedBy: {
        name: {
            type: String,
            required: true
        },
        id: {
            type: ObjectId,
            ref: 'User',
            required: true
        }
    },
    appliedCandidate: [{
        applicantId: {
            type: ObjectId,
            ref: 'Candidate'
        },
        resume: String
    }],
         
}, { timestamps: true })

const Job = mongoose.model("Job", jobSchema)
module.exports = Job