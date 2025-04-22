import React, {useState} from 'react';
import { Container, Form, SubmitButton} from './styles'; // Assuming you have a styles.js file for your styles
import { FaGithub, FaPlus} from 'react-icons/fa';

export default function Main() {

    const [newRepo, setNewRepo] = useState('');

    function handleSubmit(e){
        e.preventDefault();

        console.log(newRepo);
  
    }

    function handleinputChange(e){
        setNewRepo(e.target.value);
    }

    return (
       <Container> 

        <h1>
            <FaGithub size={25}/>
            Meus repositórios
        </h1>

        <Form  onSubmit={handleSubmit}>
            <input 
            type="text" 
            placeholder="Adicionar Repositórios"
            value={newRepo}
            onChange={handleinputChange}/>
            

            <SubmitButton>
                <FaPlus color="#FFF" size={14}/>
            </SubmitButton>
        </Form>

       </Container>
       
    )
}