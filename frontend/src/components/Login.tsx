import styles from '../Login.module.css';

const Login: React.FC = () => {

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic (call backend API)
  };

  return (
    <div><img src="/src/assets/album-preview1.png" alt="Albums" className={styles.albumPreview}/>
    <div className={styles.loginContainer}>
      <div className={styles.loginBox}>
        <img src="/src/assets/logo.png" alt="Track Record" className={styles.logoImage}/>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            required
          />
          <div className={styles.passwordContainer}>
            <input
              type={'password'}
              placeholder="Password"
              required
            />
          </div>
          {/* <div><input type="check-box">Show Password</input></d iv> */}
          <button type="submit" className={styles.loginBtn}>
            Login
          </button>
        </form>
        <div className={styles.divider}><span className={styles.divider}/></div>
        <div className={styles.signupLink}>
          Don&apos;t have an account? <a href="/register">Sign up</a>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Login;
