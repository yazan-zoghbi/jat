import mongoose from "mongoose";

enum ApplicationStatus {
    applied, interview, offer, rejected
}

const applicationSchema = new mongoose.Schema({

    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    company: { type: String, required: true },
    role: { type: String, reqiured: true },
    date: { type: Date, required: true },
    status: { type: ApplicationStatus, required: true },
    platform: { type: String, required: true }

})


export const ApplicationModel = new mongoose.Model(applicationSchema, "Application")