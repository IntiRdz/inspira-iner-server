import mongoose from 'mongoose'

const schema  = new mongoose.Schema({
    paciente_relacionado:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Paciente',
      }, 

    cama_relacionada: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Cama' 
    },
    fecha_Entrada: Date,
    fecha_Salida: Date,
    estado_paciente: { // Nuevo campo para cambios en el estado del paciente
        type: String,
        enum: [
            'Critico', 
            'Delicado', 
            'Estable', 
            'Mejoria'
        ]
    },
});

export default mongoose.model('CamaEstancia', schema)