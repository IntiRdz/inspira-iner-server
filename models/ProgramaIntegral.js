import mongoose from 'mongoose'

const schema  = new mongoose.Schema({
  programa_discapacidad_hipoacusia: {
    type: Boolean,
  },
  programa_discapacidad_disminucion_visual: {
    type: Boolean,
  },
  programa_discapacidad_perdida_barthel: {
    type: String,
    trim: true
  },
  programa_discapacidad_disminucion_cognitiva: {
    type: String,
    trim: true
  },
  programa_discapacidad_gds_fast: {
    type: Number,
  },
  programa_discapacidad_nu_desc: {
    type: Number,
  },
  programa_paliativos_sorpresa: {
    type: Boolean,
  },
  programa_paliativos_perdida_funcionalidad: {
    type: Boolean,
  },
  programa_paliativos_perdida_nutricional: {
    type: Boolean,
  },
  programa_paliativos_multimorbilidad: {
    type: Boolean,
  },
  programa_paliativos_recursosOingresos: {
    type: Boolean,
  },
  programa_paliativos_otraEnfermedaAvanzada: {
    type: Boolean,
  },
  programa_paliativos_total: {
    type: Number,
  },
  programa_paliativos_ecog: {
    type: Number,
  },
  admision_relacionada:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Admision',
  },
  preguntas_contestadas: {
    type: Number,
    default: 0,
  },
})

export default mongoose.model('ProgramaIntegral', schema)
