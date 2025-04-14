import styles from '../styles/Login.module.css';
import React from 'react';

function Login() {
  const [message, setMessage] = React.useState('');
  const [loginName, setLoginName] = React.useState('');
  const [loginPassword, setPassword] = React.useState('');

  async function doLogin(event: React.FormEvent): Promise<void> {
    event.preventDefault();

    const obj = { username: loginName, password: loginPassword };
    const js = JSON.stringify(obj);
    console.log(js);

    try {
      const response = await fetch('http://localhost:5500/api/users/login', {
        method: 'POST',
        body: js,
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',  // Important: this allows cookies to be sent and received
      });

      const res = await response.json();

      if (!response.ok) {
        setMessage('User/Password combination incorrect');
      } else {
        setMessage('');
        // Now that the server sends cookies, we don't need to save the token in localStorage
        window.location.href = '/';  // Redirect after successful login
      }
    } catch (error: any) {
      alert(error.toString());
      setMessage('An error occurred, please try again.');
    }
  }

  function handleSetLoginName(e: React.ChangeEvent<HTMLInputElement>): void {
    setLoginName(e.target.value);
  }

  function handleSetPassword(e: React.ChangeEvent<HTMLInputElement>): void {
    setPassword(e.target.value);
  }

  return (
    <div>
      <img src="/src/components/album-preview1.png" alt="Albums" className={styles.albumPreview} />
      <div className={styles.loginContainer}>
        <div className={styles.loginBox}>
          <img src="/src/components/logo.png" alt="Track Record" className={styles.logoImage} />
          <form onSubmit={doLogin}>
            <input
              type="text"
              placeholder="Username"
              required
              onChange={handleSetLoginName}
            />
            <div className={styles.passwordContainer}>
              <input
                type="password"
                placeholder="Password"
                required
                onChange={handleSetPassword}
              />
            </div>
            {message && <span id="loginResult" className={styles.errorMessage}>{message}</span>}
            <button type="submit" className={styles.loginBtn}>
              Login
            </button>
          </form>
          <div className={styles.divider}>
            <span className={styles.divider} />
          </div>
          <div className={styles.signupLink}>
            Don&apos;t have an account? <a href="/register">Sign up</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
