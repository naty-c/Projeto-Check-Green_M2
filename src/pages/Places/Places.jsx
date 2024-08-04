import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import getAddressFromCep from '../../service/addressService';
import Sidebar from '../../components/Sidebar/Sidebar';
import { Plane } from 'lucide-react';
import styles from './Places.module.css';
import axios from 'axios';

function Places() {
  const [successMessage, setSuccessMessage] = useState('');
  const [address, setAddress] = useState('');
  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm();
  const navigate = useNavigate();

  const category = watch('category', '');
  const [customCategory, setCustomCategory] = useState('');

  async function onSubmit(data) {
    console.log(data);

    try {
      await axios.post('http://localhost:3000/places', data); // Add a new place to db.json
      setSuccessMessage('Place successfully added!');
      alert('Place successfully added!');
      setTimeout(() => {
          navigate('/dashboard');
      }, 2000); // Redirect after 2 seconds
  } catch (error) {
      console.error('Error adding place', error.response ? error.response.data : error.message);
      alert('Failed to add place');
  }
}

  async function handleCep(e) {
    const cep = e.target.value.replace(/\D/g, '');
    if (cep.length === 8) {
      try {
        const addressData = await getAddressFromCep(cep);
        console.log(addressData); // Testing on console
        setValue('address', addressData.logradouro);
        setValue('city', addressData.localidade);
        setValue('complement', addressData.complemento);
        setValue('latitude', addressData.latitude);
        setValue('longitude', addressData.longitude);
        setAddress(addressData.logradouro); // set address state
      } catch (error) {
        console.log('Error fetching address', error);
      }
    }
  }

  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    setValue('category', selectedCategory);
    if (selectedCategory !== 'other') {
      setCustomCategory('');
    }
  };

  const handleCustomCategoryChange = (e) => {
    setCustomCategory(e.target.value);
  };

  return (
    <div className={styles.container}>
      <Sidebar />

      <main className={styles.placesContainer}>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.placesForm}>
          {successMessage && <div className={styles.successMessage}>{successMessage}</div>}

          <h1>Places</h1>
          <h2>Pin your favorite spot</h2>
          <p>Share your hidden gems and sustainable travel spots to inspire fellow eco-travelers!</p>

          <div className={styles.placesGrid}>
            <div className={styles.placesGroup}>
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                className={styles.placesInput}
                placeholder='Joaquina Beach or...'
                {...register("name", { required: 'Name is required' })}
              />
              <p className={styles.error}>{errors.name?.message}</p>
            </div>

            <div className={styles.placesGroup}>
              <label htmlFor="category">Category:</label>
              <select
                name="category"
                id="category"
                className={styles.placesInput}
                {...register("category", { required: 'Choose a category' })}
                onChange={handleCategoryChange}
              >
                <option value="">Choose...</option>
                <option value="beach">Beach</option>
                <option value="park">Park</option>
                <option value="hiking">Hiking</option>
                <option value="climbing">Climbing</option>
                <option value="winery">Winery</option>
                <option value="other">Other</option>
              </select>
              <p className={styles.error}>{errors.category?.message}</p>
            </div>
          </div>

          {category === 'other' && (
            <div className={styles.placesGroup}>
              <label htmlFor="customCategory">Specify Category:</label>
              <input
                type="text"
                id="customCategory"
                className={styles.placesInput}
                placeholder='Specify your category...'
                value={customCategory}
                onChange={handleCustomCategoryChange}
              />
            </div>
          )}

          <div className={styles.placesGroup}>
            <label htmlFor="description">Description:</label>
            <textarea
              id="description"
              rows="5"
              className={styles.placesInput}
              placeholder='Share the details about this place...'
              {...register("description", { required: 'Description is required' })}
            />
            <p className={styles.error}>{errors.description?.message}</p>
          </div>

          <div className={styles.placesGrid}>
            <div className={styles.placesGroup}>
              <label htmlFor="cep">CEP:</label>
              <input
                type="number"
                id="cep"
                className={styles.placesInput}
                placeholder='Enter the CEP...'
                {...register("cep", { required: 'CEP is required' })}
                onBlur={handleCep}
              />
              <p className={styles.error}>{errors.cep?.message}</p>
            </div>

            <div className={styles.placesGroup}>
              <label htmlFor="number">Number:</label>
              <input
                type="number"
                id="number"
                className={styles.placesInput}
                placeholder='Number...'
                {...register("number")}
              />
              <p className={styles.error}>{errors.number?.message}</p>
            </div>
          </div>

          <div className={styles.placesGrid}>
            <div className={styles.placesGroup}>
              <label htmlFor="address">Address:</label>
              <input
                type="text"
                id="address"
                className={styles.placesInput}
                placeholder='Local address...'
                value={address}
                {...register("address")}
              />
              <p className={styles.error}>{errors.address?.message}</p>
            </div>

            <div className={styles.placesGroup}>
              <label htmlFor="city">City:</label>
              <input
                type="text"
                id="city"
                className={styles.placesInput}
                placeholder='City...'
                {...register("city")}
              />
              <p className={styles.error}>{errors.city?.message}</p>
            </div>
          </div>

          <div className={styles.placesGroup}>
            <label htmlFor="complement">Complement:</label>
            <input
              type="text"
              id="complement"
              className={styles.placesInput}
              placeholder='Any additional info about this place...'
              {...register("complement")}
            />
            <p className={styles.error}>{errors.complement?.message}</p>
          </div>

          <button type="submit" className={styles.addButton}><Plane size={32} /></button>
        </form>
      </main>
    </div>
  );
}

export default Places;
