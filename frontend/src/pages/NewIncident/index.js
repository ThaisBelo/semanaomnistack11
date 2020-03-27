import React from 'react';
import {useHistory} from 'react-router-dom'

import './styles.css';
import api from '../../services/api';
import logoImg from '../../assets/logo.svg';
import { useState } from 'react';

export default function NewIncident() {
    const [ title,setTitle] = useState('');
    const [description, setDescription] = useState ('');
    const [value,setValue] = useState ('');
    const ongId = localStorage.getItem('ongId');
    const history = useHistory();

    async function handleNemIncident (e){
        e.preventDefault();
        const data = {
            title,
            description,
            value
        };
            try{
                await api.post('incidents',data, {
                    headers:{
                        Authorization: ongId,
                    }
                });
            history.push('/profile');

        }catch(ex){
            alert('Erro no cadastro caso,tente novamente')
        }

    }

    return (
        <div className="newincident-container">
            <div className="content">
                <section>
                <img src = {logoImg} alt="Be the Hero" />
                <h1>Cadastrar novo caso</h1>
                <p> Descreva o caso detalhadamente para encontrar um herói para resolver isso.</p> 
                </section>
                <form onSubmit = {handleNemIncident}>
                    <input 
                        placeholder = "Título do caso" 
                        type="text"
                        value={title}
                        onChange={e => setTitle(e.target.value)}/>
                    
                    <textarea 
                        placeholder="Descrição"
                        value={description}
                        onChange={e =>setDescription(e.target.value)}/>
                        
                    <input 
                        placeholder = "valor em reais" 
                        value={value}
                        onChange={e =>setValue(e.target.value)}/>
                        
                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    );
}