import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { z } from "zod";
import { zodResolver } from '@hookform/resolvers/zod';
import styles from './Login.module.css';
import { useAuth } from '../../contexts/Auth';

const schema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
});

function Login() {
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(schema),
});

  async function onSubmit(data) {
    console.log(data);
    try {
      await signIn(data);
      navigate('/dashboard');
    } catch (error) {
      alert(error.message || 'Login failed')
    }
}

  return (

      <main className={styles.loginContainer}>
        <div className={styles.left}>
          <div className={styles.box}>
            <h1>Check Green</h1>
            <p>Share your sustainable travel <br></br>memories with the world</p>
          </div>
        </div>
        <div className={styles.right}>
            <fieldset>
            <form onSubmit={handleSubmit(onSubmit)} className={styles.loginForm}>
              <h2>Start your journey</h2>
                <div className={styles.loginGroup}>
                  <label htmlFor="email">Email</label>
                  <input 
                  type="email" 
                  className={styles.loginInput} 
                  placeholder='Enter your best email...'
                  {...register("email", { required: 'Email is required' })} />
                </div>
                {errors.email && <p className={styles.error}>{errors.email.message}</p>}

                <div className={styles.loginGroup}>
                  <label htmlFor="password">Password</label>
                  <input 
                  type="password" 
                  className={styles.loginInput} 
                  placeholder='Type your secret password...'
                  {...register("password", { required: 'Password is required' })} />
                </div>
                {errors.password && <p className={styles.error}>{errors.password.message}</p>}

              <button type="submit" className={styles.loginButton} disabled={isSubmitting}>{isSubmitting ? 'Loading...': 'Login'}</button>

              <p>Don't have an account? <span><Link className={styles.link} to="/signup">Signup</Link></span></p>

            </form>
            </fieldset>
        </div>
    </main>
  );
}

export default Login;