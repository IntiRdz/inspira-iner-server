import mongoose from 'mongoose'

const schema  = new mongoose.Schema({
  procedencia_admision: {
    type: String,
    enum: [
        'Domicilio',
        'Otro_Hospital', 
    ],
  },
  fecha_ingreso: {
    type: Date
  },
  lugar_ingreso: {
    type: String,
    enum: [
        'Urgencias',
        'UCI', 
        'UCPQ', 
        'UTIM', 
        'ServicioClinico',
        'ConsultaExterna' 
    ],
  },
  paciente_relacionado:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Paciente',
  }, 
})

export default mongoose.model('Admision', schema)
