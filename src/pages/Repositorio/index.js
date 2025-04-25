import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Owner, Loading, BackButton, IssuesList } from "./styles";
import { FaArrowLeft } from "react-icons/fa";
import api from "../../services/api";

export default function Repositorio() {

  // Váriaveis usadas para armazenar os estados do repositório e as issues
  const [repositorios, setRepositorios] = useState({});
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);

  // Váriaveis usadas para pegar o parâmetro da URL
  // e decodificá-lo, pois o nome do repositório pode conter caracteres especiais
  const { repositorio } = useParams(); // pega o parâmetro da URL
  const nomeRepo = decodeURIComponent(repositorio); // decodifica a URL

  useEffect(() => {
    async function load() {
      try {
        const [repositorioData, issuesData] = await Promise.all([
          api.get(`/repos/${nomeRepo}`),
          api.get(`/repos/${nomeRepo}/issues`), {
            params:{
              state: "open",
              per_page: 5
            }
          }
        ]); 

        setRepositorios(repositorioData.data); // armazena os dados do repositório
        setIssues(issuesData.data); // armazena os dados das issues 
        setLoading(false); // altera o estado de loading para false

      } catch (error) {
        console.error("Erro ao carregar dados:", error);
      }
    }

    load();
  }, [nomeRepo]);

  if(loading){
    return (
      <Loading>
        <h1>Carregando...</h1>
      </Loading>
    )
  }

  return (
    <Container>
      <BackButton to="/">
          <FaArrowLeft color="#000" size={30} />
      </BackButton>
      <Owner>
        <img 
        src={repositorios.owner.avatar_url}
        alt={repositorios.owner.login}
         />
         <h1>{repositorios.name}</h1>
         <p>{repositorios.description}</p>
      </Owner>

      <IssuesList>
        {issues.map(issue => (
          <li key={String(issue.id)}>
            <img src={issue.user.avatar_url} alt={issue.user.login} />
            <div>
              <strong>
                <a href={issue.html_url}>{issue.title}</a>
                {issue.labels.map(label => (
                  <span key={String(label.id)}>{label.name}</span>
                ))}
              </strong>
              <p>{issue.user.login}</p>
            </div>
          </li>
        ))}
      </IssuesList>
    </Container>
  );
}
