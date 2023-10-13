const mongoose = require('mongoose');
const faker = require('faker');

// Conectar a la base de datos MongoDB
mongoose.connect('mongodb://localhost/tu_basededatos', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Definir el modelo de Mongoose para un paciente
const pacienteSchema = new mongoose.Schema({
  nombre: String,
  edad: Number,
  genero: String,
  direccion: String,
  telefono: String,
});

const Paciente = mongoose.model('Paciente', pacienteSchema);

// Función para generar datos ficticios de pacientes
function generarPacientes() {
  const pacientes = [];

  for (let i = 0; i < 20; i++) {
    const paciente = {
      nombre: faker.name.findName(),
      edad: faker.random.number({ min: 18, max: 80 }),
      genero: faker.random.arrayElement(['Masculino', 'Femenino', 'No binario']),
      direccion: faker.address.streetAddress(),
      telefono: faker.phone.phoneNumber(),
    };

    pacientes.push(paciente);
  }

  return pacientes;
}

// Poblar la base de datos con pacientes ficticios
const pacientesFicticios = generarPacientes();

Paciente.insertMany(pacientesFicticios)
  .then(() => {
    console.log('Pacientes ficticios insertados con éxito.');
  })
  .catch((err) => {
    console.error('Error al insertar pacientes ficticios:', err);
  });
