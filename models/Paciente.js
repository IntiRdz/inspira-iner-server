import mongoose from 'mongoose'

const schema  = new mongoose.Schema({

    expediente: {
        type: String,
        trim: true,
        unique: true
    },
    pac_apellido_paterno: {
        type: String,
        trim: true
    },
    pac_apellido_materno: {
        type: String,
        trim: true
    },
    pac_nombre: {
        type: String,
        trim: true
    },
    pac_genero: {
        type: String,
        enum: [
            'Hombre', 
            'Mujer', 
            'Indeterminado'
        ],
    },
    pac_FN: {
        type: Date,
    },
    pac_dispositivo_o2: {
        type: String,
        enum: [
            'AA',
            'PN',
            'Tienda_Traqueal', 
            'PNAF', 
            'VMNI_Intermitente', 
            'VMNI',
            'VM'
        ],
    },
    pac_hemodialisis: {
        type: Boolean,
        default: false
    },
    diagnostico: {
        type: String,
        trim: true
    },
    diagnostico1: [
        {
          type: String,
          enum: [
            'CodigoHemoptisis',
            'CodigoViaAerea',
            'CodigoInfarto',
            'COVID',
            'Influenza',
            'Parainfluenza',
            'Adenovirus',
            'VirusSincialRespiratorio',
            'Metaneumovirus',
            'TuberculosisSensible',
            'TuberculosisResistente',
            'B24',
            'SIRA',
            'NeumoniaBacteriana',
            'EPOC',
            'Asma',
            'TromboembiaPulmonar',
            'DerramePleural',
            'Neumotorax',
            'NeumoniaIntersticialDifusa',
            'InsuficienciaCaridiaca',
            'CaPulmonarOSospecha'
            ]
        }
      ],
      caracteristicas_especiales: [
        {
          type: String,
          enum: [
            'TrasladoDeHospital',
            'InfeccionReciente',
            'Embarazo',
            'Inmunosupresion',
            'ComunidadLG'
            ]
        }
      ],
    pac_codigo_uveh: [
        {
        type: String,
        enum: [
            'Sin_Definir',
            'Sin_Aislamientos',
            'Acinetobacter',
            'Colonización_Acinetobacter',
            'Contacto_Acinetobacter',
            'Hisopado_Rectal',
            'Clostridium_Difficile',
            'Enterobacterias_XDR_MDR',
            'Pseudomonas_XDR_MDR',
            'SAMR',
            'Tuberculosisis_o_Sospecha',
            'SAMS'
            ]
        }
    ],
    user: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Usuario'
    },
    creado: {
        type: Date,
        default: Date.now() 
    },
    admision_relacionada:[ 
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Admision',
        }
      ],  
})

export default mongoose.model('Paciente', schema)