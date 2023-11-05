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
    cama_prioridad:{
        type: String,
        enum: [
            'SinPrioridad',
            'COVID',
            'VirusRespiratorios', 
            'B24', 
            'TuberculosisSensible',
            'TuberculosisResistente'
        ],
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
            'Indeterminado'
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
            'Sin_Definir',
            'Sin_Aislamientos', 
            'Previamente_Acinetobacter', 
            'Previamente_Clostridium', 
            'Previamente_Enterobacterias_XDR', 
            'Previamente_Pseudomonas_Aeruginosa_XDR'
        ],
    },
    creado: {
        type: Date,
        default: Date.now() 
    },
    paciente_relacionado: [
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Paciente',
        }
    ], 
    microorganismo_relacionado: [
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Microorganismo',
        }
    ],
    
})

export default mongoose.model('Cama', schema)