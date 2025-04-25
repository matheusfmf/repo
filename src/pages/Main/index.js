import React, { useState, useCallback, useEffect } from 'react';
import { Container, Form, SubmitButton, List, DeleteButton } from './styles'; 
import { FaGithub, FaPlus, FaSpinner, FaBars, FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import api from '../../services/api'; 

export default function Main() {
    // Váriaveis usadas para armazenar os estados, repositórios, loading e alertas
    // e também para armazenar o repositório que será adicionado
    const [newRepo, setNewRepo] = useState('');
    const [repositorios, setRepositorios] = useState([]);
    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState(null);

    //Buscar os repositórios no localStorage
    // e setar no estado inicial
    useEffect(() => {
        const repoStorage = localStorage.getItem('repos');

        if(repoStorage) {
            setRepositorios(JSON.parse(repoStorage));
        }
    }, []);


    //Salvar alterações no localStorage 
    useEffect(() => {
        localStorage.setItem('repos', JSON.stringify(repositorios));
        
    }, [repositorios]);

    //Função para adicionar o repositório
    const handleSubmit = useCallback((e) => {
        e.preventDefault();
    
        //Função para enviar o formulário
        // e adicionar o repositório
        async function submit() {
            setLoading(true);
            setAlert(null);
        try {
            // Verifica se o repositório já existe
            // e se o repositório está vazio
            if(newRepo === '') {
                throw new Error('Você precisa indicar um repositório!');
            }
            // Verifica se o repositório existe na API
            const response = await api.get(`/repos/${newRepo}`);
            // Verifica se o repositório já existe no estado
            // e se o repositório já existe no localStorage
            const hasRepo = repositorios.find(repo => repo.name === newRepo);
            if(hasRepo) {
                throw new Error('Repositório duplicado!');
            }
            
            const data = {
                name: response.data.full_name,
            };
            // Adiciona o repositório no estado
            setRepositorios([...repositorios, data]);
            setNewRepo('');
        } catch (error) {
            setAlert(true);
            console.error(error);
        }finally {
            setLoading(false);
        }
    }
        submit();
    }, [newRepo, repositorios]);

    //Função para lidar com a mudança de valor do input
    // e setar o valor do repositório que será adicionado
    function handleinputChange(e) {
        setNewRepo(e.target.value);
        setAlert(null);
    }

    //Função para deletar o repositório
    // e setar o repositório que será deletado
    const handleDelete = useCallback((repo) => {
        const find = repositorios.filter(r => r.name !== repo);
        setRepositorios(find);

    }, [repositorios]);
        
       
    return (
        <Container>

            <h1>
                <FaGithub size={25} />
                Meus repositórios
            </h1>

            <Form onSubmit={handleSubmit} error={alert}>
                <input
                    type="text"
                    placeholder="Adicionar Repositórios"
                    value={newRepo}
                    onChange={handleinputChange} />


                <SubmitButton Loading={loading ? 1 : 0}>
                    {loading ? (
                        <FaSpinner color="#FFF" size={14} />
                    ) : (
                        <FaPlus color="#FFF" size={14} />
                    )}  
                </SubmitButton>
            </Form>
            <List>
                {repositorios.map(repo => (
                    <li key={repo.name}>
                        <span>
                            <DeleteButton onClick={() => handleDelete(repo.name)}>
                                <FaTrash size={14}/>
                            </DeleteButton>
                            <strong>{repo.name}</strong>
                        </span>
                        <Link to={`/repositorio/${encodeURIComponent(repo.name)}`}>
                        <FaBars size={20}/>
                        </Link>
                    </li>
                ))}
            </List>

        </Container>

    )
}