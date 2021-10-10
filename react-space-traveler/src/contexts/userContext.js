import { createContext, useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { API_URL } from '../config/env';


const userContext = createContext();


const UserProvider = ({ children }) => {
  const history = useHistory();
  const [user, setUser] = useState('');

  const hdlSubmitLogin = async (e, loginInput) => {
    e.preventDefault();
    // console.log(loginInput);
    try {
      const res = await axios.post(`${API_URL}/login`, loginInput);
      setUser(cur => ({ ...cur, ...res.data.user }));
      history.push('/');
    } catch (error) {
      if (error.response && error.response.status === 400) {
        console.log('Invalid username or password');
      }
    }
  };

  const hdlSubmitRegister = async (e, regInfo) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/register`, regInfo);
      console.log('register success');
      history.push('/login');
    } catch (error) {
      console.log(error);
    }
  };

  const hdlLogout = () => {
    setUser(null);
    history.push('/login');
  };

  return <userContext.Provider value={{
    user, setUser,
    hdlSubmitLogin, hdlLogout, hdlSubmitRegister
  }}>
    {children}
  </userContext.Provider>;
};

export { userContext, UserProvider };