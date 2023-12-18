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
    // Agregar una referencia a la admision  en el que se detectó el microorganismo
    admision_relacionada: [
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Admision',
        }
    ],
    
})

export default mongoose.model('Microorganismo', schema)