import React, {useState} from 'react';
import './Login.css';
import api from '../services/api';
import logo from '../assets/logo.svg';

export default function Login({history}) {
  const [username, setUsername] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await api.post('/devs', {username});
      const {_id} = response.data;
      history.push('/main/' + _id);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit}>
        <img src={logo} alt="Tindev" />
        <input placeholder="Digite seu Github" value={username} onChange={e => setUsername(e.target.value)} />
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
}
