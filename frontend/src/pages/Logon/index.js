import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { FiLogIn } from 'react-icons/fi';

import api from '../../services/api';
import './styles.css';

import heroesImg from '../../assets/heroes.png';
import logoImg from '../../assets/logo.svg';

export default function Logon(){
  const [ id, setId ] = useState(localStorage.getItem('ongId') || '');

  const history = useHistory();

  // Auto login
  useEffect(() => {
    if(localStorage.getItem('ongId'))
      history.push('/profile');
  }, [])

  async function handleLogon(e){
    if(e) e.preventDefault();

    await api.post('/sessions', {
      id
    })
    .then(response => {
      console.log(response.data.name);

      localStorage.setItem('ongId', id);
      localStorage.setItem('ongName', response.data.name);

      history.push('/profile');
    })
    .catch(err => {
      alert('Falha no login');
    });
  }

  return (
    <div className="logon-container">
      <section className="form">
        <img src={logoImg} alt="Be The Hero"/>

        <form id="logon" onSubmit={handleLogon}>
          <h1>Faça seu logon</h1>

          <input
            placeholder="Sua ID" required="required" pattern="[a-z0-9]{1,8}"
            value={id}
            onChange={ e => setId(e.target.value.substring(0, 8).toLowerCase()) }
          />

          <button className="button" type="submit">Entrar</button>

          <Link className="back-link" to="/register">
            <FiLogIn size={16} color="var(--accent-color)"/>
            Não tenho cadastro
          </Link>
        </form>
      </section>
      
      <img src={heroesImg} alt="Heroes"/>
    </div>
  );
};