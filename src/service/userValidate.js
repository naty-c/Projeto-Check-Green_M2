import axios from 'axios';

export async function validateUser(userData) {
  const errors = {};

  try {
    const params = new URLSearchParams({
      email: userData.email,
      cpf: userData.cpf
    });
    // Existing email
    const emailExistsResponse = await axios.get(`http://localhost:3000/users?${params.toString()}`);
    if (emailExistsResponse.data.length > 0) {
      errors.email = 'Email already registered';
    }

    // Existing CPF
    const cpfExistsResponse = await axios.get(`http://localhost:3000/users?${params.toString()}`);
    if (cpfExistsResponse.data.length > 0) {
      errors.cpf = 'CPF already registered';
    }

  } catch (error) {
    console.error(error);
    errors.generalError = 'Ops! Something went wrong';
  }

  return errors;
}
