import React from "react";
import { useParams } from 'react-router-dom';
 
export default function Repositorio(){
  const { repositorio } = useParams();
  return(
    <h1>
      {decodeURIComponent(repositorio) }
    </h1>
  )
}