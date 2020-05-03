import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';
import './styles.css';

//import heroesImg from '../../assets/heroes.png';
import logoImg from '../../assets/logo.svg';

export default function Register(){
  const [ name, setName ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ whatsapp, setWhatsapp ] = useState('');
  const [ city, setCity ] = useState('');
  const [ uf, setUf ] = useState('');

  const history = useHistory();

  async function handleRegister(e){
    e.preventDefault();

    await api.post('/ongs', {
      name, email, whatsapp, city, uf
    })
    .then(response => {
      alert(`Seu ID de acesso: ${response.data.id}`)
      history.push('/');
    })
    .catch(err => {
      alert('Erro no cadastro, tente novamente');
    });
  }

  return (
    <div className="register-container">
      <div className="content">
        <section>
          <img src={logoImg} alt="Be The Hero"/>
          <h1>Cadastro</h1>
          <p>
            Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem os casos da sua ONG.
          </p>

          <Link className="back-link" to="/">
            <FiArrowLeft size={16} color="var(--accent-color)"/>
            Já tenho cadastro
          </Link>
        </section>

        <form onSubmit={handleRegister}>
          <input
            placeholder="Nome da ONG" required="required" pattern="[A-z-À-ž-0-9\s]{1,64}"
            value={name}
            onChange={ e => setName(e.target.value.substring(0, 64)) }
          />

          <input
            type="email" placeholder="E-mail" required="required"
            value={email}
            onChange={ e => setEmail(e.target.value) }
          />

          <input
            placeholder="WhatsApp" required="required" type="number" pattern="[0-9]{10,11}"
            value={whatsapp}
            onChange={ e => setWhatsapp(e.target.value.substring(0, 11)) }
            onKeyPress={ e => {
              if(e.charCode < 48 || e.charCode > 57)
                e.preventDefault();
            }}
          />

          <div className="input-group">
            <input
              placeholder="Cidade" required="required" pattern="[A-z-À-ž-0-9\s]{1,32}"
              value={city}
              onChange={ e => setCity(e.target.value.substring(0, 32)) }
            />

            <input
              placeholder="UF" required="required" style={{ width: 80 }} pattern="[A-Z\s]{2,2}"
              value={uf}
              onChange={ e => setUf(e.target.value.substring(0, 2).toUpperCase()) }
            />
          </div>

          <button className="button" type="submit">Cadastrar</button>
        </form>
      </div>
    </div>
  );
};