import mongoose from 'mongoose'

const schema  = new mongoose.Schema({
  procedencia_admision: {
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
  motivo_egreso: {
    type: String,
    enum: [
        'TrasladoInterno',
        'TrasladoExterno', 
        'Mejoria', 
        'AltaVoluntaria', 
        'Defuncion', 
    ],
  },
  fecha_ingreso: {
    type: Date, //debe ser fecha y hora 
  },
  fecha_egreso: {
    type: Date,
  },
  fecha_prealta: {
    type: Date,
  },
  paciente_relacionado: [
    {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Paciente',
    }
  ], 
  cama_relacionada:[ 
    {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Cama',
    }
  ],

})

export default mongoose.model('Admision', schema)
