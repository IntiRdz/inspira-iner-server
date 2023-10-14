import mongoose from 'mongoose'

const schema  = new mongoose.Schema({

    antibiotico_nombre: {
        type: String,
        required: true,
        trim: true
    },
    antibiotico_comentario: {
        type: String,
        default: null,
        trim: true
    },
    antibiotico_inicio:{
        type: Date,
        default: Date.now(),
    },
    antibiotico_fin:{
        type: Date,
        required: false,

    },
    // Agregar una referencia al paciente al que se le administró el antibiótico
    paciente_relacionado: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Paciente',
        required: true
    },
    microorganismo_relacionado: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Microorganismo',
    }

})

export default mongoose.model('Antibiotico', schema)