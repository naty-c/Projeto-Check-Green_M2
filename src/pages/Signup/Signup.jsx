import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { z } from "zod";
import { zodResolver } from '@hookform/resolvers/zod';
import { validateUser } from '../../service/userValidate';
import getAddressFromCep from '../../service/addressService';
import styles from './Signup.module.css';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

// Validation with Zod
const schema = z.object({
    name: z.string().nonempty({ message: 'Name is required' }),
    email: z.string()
          .nonempty({ message: 'Email is required' })
          .email({ message: 'Invalid email address' }),
    password: z.string()
          .nonempty({ message: 'Password is required' })
          .min(8, { message: 'Password must be at least 8 characters long' }),
    gender: z.string().optional(),
    birthday: z.string().nonempty({ message: 'Birthday is required' })
          .refine(value => {
              const today = new Date().toISOString().split('T')[0];
              return value <= today;
          }, { message: 'Birthday cannot be in the future' }),
    cpf: z.string()
          .nonempty({ message: 'CPF is required' })
          .length(11, { message: 'CPF must be 11 numbers' })
          .refine(value => /^\d+$/.test(value), { message: 'CPF must have a valid format' }),
    address: z.string()
          .nonempty({ message: 'CEP is required' }),
    phone: z.string()
          .nonempty({ message: 'Phone number is required' })
          .refine(value => /^[\d\s\+\-\(\)]+$/.test(value), { message: 'Invalid phone number' }),
  });  

function Signup() {
  const { register, handleSubmit, setValue, setError, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
});

  const [successMessage, setSuccessMessage] = useState('');
  const [generalError, setGeneralError] = useState('');
  const navigate = useNavigate();

  async function onSubmit(data) {
    console.log(data);

    const userId = uuidv4();
    const userData = {
      id: userId,
      ...data
    };

    const validationErrors = await validateUser(userData);

    if (Object.keys(validationErrors).length > 0) {
        if (validationErrors.email) {
            setError('email', { type: 'manual', message: validationErrors.email });
        }
        if (validationErrors.cpf) {
            setError('cpf', { type: 'manual', message: validationErrors.cpf });
        }
        if (validationErrors.generalError) {
            setGeneralError(validationErrors.generalError);
        }
        return;
    }

    try {
      await axios.post('http://localhost:3000/users', data); // Add a new user to db.json
      
      setSuccessMessage('User successfully onboard!');
      alert('User successfully onboard!');
      navigate('/');
    } catch (error) {
      console.error('Error registering user', error);
      setGeneralError('Failed to register user');
      alert('Failed to register user');
    }
  }

  async function handleCep(e) {
    const cep = e.target.value.replace(/\D/g, ''); // Remove any non-digit characters
    if (cep.length === 8) {
      try {
        const addressData = await getAddressFromCep(cep);
        console.log(addressData); // Testing on console
        setValue('address', addressData.logradouro);
        setValue('city', addressData.localidade);
        setValue('complement', addressData.complemento);
        setValue('latitude', addressData.latitude);
        setValue('longitude', addressData.longitude);
      } catch (error) {
        console.log('Error fetching address', error);
      }
    }
  }

  return (
    <main className={styles.signupContainer}>
      <div className={styles.left}>
        <h2>Boarding Area</h2>

        <form onSubmit={handleSubmit(onSubmit)} className={styles.signupForm}>

          {successMessage && <div className={styles.successMessage}>{successMessage}</div>}

          <div className={styles.leftSignupForm}>
            <div className={styles.signupGroup}>
              <label htmlFor="name">Name:</label>
              <input 
                type="text"
                id="name"
                className={styles.signupInput} 
                placeholder='Your name...'
                {...register("name")}
              />
              <div className={styles.errorContainer}>
                <p className={styles.error}>{errors.name?.message}</p>
              </div>
            </div>

            <div className={styles.signupGroup}>
              <label htmlFor="email">Email:</label>
              <input 
                type="email"
                id="email"
                className={styles.signupInput} 
                placeholder='Your email...'
                {...register("email")}
              />
              <div className={styles.errorContainer}>
                <p className={styles.error}>{errors.email?.message}</p>
              </div>
            </div>

            <div className={styles.signupGroup}>
              <label htmlFor="password">Password:</label>
              <input 
                type="password"
                id="password"
                className={styles.signupInput} 
                placeholder='Your password...'
                {...register("password")}
              />
              <div className={styles.errorContainer}>
                <p className={styles.error}>{errors.password?.message}</p>
              </div>
            </div>

            <div className={styles.signupGroup}>
              <label htmlFor="gender">Gender:</label>
              <input 
                type="text"
                id="gender"
                className={styles.signupInput} 
                placeholder='Gender...'
                {...register("gender")}
              />
              <div className={styles.errorContainer}>
                <p className={styles.error}>{errors.gender?.message}</p>
              </div>
            </div>
          </div>

          <div className={styles.rightSignupForm}>
            <div className={styles.signupGroup}>
              <label htmlFor="birthday">Birthday:</label>
              <input 
                type="date"
                id="birthday"
                className={styles.signupInput} 
                placeholder='Birthday...'
                {...register("birthday")}
              />
              <div className={styles.errorContainer}>
                <p className={styles.error}>{errors.birthday?.message}</p>
              </div>
            </div>

            <div className={styles.signupGroup}>
              <label htmlFor="cpf">CPF:</label>
              <input 
                type="text"
                id="cpf"
                className={styles.signupInput} 
                placeholder='CPF...'
                maxLength={11}
                {...register("cpf")}
                onInput={e => {
                  e.target.value = e.target.value.slice(0, 11); // Limit to 11 characters
                }}
              />
              <div className={styles.errorContainer}>
                <p className={styles.error}>{errors.cpf?.message}</p>
              </div>
            </div>

            <div className={styles.signupGroup}>
              <label htmlFor="address">CEP:</label>
              <input 
                type="text"
                id="address"
                className={styles.signupInput} 
                placeholder='Enter your CEP...'
                {...register("address")}
                onBlur={handleCep}
              />
              <div className={styles.errorContainer}>
                <p className={styles.error}>{errors.address?.message}</p>
              </div>
            </div>

            <div className={styles.signupGroup}>
              <label htmlFor="phone">Phone:</label>
              <input 
                type="text"
                id="phone"
                className={styles.signupInput} 
                placeholder='Your phone number...'
                {...register("phone")}
              />
              <div className={styles.errorContainer}>
                <p className={styles.error}>{errors.phone?.message}</p>
              </div>
            </div>

            <button type="submit" className={styles.signupButton}>Boarding pass</button>
          </div>
        </form>

        <p>Already have an account? <Link className={styles.link} to="/">Hop On!</Link></p>
      </div>
      <div className={styles.right}></div>
    </main>
  );
}

export default Signup;
