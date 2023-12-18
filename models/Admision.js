import mongoose from 'mongoose'

const schema  = new mongoose.Schema({
  fecha_ingreso: {
    type: Date
  },
  fecha_prealta: {
    type: Date
  },
  fecha_egreso: {
    type: Date
  },
  hospitalizado: {
    type: Boolean,
    default: true
  },
  servicio_tratante: {
    type: String,
    enum: [
        'Neumologia',
        'CTX',
        'ORL', 
        'Neumopedia', 
        'Areas_Criticas', 
    ],
  },
  paciente_relacionado:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Paciente',
  }, 
  cama_relacionada: [
    {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Cama',
    }
  ],
  microorganismo_relacionado: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Microorganismo'
  }],
})

export default mongoose.model('Admision', schema)
