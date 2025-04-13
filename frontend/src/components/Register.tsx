import styles from '../Login.module.css';
import React from 'react';

function Register()
{
  const [message,setMessage] = React.useState('');
  const [loginName,setLoginName] = React.useState('');
  const [password,setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');

  async function doRegister(event: any): Promise<void> {
    event.preventDefault();

    if( password != confirmPassword )
    {
      setMessage('Passwords do not match.');
      return;
    }

    var obj = { login: loginName, password: password };
    var js = JSON.stringify(obj);
    console.log(js);

    try {
      const response = await fetch('http://localhost:5000/api/users/register/login',
        { method: 'POST', body: js, headers: { 'Content-Type': 'application/json' } });

      var res = JSON.parse(await response.text());

      if (res.id <= 0) {
        setMessage('User/Password combination incorrect');
      }
      else {
        var user = { firstName: res.firstName, lastName: res.lastName, id: res.id }
        localStorage.setItem('user_data', JSON.stringify(user));

        setMessage('');
        window.location.href = '/login';
      }
    }
    catch (error: any) {
      alert(error.toString());
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
    function handleSetConfirmPassword( e: any ) : void
      {
        setConfirmPassword( e.target.value );
      }

      return (
        <div><img src="/src/assets/album-preview1.png" alt="Albums" className={styles.albumPreview}/>
        <div className={styles.registerContainer}>
          <div className={styles.loginBox}>
            <img src="/src/assets/logo.png" alt="Track Record" className={styles.logoImage}/>
            <form onSubmit={doRegister}>
              <input
                type="text"
                placeholder="Enter Username"
                required
                onChange={handleSetLoginName}
              />
              {/* <div className={styles.passwordContainer}> */}
                <input
                  type={'password'}
                  placeholder="Enter Password"
                  required
                  onChange={handleSetPassword}
                />
                <input
                  type={'password'}
                  placeholder="Confirm Password"
                  required
                  onChange={handleSetConfirmPassword}
                />
                <span id="loginResult">{message}</span>
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

