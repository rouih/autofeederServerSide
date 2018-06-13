import mongoose from 'mongoose'

export default mongoose.model('Animals',mongoose.Schema({
    name: String,
    time: String,
}))