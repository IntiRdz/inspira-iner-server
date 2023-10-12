
export const typeDefs = `#graphql

scalar Date

type Token {
    token: String
}

type Usuario {
    id: ID
    nombre: String
    apellido: String
    email: String
    creado: Date
    activo:Boolean
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
    pac_codigo_uveh: CodigoPaciente
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

enum CodigoPaciente {
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
    id: ID!
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
    id: ID!
    fecha_deteccion: Date
    metodo_deteccion: MetodoDeteccion
    microorganismo_tipo: MicroorganismoTipo
    microorganismo_nombre: String
    susceptibilidad: Susceptibilidad
    comentario_uveh: String
    paciente_relacionado: ID
    cama_relacionada: ID
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
    id: ID!
    antibiotico_nombre: String!
    antibiotico_comentario: String
    antibiotico_inicio: String!
    paciente_relacionado: Paciente!
    microorganismo_relacionado: Microorganismo
}

type Cliente {
        id: ID
        nombre: String
        apellido: String
        empresa: String
        email: String
        telefono: String
        vendedor: ID
    }

type Producto {
    id: ID
    nombre: String
    existencia: Int
    precio: Float
    creado: String
}


type Pedido {
    id: ID
    pedido: [PedidoGrupo]
    total: Float
    paciente: Paciente
    user: ID
    fecha: String
    estado: EstadoPedido
}

type PedidoGrupo{
    id: ID
    cantidad: Int
    nombre: String
    precio: Float
}

type TopPaciente {
    total: Float
    paciente: [Paciente]
}

type TopCliente {
    total: Float
    paciente: [Cliente]
}

type TopUser {
    total: Float
    user: [Usuario]
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
    diagnostico: String
    pac_codigo_uveh: CodigoPaciente
    fecha_ingreso: Date
    fecha_prealta: Date
    fecha_egreso: Date
    hospitalizado: Boolean!
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

input ClienteInput {
    nombre: String!
    apellido: String!
    empresa: String!
    email: String!
    telefono: String
}

input ProductoInput {
    nombre: String!
    existencia: Int!
    precio: Float!
}


input PedidoProductoInput {
    id: ID
    cantidad: Int
    nombre: String
    precio: Float
}

input PedidoInput {
    pedido: [PedidoProductoInput]
    total: Float
    paciente: ID
    estado: EstadoPedido
}

enum EstadoPedido {
    PENDIENTE
    COMPLETADO
    CANCELADO
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

    #Clientes
    obtenerClientes: [Cliente]
    obtenerClientesVendedor: [Cliente]
    obtenerCliente(id: ID!): Cliente

    # Productos
    obtenerProductos: [Producto]
    obtenerProducto(id: ID!) : Producto

    # Pedidos
    obtenerPedidos: [Pedido]
    obtenerPedidosUser: [Pedido]
    obtenerPedido(id: ID!) : Pedido
    obtenerPedidosEstado(estado: String!): [Pedido]


    # Busquedas Avanzadas
    mejoresPacientes: [TopPaciente]
    mejoresUseres: [TopUser]
    buscarProducto(texto: String!) : [Producto]
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
    

    # Productos
    nuevoProducto(input: ProductoInput) : Producto
    actualizarProducto( id: ID!, input : ProductoInput ) : Producto
    eliminarProducto( id: ID! ) : String

    # Pedidos
    nuevoPedido(input: PedidoInput): Pedido
    actualizarPedido(id: ID!, input: PedidoInput ) : Pedido
    eliminarPedido(id: ID!) : String
}
`;