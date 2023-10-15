const mongoose = require('mongoose');

const transferenciaSchema = new mongoose.Schema({
    id_transferencia: {
      type: Number,
      required: true
    },
  id_paciente: {
    type: ID,
    required: true
  },
  id_admision_hospitalaria: {
    type: ID
  },
  servicio_clinico_transferencia: {
    type: String
  },
  fecha_entrada: {
    type: Date
  },
  fecha_salida: {
    type: Date
  }
});

const Transferencia = mongoose.model('Transferencia', transferenciaSchema);

module.exports = Transferencia;
