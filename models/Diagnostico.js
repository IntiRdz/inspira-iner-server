import mongoose from 'mongoose'

const diagnosticoSchema = new mongoose.Schema({
  id_paciente: {
    type: Number,
    required: true
  },
  id_admision_hospitalaria: {
    type: Number,
    required: true
  },

  codigo_icd: {
    type: Float,
    required: true
  },
});

const Diagnostico = mongoose.model('Diagnostico', diagnosticoSchema);

module.exports = Diagnostico;