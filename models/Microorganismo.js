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
            'Panel_Neumonia', 
            'Cultivo'
        ],
        required: true
    },
    microorganismo_tipo: {
        type: String,
        enum: [
            'NA',
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
            'No_Aplica',
            'Sensible',
            'BLEE', 
            'MDR', 
            'XDR'
        ],
    },
    microorganismo_muestra_tipo: {
        type: String,
    },
    microorganismo_muestra_resultado: {
        type: String,
        enum: [
            'Pendiente',
            'Preliminar',
            'Definitivo', 
        ],
    },
    fecha_ultima_revision: {
        type: Date,
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