import mongoose from 'mongoose'

const schema  = new mongoose.Schema({

    nombre: {
        type: String,
        required: true,
        trim: true
    },
    apellido: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    }, 
    creado: {
        type: Date,
        default: Date.now() 
    } 
    
})

export default mongoose.model('Usuario', schema)