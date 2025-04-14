import styles from '../styles/Login.module.css';
import React from 'react';

function Login()
{

  const [message,setMessage] = React.useState('');
  const [loginName,setLoginName] = React.useState('');
  const [loginPassword,setPassword] = React.useState('');

  async function doLogin(event: any): Promise<void> {
    event.preventDefault();

    var obj = { login: loginName, password: loginPassword };
    var js = JSON.stringify(obj);
    console.log(js);

    try {
      const response = await fetch('http://localhost:5000/api/users/login',
        { method: 'POST', body: js, headers: { 'Content-Type': 'application/json' } });

      var res = JSON.parse(await response.text());

      if (res.id <= 0) {
        setMessage('User/Password combination incorrect');
      }
      else {
        var user = { firstName: res.firstName, lastName: res.lastName, id: res.id }
        localStorage.setItem('user_data', JSON.stringify(user));

        setMessage('');
        window.location.href = '/';
      }
    }
    catch (error: any) {
      alert(error.toString());
      setMessage("hi");
      return;
    }
  };

  function handleSetLoginName( e: any ) : void
      {
        setLoginName( e.target.value );
      }
    
    function handleSetPassword( e: any ) : void
      {
        setPassword( e.target.value );
      }

      return (
        <div><img src="/src/components/album-preview1.png" alt="Albums" className={styles.albumPreview}/>
        <div className={styles.loginContainer}>
          <div className={styles.loginBox}>
            <img src="/src/components/logo.png" alt="Track Record" className={styles.logoImage}/>
            <form onSubmit={doLogin}>
              <input
                type="text"
                placeholder="Username"
                required 
                onChange={handleSetLoginName}
              />
              <div className={styles.passwordContainer}>
                <input
                  type={'password'}
                  placeholder="Password"
                  required
                  onChange={handleSetPassword}
                  />
              </div>
              <span id="loginResult">{message}</span>
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
