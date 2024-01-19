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
  

  programa_suenio_imc: {
    type: Boolean,
  },
  programa_suenio_hipoventilacion: {
    type: Boolean,
  },
  programa_suenio_restriccionTorax: {
    type: Boolean,
  },

  programa_suenio_neuromuscular: {
    type: Boolean,
  },



  programa_nutricion_puntuacion: {
    type: Number,
  },
  programa_nutricion_grupoRiesgo: {
    type: String,
    trim: true
  },
  programa_nutricion_via: {
    type: String,
    trim: true
  },


  programa_social_grupo_etario: {
    type: String,
    trim: true
  },
  programa_social_genero: {
    type: String,
    trim: true
  },
  programa_social_orientacion_sexual: {
    type: String,
    trim: true
  },
  programa_social_municipio: {
    type: String,
    trim: true
  },
  programa_social_estado: {
    type: String,
    trim: true
  },
  programa_social_pais: {
    type: String,
    trim: true
  },
  programa_social_zona_marginada: {
    type: String,
    trim: true
  },
  programa_social_condicion_social: {
    type: String,
    trim: true
  },
  programa_social_deficit_economico: {
    type: Boolean,
  },
  programa_social_migrante: {
    type: String,
    trim: true
  },
  programa_social_abandono_social: {
    type: Boolean,
  },
  programa_social_situacion_calle: {
    type: Boolean,
  },
  programa_social_red_apoyo: {
    type: String,
    trim: true
  },
  programa_social_tipo_familia: {
    type: String,
    trim: true
  },
  programa_social_idioma: {
    type: String,
    trim: true
  },
  programa_social_lengua_indigena: {
    type: String,
    trim: true
  },
  programa_social_discapacidad_cdpd: {
    type: String,
    trim: true
  },
  programa_social_escolaridad: {
    type: String,
    trim: true
  },
  programa_social_ocupacion: {
    type: String,
    trim: true
  },
  programa_social_derechohabiencia: {
    type: String,
    trim: true
  },
  programa_social_religion: {
    type: String,
    trim: true
  },
  programa_social_limitada: {
    type: String,
    trim: true
  },
  programa_social_violencia: {
    type: Boolean,
  },
  programa_social_caso_medicolegal: {
    type: String,
    trim: true
  },
  programa_social_mater: {
    type: Boolean,
  },
  programa_social_riesgos_vivienda: {
    type: String,
    trim: true
  },  
  programa_social_vivienda_tipo: {
    type: String,
    trim: true
  },  
  programa_social_vivienda_material: {
    type: String,
    trim: true
  },  
  programa_social_vivienda_servicios: {
    type: String,
    trim: true
  }, 
  programa_social_vivienda_cuartos: {
    type: Number,
  },
  programa_social_vivienda_personas: {
    type: Number,
  },
  programa_social_vivienda_hacinamiento: {
    type: Boolean,
  }, 
  programa_social_vivienda_atencion_alarma: {
    type: String,
    trim: true
  },  
  programa_social_dispositivo_medicos: {
    type: String,
    trim: true
  },
  programa_social_animales: {
    type: Boolean,
  },
  programa_social_animales_tipo: {
    type: String,
    trim: true
  },
  programa_social_lenia: {
    type: Boolean,
  },
  programa_social_trabajo_riesgos: {
    type: String,
    trim: true
  },
  programa_social_barreras_aprendizaje: {
    type: String,
    trim: true
  },
  programa_social_exposicion_sustancias: {
    type: String,
    trim: true
  },
  programa_social_exposicion_sustancias_anios: {
    type: String,
    trim: true
  },
  programa_social_exposicion_sustancias_horas: {
    type: String,
    trim: true
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
