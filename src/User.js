import mongoose from 'mongoose'

export default mongoose.model('Users',mongoose.Schema({
    Fullname: String,
    password: String,
    email:String
}))