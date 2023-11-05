
export const typeDefs = `#graphql

scalar Date

type Token {
    token: String
}
type Usuario {
    id: ID!
    nombre: String
    apellido: String
    email: String
    creado: Date
    activo:Boolean
}
enum Genero {
    Hombre
    Mujer
    Indeterminado
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
enum CaracteristicasEspeciales {
    TrasladoDeHospital
    InfeccionReciente
    Embarazo
    Inmunosupresion
}

enum CodigoPaciente {
    SinDefinir
    SinAislamientos
    Acinetobacter
    ColonizacionAcinetobacter
    ContactoAcinetobacter
    HisopadoRectal
    ClostridiumDifficile
    Enterobacterias_XDR_MDR
    Pseudomonas_XDR_MDR
    SAMR
    TuberculosisisOSospecha
    SAMS
}

enum PrioridadCama{
    SinPrioridad
    COVID
    VirusRespiratorios
    B24
    TuberculosisSensible
    TuberculosisResistente
}

enum DispositivoO2cama {
    VM
    No_VM
}
enum CodigoCama{
    Sin_Definir
    Sin_Aislamientos
    Previamente_Acinetobacter
    Previamente_Clostridium
    Previamente_Enterobacterias_XDR
    Previamente_Pseudomonas_Aeruginosa_XDR
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
type Paciente {
    id: ID!
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
    caracteristicas_especiales: [CaracteristicasEspeciales]
    pac_codigo_uveh: [CodigoPaciente]
    fecha_ingreso: Date
    fecha_prealta: Date
    fecha_egreso: Date
    hospitalizado: Boolean
    creado: String
    user: ID
    cama_relacionada: [Cama]
    microorganismo_relacionado:[Microorganismo]
    antibiotico_relacionado: [Antibiotico]
}
type Cama {
    id: ID!
    cama_numero: Int
    cama_compartida: Boolean
    cama_prioridad: PrioridadCama
    cama_disponible: Boolean
    cama_ocupada:Boolean
    cama_genero: Genero
    cama_dispositivo_o2: DispositivoO2cama
    cama_hemodialisis: Boolean
    cama_aislamiento: Boolean
    cama_dan: Boolean
    cama_codigo_uveh: CodigoCama
    creado: Date
    paciente_relacionado: [Paciente]
    microorganismo_relacionado: [Microorganismo]
}
type Microorganismo {
    id: ID!
    fecha_deteccion: Date
    metodo_deteccion: MetodoDeteccion
    microorganismo_tipo: MicroorganismoTipo
    microorganismo_nombre: String
    susceptibilidad: Susceptibilidad
    comentario_uveh: String
    paciente_relacionado: [Paciente]
    cama_relacionada: [Cama]
    antibiotico_relacionado:[Antibiotico]
}
type Antibiotico {
    id: ID!
    antibiotico_nombre: String
    antibiotico_comentario: String
    antibiotico_inicio: Date
    antibiotico_fin: Date
    paciente_relacionado: Paciente
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
    diagnostico1: [Diagnostico1]
    diagnostico: String
    caracteristicas_especiales: [CaracteristicasEspeciales]
    pac_codigo_uveh: [CodigoPaciente]
    fecha_ingreso: Date
    fecha_prealta: Date
    fecha_egreso: Date
    hospitalizado: Boolean
    cama_relacionada: ID
    microorganismo_relacionado:ID
    antibiotico_relacionado: ID
}

input CamaInput {
    cama_numero: Int
    cama_compartida: Boolean
    cama_prioridad: PrioridadCama
    cama_disponible: Boolean
    cama_ocupada: Boolean
    cama_genero: Genero
    cama_dispositivo_o2: DispositivoO2cama
    cama_hemodialisis: Boolean
    cama_aislamiento: Boolean
    cama_dan: Boolean
    cama_codigo_uveh: CodigoCama
    paciente_relacionado: ID
    microorganismo_relacionado:ID
}

input MicroorganismoInput {
    fecha_deteccion: Date
    metodo_deteccion: MetodoDeteccion
    microorganismo_tipo: MicroorganismoTipo
    microorganismo_nombre: String
    susceptibilidad: Susceptibilidad!
    comentario_uveh: String
    paciente_relacionado: ID
    cama_relacionada: ID
    antibiotico_relacionado: ID 
}

input AntibioticoInput {
    antibiotico_nombre: String
    antibiotico_comentario: String
    antibiotico_inicio: Date
    antibiotico_fin: Date
    paciente_relacionado: ID
    microorganismo_relacionado:ID
}

type Query {

    #Usuarios
    # obtenerUsuario(token: String!): Usuario
    obtenerUsuario: Usuario

    #Pacientes
    obtenerPaciente(id: ID!): Paciente
    obtenerPacientes: [Paciente]
    obtenerPacientesUser: [Paciente]
    obtenerPacientesHospitalizados: [Paciente]
    obtenerPacientesNoHospitalizados: [Paciente]
    obtenerPacientesHospitalizadosSinCama: [Paciente]

    # Camas
    obtenerCama(id: ID!) : Cama
    obtenerCamas: [Cama!]!
    obtenerCamasOcupadas: [Cama!]!
    obtenerCamasDisponibles: [Cama]
    obtenerCamasDisponiblesMujer: [Cama]
    obtenerCamasDisponiblesNombre: [Cama]

    # Microorganismos
    obtenerMicroorganismo(id: ID!) : Microorganismo
    obtenerMicroorganismos: [Microorganismo]
    obtenerMicroorganismosPatient(id: ID!): [Microorganismo]

    # Antibioticos
    obtenerAntibiotico(id: ID!) : Antibiotico
    obtenerAntibioticos: [Antibiotico]


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