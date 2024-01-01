import mongoose from 'mongoose'

const schema  = new mongoose.Schema({

    fecha_deteccion: {
        type: Date,
        required: true
    },
    metodo_deteccion: {
        type: String,
        enum: [
            'PCR', 
            'Panel', 
            'Cultivo'
        ],
        required: true
    },
    microorganismo_tipo: {
        type: String,
        enum: [
            'Virus', 
            'Bacteria', 
            'Micobacteria', 
            'Hongo'],
        required: true
    },
    microorganismo_nombre: {
        type: String,
        required: true,
        trim: true
    },
    susceptibilidad: {
        type: String,
        enum: [
            'BLEE', 
            'MDR', 
            'XDR', 
            'Sensible'
        ],
    },
    comentario_uveh: {
        type: String,
        default: null,
        trim: true
    },
    camahistorial: 
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CamaHistorial',
        }  
    
})

export default mongoose.model('Microorganismo', schema)