import logo from './logo.svg';
import './App.css';
import api from '../src/services/api';
import { useState } from 'react';

function App() {

  const [newRepo, setNewRepo] = useState('');
  const [repositories, setRepositories] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleInputChange = e => {
    setNewRepo(e.target.value)
  }

  const handleSubmit = async e => {
    e.preventDefault();

    setLoading(true)

    const response = await api.get(`repos/${newRepo}`)
    console.log("reees", response)
    const data = {
      name: response.data.full_name,
      avatar: response.data.owner.avatar_url,
      description: response.data.description,
      url: response.data.html_url,
    };

    setRepositories([...repositories, data])

    setNewRepo('')
    setLoading(false)

  }

  return (
    <div style={{ textAlign: 'center' }}>

      <h1>Api do Github</h1>
      <h2>Lista de Repositórios Publicos</h2>
      <p>Busque por repositórios públicos. Exemplo: facebook/react, ou angular/angular, ou vuejs/vue, etc</p>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Adicionar repositório"
          value={newRepo}
          onChange={handleInputChange}
          type="text" />
        <button type="submit" loading={loading} >Adicionar</button>
      </form>


      <ul style={{ textAlign: 'left' }}>
        {repositories.map(repository => (
          <li key={repository.name} style={{ marginBottom: '50px'}} >
            <div style={{display: 'flex', alignItems: 'center'}}>
              <img src={repository.avatar} width='50' alt="image" />
              <h3 style={{ marginLeft: '10px' }} >{repository.name}</h3>
            </div>
            <p>{repository.description}  <a href={repository.url}>Acessar Repositório</a> </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
