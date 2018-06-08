import mongoose from 'mongoose'

export default mongoose.model('Users',mongoose.Schema({
    name: String,
    password: String
}))