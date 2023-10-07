import mongoose from 'mongoose'

const schema  = new mongoose.Schema({

    expediente: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    pac_apellido_paterno: {
        type: String,
        required: true,
        trim: true
    },
    pac_apellido_materno: {
        type: String,
        required: true,
        trim: true
    },
    pac_nombre: {
        type: String,
        required: true,
        trim: true
    },
    pac_genero: {
        type: String,
        enum: ['Hombre', 'Mujer', 'No_especificado'],
        required: true
    },
    pac_FN: {
        type: Date,
        required: true
    },
    pac_dispositivo_o2: {
        type: String,
        enum: ['AA', 'PN', 'PNAF', 'VMNI', 'VM'],
        required: true
    },
    pac_hemodialisis: {
        type: Boolean,
        required: true,
        default: false
    },
    diagnostico: {
        type: String,
        required: true,
        trim: true
    },
    pac_codigo_uveh: {
        type: String,
        enum: ['Sin_Aislamientos', 'Acinetobacter', 'Colonización_Acinetobacter', 'Contacto_Acinetobacter' , 'Hisopado_Rectal', 'Clostridium_Difficile', 'Enterobacterias_XDR_MDR', 'Pseudomonas_XDR_MDR', 'SAMR', 'Tuberculosisis_o_Sospecha', 'SAMS'],
        required: true
    },
    fecha_ingreso: {
        type: Date,
        required: true
    },
    fecha_prealta: {
        type: Date,
    },
    fecha_egreso: {
        type: Date,
    },
    hospitalizado: {
        type: Boolean,
        required: true,
        default: true
    },
    creado: {
        type: Date,
        default: Date.now() 
    },
    user: {
        type: mongoose.Schema.Types.ObjectId, 
        required: true,
        ref: 'Usuario'
    },
        // Agregar una referencia a la cama actual del paciente
    cama_relacionada: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cama',
        default: null
    },
    // Agregar una referencia al último microorganismo detectado
    microorganismo_relacionado: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Microorganismo',
        default: null
    },
    // Agregar una referencia al último antibiótico administrado
    antibiotico_relacionado: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Antibiotico',
        default: null
    }
    
    
})

export default mongoose.model('Paciente', schema)