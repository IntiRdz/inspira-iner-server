const mongoose = require('mongoose');

const admissionSchema = new mongoose.Schema({
  id_paciente: {
    type: ID, //vinculo o llave foranea
    required: true,
  },
  id_admision_hospital: {
    type: Number,
    required: true,
  },
  fecha_admision: {
    type: Date, //debe ser fecha y hora 
    required: true,
  },
  fecha_alta: {
    type: Date,
  },
  fecha_defuncion: {
    type: Date,
  },
  tipo_admision: {
    type: String,
    required: true,
  },

/* enum {
    ambulatorio,
    urgenciasDirecto,
    hospitalizacionDirecto,
    ingresoObservacion,
    ingresoQuirurgico,
    electiva,
    urgente
} */

  ubicacion_admision: {
    type: String,
    required: true,
  },
/* domicilio,
otroHospital,
urgencias,
servicioClinico, */

  ubicacionAlta: {
    type: String,
  },

/*  domicilio,
 otroHospital,
 defuncion  */

  fechaRegistroUrgencias: {
    type: Date,
  },
  fechaSalidaUrgencias: {
    type: Date,
  },
  fallecidoHospital: {
    type: Boolean,
    required: true,
  },
});

const Admission = mongoose.model('Admission', admissionSchema);

module.exports = Admission;
