import mongoose from 'mongoose'

const schema  = new mongoose.Schema({
    paciente_relacionado:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Paciente',
      }, 

    fecha_transferencia: {
        type: Date,
    },

})

export default mongoose.model('Transferencia', schema)