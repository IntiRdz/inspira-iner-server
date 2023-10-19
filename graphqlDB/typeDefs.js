
export const typeDefs = `#graphql

scalar Date

type Token {
    token: String
}

type Usuario {
    _id: ID
    nombre: String
    apellido: String
    email: String
    creado: Date
    activo:Boolean
}

type Paciente {
    _id: ID!
    expediente: String
    pac_apellido_paterno: String
    pac_apellido_materno: String
    pac_nombre: String
    pac_genero: Genero
    pac_FN: Date
    pac_dispositivo_o2: DispositivoO2
    pac_hemodialisis: Boolean
    diagnostico: String
    diagnostico1: [Diagnostico1]
    pac_codigo_uveh: CodigoPaciente
    fecha_ingreso: Date
    fecha_prealta: Date
    fecha_egreso: Date
    hospitalizado: Boolean
    creado: String
    user: ID
    cama_relacionada: [Cama]
    microorganismo_relacionado:[Microorganismo]
    antibiotico_relacionado: [ID]
}

enum Genero {
    Hombre
    Mujer
    No_especificado
}

enum DispositivoO2 {
    AA
    PN
    PNAF
    VMNI
    VM
}

enum Diagnostico1 {
  CodigoHemoptisis
  CodigoViaAerea
  CodigoInfarto
  COVID
  Influenza
  Parainfluenza
  Adenovirus
  VirusSincialRespiratorio
  TuberculosisSensible
  TuberculosisResistente
  B24
  SIRA
  NeumoniaBacteriana
  EPOC
  Asma
  TromboembiaPulmonar
  DerramePleural
  Neumotorax
  NeumoniaIntersticialDifusa
  InsuficienciaCaridiaca
  CaPulmonarOSospecha
}

enum CodigoPaciente {
    Sin_Definir
    Sin_Aislamientos
    Acinetobacter
    Colonizacion_Acinetobacter
    Contacto_Acinetobacter
    Hisopado_Rectal
    Clostridium_Difficile
    Enterobacterias_XDR_MDR
    Pseudomonas_XDR_MDR
    SAMR
    Tuberculosisis_o_Sospecha
    SAMS
}

type Cama {
    _id: ID!
    cama_numero: Int
    cama_compartida: Boolean
    cama_disponible: Boolean
    cama_ocupada:Boolean
    cama_genero: Genero
    cama_dispositivo_o2: DispositivoO2cama
    cama_hemodialisis: Boolean
    cama_aislamiento: Boolean
    cama_dan: Boolean
    cama_codigo_uveh: CodigoCama
    cama_fecha_inicio: Date
    cama_fecha_fin: Date
    creado: Date
    paciente_relacionado: [Paciente]
    microorganismo_relacionado: [Microorganismo]
}


enum DispositivoO2cama {
    VM
    No_VM
}


enum CodigoCama{
    Sin_Aislamientos
    Previamente_Acinetobacter
    Previamente_Clostridium
    Previamente_Enterobacterias_XDR
    Previamente_Pseudomonas_Aeruginosa_XDR
}

type Microorganismo {
    _id: ID!
    fecha_deteccion: Date
    metodo_deteccion: MetodoDeteccion
    microorganismo_tipo: MicroorganismoTipo
    microorganismo_nombre: String
    susceptibilidad: Susceptibilidad
    comentario_uveh: String
    paciente_relacionado: [Paciente]
    cama_relacionada: [Cama]
}


enum MetodoDeteccion {
    PCR
    Panel
    Cultivo
}

enum MicroorganismoTipo {
    Virus
    Bacteria
    Micobacteria
    Hongo
}

enum Susceptibilidad {
    BLEE
    MDR
    XDR
    Sensible
}

type Antibiotico {
    _id: ID!
    antibiotico_nombre: String!
    antibiotico_comentario: String
    antibiotico_inicio: String!
    paciente_relacionado: Paciente!
    microorganismo_relacionado: Microorganismo
}


input AutenticarInput{
    email: String!
    password: String!
}

input UsuarioInput {
    nombre: String!
    apellido: String!
    email: String!
    password: String!
}

input PacienteInput {
    expediente: String
    pac_apellido_paterno: String
    pac_apellido_materno: String
    pac_nombre: String
    pac_genero: Genero
    pac_FN: Date
    pac_dispositivo_o2: DispositivoO2
    pac_hemodialisis: Boolean
    diagnostico1: [String]
    diagnostico: String
    pac_codigo_uveh: CodigoPaciente
    fecha_ingreso: Date
    fecha_prealta: Date
    fecha_egreso: Date
    hospitalizado: Boolean
    cama_relacionada: ID
    microorganismo_relacionado: ID
}

input CamaInput {
    cama_numero: Int
    cama_compartida: Boolean
    cama_disponible: Boolean
    cama_ocupada: Boolean
    cama_genero: Genero
    cama_dispositivo_o2: DispositivoO2cama
    cama_hemodialisis: Boolean
    cama_aislamiento: Boolean
    cama_dan: Boolean
    cama_codigo_uveh: CodigoCama
    cama_fecha_inicio: Date
    cama_fecha_fin: Date
}

input MicroorganismoInput {
    fecha_deteccion: Date
    metodo_deteccion: MetodoDeteccion!
    microorganismo_tipo: MicroorganismoTipo!
    microorganismo_nombre: String!
    susceptibilidad: Susceptibilidad!
    comentario_uveh: String
    paciente_relacionado: ID
    cama_relacionada: ID
}

input AntibioticoInput {
    antibiotico_nombre: String!
    antibiotico_comentario: String
    antibiotico_inicio: String!
    paciente_relacionado: ID!
}

type Query {
    #Usuarios
    # obtenerUsuario(token: String!): Usuario
    obtenerUsuario: Usuario

    #Pacientes
    obtenerPacientes: [Paciente]
    obtenerPacientesUser: [Paciente]
    obtenerPaciente(id: ID!): Paciente
    obtenerPacientesHospitalizados: [Paciente]
    obtenerPacientesHospitalizadosSinCama: [Paciente]

    # Camas
    obtenerCamas: [Cama]
    obtenerCama(id: ID!) : Cama
    obtenerCamasOcupadas: [Cama!]!
    obtenerCamasDisponibles: [Cama]

    # Microorganismos
    obtenerMicroorganismos: [Microorganismo]
    obtenerMicroorganismosPatient(id: ID!): [Microorganismo]
    obtenerMicroorganismo(id: ID!) : Microorganismo

    # Antibioticos
    obtenerAntibioticos: [Antibiotico]
    obtenerAntibiotico(id: ID!) : Antibiotico


    # Busquedas Avanzadas
    buscarCama(texto: String!) : [Cama]
}

type Mutation {
    # Usuarios
    nuevoUsuario(input: UsuarioInput) : Usuario
    autenticarUsuario(input: AutenticarInput) : Token

    #Camas
    nuevaCama(input: CamaInput) : Cama
    actualizarCama( id: ID!, input : CamaInput ) : Cama
    eliminarCama( id: ID! ) : String
    desocuparCama(id: ID!): Cama

    #Microorganismos
    nuevoMicroorganismo(input: MicroorganismoInput) : Microorganismo
    actualizarMicroorganismo( id: ID!, input : MicroorganismoInput) : Microorganismo
    eliminarMicroorganismo( id: ID! ) : String

    #Antibioticos
    nuevoAntibiotico(input: AntibioticoInput) : Antibiotico
    actualizarAntibiotico( id: ID!, input : AntibioticoInput) : Antibiotico
    eliminarAntibiotico( id: ID! ) : String

    # Pacientes
    nuevoPaciente(input: PacienteInput) : Paciente
    actualizarPaciente(id: ID!, input: PacienteInput): Paciente
    eliminarPaciente(id: ID!) : String
    modificarEstadoHospitalizado(id: ID!):String
    
}
`;