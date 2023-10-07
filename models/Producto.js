import mongoose from 'mongoose'

const schema  = new mongoose.Schema({

    nombre: {
        type: String,
        required: true,
        trim: true
    },
    existencia: {
        type: Number,
        required: true,
        trim: true
    },
    precio: {
        type: Number,
        required: true,
        trim: true
    }, 
    creado: {
        type: Date,
        default: Date.now() 
    }
    
})

export default mongoose.model('Producto', schema)