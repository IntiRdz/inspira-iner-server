import mongoose from 'mongoose'

const schema  = new mongoose.Schema({

    antibiotico_nombre: {
        type: String,
        trim: true
    },
    antibiotico_comentario: {
        type: String,
        trim: true
    },
    antibiotico_inicio:{
        type: Date,
        default: Date.now() 
    },
    antibiotico_fin:{
        type: Date, 
    },
    // Agregar una referencia al paciente al que se le administró el antibiótico
    paciente_relacionado: [
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Paciente',
        }
    ],
    microorganismo_relacionado:[
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Microorganismo',
        }
    ]

})

export default mongoose.model('Antibiotico', schema)