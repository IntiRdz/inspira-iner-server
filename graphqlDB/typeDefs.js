
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
    Tienda_Traqueal
    PNAF
    VMNI_Intermitente
    VMNI
    VM
}
enum Diagnostico1 {
    CodigoHemoptisis
    CodigoViaAerea
    CodigoInfarto
    SIRA
    NeumoniaViral
    COVID
    Influenza
    Parainfluenza
    VirusSincialRespiratorio
    Metaneumovirus
    NeumoniaBacteriana
    TuberculosisSensible
    TuberculosisResistente
    B24
    EPOC
    Asma
    TromboembiaPulmonar
    DerramePleural
    Neumotorax
    NeumoniaIntersticialDifusa
    InsuficienciaCardiaca
    CaPulmonarOSospecha
}
enum CaracteristicasEspeciales {
    TrasladoDeHospital
    InfeccionReciente
    Obstetrico
    Inmunosupresion
    ComunidadLG
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

enum ServicioTratante{
    Neumologia
    CTX
    ORL
    Neumopedia
    Areas_Criticas
}
enum CamaUbicacion{
    Urgencias
    UP
    Clinico1
    Clinico2
    Clinico3
    Clinico4
    UTIM
    Neumopedia
    ORL
    UCI
    UCPQ
}
enum LadoCama{
    Arriba
    Medio
    Bajo
    Ninguno
}
enum PrioridadCama{
    SinPrioridad
    COVID
    Influenza
    VirusRespiratorios
    B24
    TuberculosisSensible
    TuberculosisResistente
}

enum DispositivoO2cama {
    VM
    PN
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
    Panel_Neumonia
    Cultivo
}
enum MicroorganismoTipo {
    NA
    Virus
    Bacteria
    Micobacteria
    Hongo
}
enum Susceptibilidad {
    No_Aplica
    Sensible
    BLEE
    MDR
    XDR
}

enum MuestraResultadoEnum {
    Pendiente
    Preliminar
    Definitivo
}


enum ProcedenciaAdmision {
    Urgencias
    UCI
    UCPQ
    UTIM
    ServicioClinico
    ConsultaExterna
}


enum MotivoEgreso {
    TrasladoInterno 
    TrasladoExterno
    Mejoria
    AltaVoluntaria
    Defuncion
}

enum DiagnosticoTipoEnum {
    Previo
    Ingreso
    Hospitalizacion
    Egreso
}

type Cama {
    id: ID!
    cama_numero: String
    cama_orden: Int
    cama_ubicacion: CamaUbicacion
    cama_compartida: Boolean
    cama_lado: LadoCama
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
    camahistorial: [CamaHistorial]
}

type Microorganismo {
    id: ID!
    fecha_deteccion: Date
    metodo_deteccion: MetodoDeteccion
    microorganismo_tipo: MicroorganismoTipo
    microorganismo_nombre: String
    susceptibilidad: Susceptibilidad
    microorganismo_muestra_tipo: String
    microorganismo_muestra_resultado: MuestraResultadoEnum
    fecha_ultima_revision: Date
    comentario_uveh: String
    antibiotico_relacionado:[Antibiotico]
    camahistorial: CamaHistorial
}

type Diagnostico {
    id: ID!
    fecha_diagnostico: Date
    fecha_resolucion: Date
    diagnostico_nombre: String
    diagnostico_tipo: DiagnosticoTipoEnum
    diagnostico_activo: Boolean
    admision_relacionada: Admision
}

type CamaHistorial {
    id: ID!
    fecha_traslado: Date
    cama: Cama
    admision_relacionada: Admision
    microorganismo_relacionado: [Microorganismo]
}
type Admision {
    id: ID!
    fecha_ingreso: Date
    fecha_prealta: Date
    fecha_egreso: Date
    hospitalizado: Boolean
    servicio_tratante: ServicioTratante
    paciente_relacionado: Paciente
    cama_relacionada: [CamaHistorial]
    diagnostico: [Diagnostico]
    programaintegral: ProgramaIntegral
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
    pac_aislamiento: Boolean
    creado: Date
    admision_relacionada: [Admision]
}



type Antibiotico {
    id: ID!
    antibiotico_nombre: String
    antibiotico_comentario: String
    antibiotico_inicio: Date
    antibiotico_fin: Date
    microorganismo_relacionado: Microorganismo
}

type ProgramaIntegral {
    id: ID!
    programa_discapacidad_hipoacusia: Boolean
    programa_discapacidad_disminucion_visual: Boolean
    programa_discapacidad_perdida_barthel: String
    programa_discapacidad_disminucion_cognitiva: String
    programa_discapacidad_gds_fast: Int
    programa_discapacidad_nu_desc: Int
    
    programa_paliativos_sorpresa: Boolean
    programa_paliativos_perdida_funcionalidad: Boolean
    programa_paliativos_perdida_nutricional: Boolean
    programa_paliativos_multimorbilidad: Boolean
    programa_paliativos_recursosOingresos: Boolean
    programa_paliativos_otraEnfermedaAvanzada: Boolean
    programa_paliativos_total: Int
    programa_paliativos_ecog: Int
    
    programa_suenio_imc: Boolean
    programa_suenio_hipoventilacion: Boolean
    programa_suenio_restriccionTorax: Boolean
    programa_suenio_neuromuscular: Boolean
    
    programa_nutricion_puntuacion: Int
    programa_nutricion_grupoRiesgo: String
    programa_nutricion_via: String
    
    programa_social_grupo_etario: String
    programa_social_genero: String
    programa_social_orientacion_sexual: String
    programa_social_municipio: String
    programa_social_estado: String
    programa_social_pais: String
    programa_social_zona_marginada: String
    programa_social_condicion_social: String
    programa_social_deficit_economico: Boolean
    programa_social_migrante: String
    programa_social_abandono_social: Boolean
    programa_social_situacion_calle: Boolean
    programa_social_red_apoyo: String
    programa_social_tipo_familia: String
    programa_social_idioma: String
    programa_social_lengua_indigena: String
    programa_social_discapacidad_cdpd: String
    programa_social_escolaridad: String
    programa_social_ocupacion: String
    programa_social_derechohabiencia: String
    programa_social_religion: String
    programa_social_limitada: String
    programa_social_violencia: Boolean
    programa_social_caso_medicolegal: String
    programa_social_mater: Boolean
    programa_social_riesgos_vivienda: String
    programa_social_vivienda_tipo: String
    programa_social_vivienda_material: String
    programa_social_vivienda_servicios: String
    programa_social_vivienda_cuartos: Int
    programa_social_vivienda_personas: Int
    programa_social_vivienda_hacinamiento: Boolean
    programa_social_vivienda_atencion_alarma: String
    programa_social_dispositivo_medicos: String
    programa_social_animales: Boolean
    programa_social_animales_tipo: String
    programa_social_lenia: Boolean
    programa_social_trabajo_riesgos: String
    programa_social_barreras_aprendizaje: String
    programa_social_exposicion_sustancias: String
    programa_social_exposicion_sustancias_anios: String
    programa_social_exposicion_sustancias_horas: String



    preguntas_contestadas: Int
    admision_relacionada: Admision
}

input ProgramaIntegralInput {
    programa_discapacidad_hipoacusia: Boolean
    programa_discapacidad_disminucion_visual: Boolean
    programa_discapacidad_perdida_barthel: String
    programa_discapacidad_disminucion_cognitiva: String
    programa_discapacidad_gds_fast: Int
    programa_discapacidad_nu_desc: Int

    programa_paliativos_sorpresa: Boolean
    programa_paliativos_perdida_funcionalidad: Boolean
    programa_paliativos_perdida_nutricional: Boolean
    programa_paliativos_multimorbilidad: Boolean
    programa_paliativos_recursosOingresos: Boolean
    programa_paliativos_otraEnfermedaAvanzada: Boolean
    programa_paliativos_total: Int
    programa_paliativos_ecog: Int
    
    programa_suenio_imc: Boolean
    programa_suenio_hipoventilacion: Boolean
    programa_suenio_restriccionTorax: Boolean
    programa_suenio_neuromuscular: Boolean

    programa_nutricion_puntuacion: Int
    programa_nutricion_grupoRiesgo: String
    programa_nutricion_via: String

    programa_social_grupo_etario: String
    programa_social_genero: String
    programa_social_orientacion_sexual: String
    programa_social_municipio: String
    programa_social_estado: String
    programa_social_pais: String
    programa_social_zona_marginada: String
    programa_social_condicion_social: String
    programa_social_deficit_economico: Boolean
    programa_social_migrante: String
    programa_social_abandono_social: Boolean
    programa_social_situacion_calle: Boolean
    programa_social_red_apoyo: String
    programa_social_tipo_familia: String
    programa_social_idioma: String
    programa_social_lengua_indigena: String
    programa_social_discapacidad_cdpd: String
    programa_social_escolaridad: String
    programa_social_ocupacion: String
    programa_social_derechohabiencia: String
    programa_social_religion: String
    programa_social_limitada: String
    programa_social_violencia: Boolean
    programa_social_caso_medicolegal: String
    programa_social_mater: Boolean
    programa_social_riesgos_vivienda: String
    programa_social_vivienda_tipo: String
    programa_social_vivienda_material: String
    programa_social_vivienda_servicios: String
    programa_social_vivienda_cuartos: Int
    programa_social_vivienda_personas: Int
    programa_social_vivienda_hacinamiento: Boolean
    programa_social_vivienda_atencion_alarma: String
    programa_social_dispositivo_medicos: String
    programa_social_animales: Boolean
    programa_social_animales_tipo: String
    programa_social_lenia: Boolean
    programa_social_trabajo_riesgos: String
    programa_social_barreras_aprendizaje: String
    programa_social_exposicion_sustancias: String
    programa_social_exposicion_sustancias_anios: String
    programa_social_exposicion_sustancias_horas: String




    preguntas_contestadas: Int
    admision_relacionada: ID
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
    servicio_tratante: ServicioTratante
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
    pac_aislamiento: Boolean
    hospitalizado: Boolean
    fecha_ingreso: Date
    fecha_prealta: Date
    fecha_egreso: Date
    cama_relacionada: ID
}

input DiagnosticoInput {
    fecha_diagnostico: Date
    fecha_resolucion: Date
    diagnostico_nombre: String
    diagnostico_tipo: DiagnosticoTipoEnum
    diagnostico_activo: Boolean
    admision_relacionada: ID
}

input CamaInput {
    cama_numero: String
    cama_orden: Int
    cama_compartida: Boolean
    cama_lado: LadoCama
    cama_ubicacion: CamaUbicacion
    cama_prioridad: PrioridadCama
    cama_disponible: Boolean
    cama_ocupada: Boolean
    cama_genero: Genero
    cama_dispositivo_o2: DispositivoO2cama
    cama_hemodialisis: Boolean
    cama_aislamiento: Boolean
    cama_dan: Boolean
    cama_codigo_uveh: CodigoCama
    admision_relacionada: ID
}

input MicroorganismoInput {
    fecha_deteccion: Date
    metodo_deteccion: MetodoDeteccion
    microorganismo_tipo: MicroorganismoTipo
    microorganismo_nombre: String
    susceptibilidad: Susceptibilidad
    microorganismo_muestra_tipo: String
    microorganismo_muestra_resultado: MuestraResultadoEnum
    fecha_ultima_revision: Date
    comentario_uveh: String
    camahistorial: ID
}

input AntibioticoInput {
    antibiotico_nombre: String
    antibiotico_comentario: String
    antibiotico_inicio: Date
    antibiotico_fin: Date
    microorganismo_relacionado:ID
}

input AdmisionInput {
    fecha_ingreso: Date
    fecha_prealta: Date
    fecha_egreso: Date
    hospitalizado: Boolean
    servicio_tratante: ServicioTratante
    paciente_relacionado: ID
    cama_relacionada: ID
}

type Query {

    #Usuarios
    # obtenerUsuario(token: String!): Usuario
    obtenerUsuario: Usuario

    #Admisiones 
    obtenerAdmision(id: ID!): Admision
    obtenerAdmisiones: [Admision]
    obtenerUltimaAdmisionPaciente(id: ID!): Admision
    obtenerAdmisionesActivas: [Admision]
    obtenerAdmisionesInactivas: [Admision]

    obtenerCamaHistorialAdmision(idAdmision: ID!): [CamaHistorial]

    #Pacientes
    obtenerPaciente(id: ID!): Paciente
    obtenerPacientes: [Paciente]
    obtenerPacientesUser: [Paciente]
    obtenerPacientesUrgencias: [Paciente]
    obtenerPacientesHospitalizados: [Paciente]
    obtenerPacientesNoHospitalizados: [Paciente]
    obtenerPacientesHospitalizadosSinCama: [Paciente]

    # Camas
    obtenerCama(id: ID!) : Cama!
    obtenerHistorialCama: [CamaHistorial!]
    obtenerTrasladosHoy: [CamaHistorial!]
    obtenerTrasladosDias(diasAtras: Int): [CamaHistorial]
    obtenerCamas: [Cama!]
    obtenerCamasUrgencias: [Cama!]
    obtenerCamasNo0: [Cama!]
    obtenerCamas1: [Cama!]
    obtenerCamas2: [Cama!]
    obtenerCamas3: [Cama!]
    obtenerCamas4: [Cama!]
    obtenerCamas5: [Cama!]
    obtenerCamas7: [Cama!]
    obtenerCamas8: [Cama!]
    obtenerCamas9: [Cama!]
    obtenerCamas10: [Cama!]
    obtenerCamasOcupadas: [Cama!]
    obtenerCamasDisponibles: [Cama!]
    obtenerCamasDisponiblesMujer: [Cama!]
    obtenerCamasDisponiblesHombre: [Cama!]

    # Microorganismos
    obtenerMicroorganismo(id: ID!) : Microorganismo
    obtenerMicroorganismos: [Microorganismo]
    obtenerMicroorganismosPatient(id: ID!): [Microorganismo]
    obtenerMicroorganismosAdmision(idAdmision: ID!): [Microorganismo]


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

    # Diagnostico
    nuevoDiagnostico(input: DiagnosticoInput): Diagnostico
    actualizarDiagnostico(id: ID!, input: DiagnosticoInput): Diagnostico
    eliminarDiagnostico( id: ID! ) : String

    # ProgramaIntegral
    nuevoProgramaIntegral(input: ProgramaIntegralInput): ProgramaIntegral
    actualizarProgramaIntegral(id: ID!, input: ProgramaIntegralInput): ProgramaIntegral
}

type Subscription {

     #Camas
    actualizarCama: Cama
"""
    #Microorganismos
    nuevoMicroorganismo(input: MicroorganismoInput) : Microorganismo
    actualizarMicroorganismo( id: ID!, input : MicroorganismoInput) : Microorganismo
    eliminarMicroorganismo( id: ID! ) : String

    #Antibioticos
    nuevoAntibiotico(input: AntibioticoInput) : Antibiotico
    actualizarAntibiotico( id: ID!, input : AntibioticoInput) : Antibiotico
    eliminarAntibiotico( id: ID! ) : String """

    # Pacientes
    nuevoPaciente: Paciente
    actualizarPaciente: Paciente
    
}
`;