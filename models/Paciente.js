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
            'No_especificado'],
    },
    pac_FN: {
        type: Date,
    },
    pac_dispositivo_o2: {
        type: String,
        enum: [
            'AA',
            'PN', 
            'PNAF', 
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
    pac_codigo_uveh: {
        type: String,
        enum: [
            'Sin_Definir',
            'Sin_Aislamientos', 
            'Acinetobacter', 
            'Colonización_Acinetobacter', 
            'Contacto_Acinetobacter' , 
            'Hisopado_Rectal', 
            'Clostridium_Difficile', 
            'Enterobacterias_XDR_MDR', 
            'Pseudomonas_XDR_MDR', 
            'SAMR', 
            'Tuberculosisis_o_Sospecha', 
            'SAMS'
        ],
    },
    fecha_ingreso: {
        type: Date,
    },
    fecha_prealta: {
        type: Date,
    },
    fecha_egreso: {
        type: Date,
    },
    hospitalizado: {
        type: Boolean,
        default: true
    },
    creado: {
        type: Date,
        default: Date.now() 
    },
    user: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Usuario'
    },
        // Agregar una referencia a la cama actual del paciente
    cama_relacionada:[ 
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cama',
        }
    ],
    // Agregar una referencia al último microorganismo detectado
    microorganismo_relacionado:[ 
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Microorganismo',
        }
    ],
    // Agregar una referencia al último antibiótico administrado
    antibiotico_relacionado: [
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Antibiotico',
        }
    ]    
})

export default mongoose.model('Paciente', schema)