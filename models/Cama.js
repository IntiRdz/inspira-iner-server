import mongoose from 'mongoose'

const schema  = new mongoose.Schema({

    cama_numero: {
        type: Number,
        required: true,
        trim: true,
        unique: true
    },
    cama_compartida: {
        type: Boolean,
        required: true
    },
    cama_disponible: {
        type: Boolean,
        required: true,
        default: true
    },
    cama_ocupada: {
        type: Boolean,
        required: true,
        default: false
    },
    cama_genero: {
        type: String,
        enum: [
            'Mujer', 
            'Hombre', 
            'No_especificado'
        ],
        required: true
    },
    cama_dispositivo_o2: {
        type: String,
        enum: [
            'VM', 
            'No_VM'
        ],
        required: true,
    },
    cama_hemodialisis: {
        type: Boolean,
        required: true
    },
    cama_aislamiento: {
        type: Boolean,
        required: true
    },
    cama_dan: {
        type: Boolean,
        required: true,
        default: false
    },
    cama_codigo_uveh: {
        type: String,
        enum: [
            'Sin_Aislamientos', 
            'Previamente_Acinetobacter', 
            'Previamente_Clostridium', 
            'Previamente_Enterobacterias_XDR', 
            'Previamente_Pseudomonas_Aeruginosa_XDR'
        ],
        required: true,
    },
    cama_fecha_inicio: {
        type: Date,
    },
    cama_fecha_fin: {
        type: Date,
    },
    creado: {
        type: Date,
        default: Date.now() 
    },
    // Agregar una referencia al paciente actual que ocupa la cama (si está ocupada)
    paciente_relacionado: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Paciente',
        default: null
    },
    microorganismo_relacionado: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Microorganismo',
        default: null
    },
    
})

export default mongoose.model('Cama', schema)