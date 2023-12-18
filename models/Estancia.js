import mongoose from 'mongoose'

const schema  = new mongoose.Schema({
    paciente_relacionado:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Paciente',
      }, 
    admision_relacionada: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Admision' 
    },
    camas: [
        { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'CamaEstancia' 
        }
    ],
    transferencias: [
        { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Transferencia' 
        }
    ],
    dias_estancia: Number,
    fecha_prealta: {
        type: Date,
    },
    fecha_egreso: {
        type: Date,
    },
    motivo_egreso: {
        type: String,
        enum: [
            'Mejoria',
            'Traslado', 
            'AltaVoluntaria',
            'Defuncion', 
        ],
    },
})

export default mongoose.model('Estancia', schema)