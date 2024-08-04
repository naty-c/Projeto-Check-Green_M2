import axios from 'axios';

async function getAddressFromCep(cep) {
    try {
        const cepResponse = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
        const address = cepResponse.data;

        if (address.erro) {
            throw new Error('CEP not found');
        }

        const fullAddress = `${address.logradouro}, ${address.bairro}, ${address.localidade}, ${address.uf}`;
        const addressResponse = await axios.get(`https://nominatim.openstreetmap.org/search`, {
            params: {
                q: fullAddress,
                format: 'json',
                limit: 1
            }
        });

        const location = addressResponse.data[0];
        const coordinates = {
            latitude: location.lat,
            longitude: location.lon
        };

        return {
            ...address,
            ...coordinates
        }; 
    } catch (error) {
            console.error('Failed to fetch address or coordinates', error);
            throw error;
        }
};

export default getAddressFromCep;
