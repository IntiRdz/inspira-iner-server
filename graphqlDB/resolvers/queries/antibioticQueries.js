import Antibiotico from '../../../models/Antibiotico.js';

const antibioticQueries = {
    
    obtenerAntibiotico: async (_, { id }) => {
        // revisar si el producto existe o no
        const antibiotico = await Antibiotico.findById(id);

        if(!antibiotico) {
            throw new Error('Antibiotico no encontrado');
        }

        return producto;
    },
    obtenerAntibioticos: async () => {
        try {
            const antibioticos = await Antibiotico.find({});
            return antibioticos;
        } catch (error) {
            console.log(error);
        }
    }, 

};

export default antibioticQueries;