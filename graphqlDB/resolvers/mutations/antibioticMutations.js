import Antibiotico from '../../../models/Antibiotico.js';

const antibioticMutations = {

    nuevoAntibiotico: async (_, {input}) => {
        try {
            const antibiotico = new Antibiotico(input);

            // almacenar en la bd
            const resultado = await antibiotico.save();

            return resultado;
        } catch (error) {
            console.log(error);
        }
    }, 
    actualizarAntibiotico: async (_, {id, input}) => {
        // revisar si el producto existe o no
        let antibiotico = await Antibiotico.findById(id);

        if(!antibiotico) {
            throw new Error('Antibiotico no encontrado');
        }

        // guardarlo en la base de datos
        antibiotico = await Antibiotico.findOneAndUpdate({ id : id }, input, { new: true } );

        return antibiotico;
    }, 

};

export default antibioticMutations;
