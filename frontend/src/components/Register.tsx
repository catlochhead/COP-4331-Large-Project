import styles from '../Login.module.css';

const Register: React.FC = () => {

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic (call backend API)
  };

  return (
    <div><img src="/src/assets/album-preview1.png" alt="Albums" className={styles.albumPreview}/>
    <div className={styles.registerContainer}>
      <div className={styles.loginBox}>
        <img src="/src/assets/logo.png" alt="Track Record" className={styles.logoImage}/>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter Username"
            required
          />
          {/* <div className={styles.passwordContainer}> */}
            <input
              type={'password'}
              placeholder="Enter Password"
              required
            />
            <input
              type={'password'}
              placeholder="Confirm Password"
              required
            />
          {/* </div> */}
          <button type="submit" className={styles.loginBtn}>
            Register
          </button>
        </form>
        <div className={styles.divider}><span className={styles.divider}/></div>
        <div className={styles.signupLink}>
        Already have an account? <a href="/login">Login</a>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Register;
