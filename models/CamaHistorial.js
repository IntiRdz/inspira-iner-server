import mongoose from 'mongoose'

const schema  = new mongoose.Schema({

    cama: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cama',
        }
      ,
    fecha_traslado: {
        type: Date
      },
    admision_relacionada:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Admision',
    },
    microorganismo_relacionado: [
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Microorganismo',
        }
    ],
    fecha_creado: {
      type: Date,
      default: Date.now // Esto establece la fecha y hora actual como valor por defecto
  }
})

export default mongoose.model('CamaHistorial', schema)