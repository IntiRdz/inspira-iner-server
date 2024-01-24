import mongoose from 'mongoose'

const schema  = new mongoose.Schema({

    fecha_diagnostico: {
      type: Date
    },
    fecha_resolucion: {
        type: Date,
        required: false
    },
    diagnostico_nombre: {
        type: String,
        trim: true
    },
    diagnostico_tipo: {
      type: String,
      enum: [
          'Previo',
          'Ingreso',
          'Hospitalizacion',
          'Egreso'
      ],
  },
    diagnostico_activo: {
        type: Boolean
    },
    admision_relacionada:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Admision',
    },
})

export default mongoose.model('Laboratorio', schema)