import mongoose from 'mongoose'
import dotenv from 'dotenv';
dotenv.config({ path: 'variables.env' })


// Conecta a MongoDB utilizando Mongoose
mongoose.connect(process.env.DB_MONGO, {
})
  .then(() => {
    console.log('Conexión a MongoDB exitosa');
  })
  .catch((err) => {
    console.error('Error al conectar a MongoDB:', err);
  });