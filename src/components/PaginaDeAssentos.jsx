import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import AssentosFilme from './AssentosFilme';
import InformacaoUsuario from './InformacaoUsuario';


export default function PaginaDeAsssentos(){
    const informacaodousuario = [
        {tituloinput: "Nome do Comprador:", placeholder:"Digite seu nome..."},
        {tituloinput: "CPF do comprador:", placeholder:"Digite seu CPF..."}
    ]

    const { idSessao } = useParams();
    const [listaAssentos,setListaAssentos] = useState(null);

    useEffect( () => {
        const promise = axios.get(`https://mock-api.driven.com.br/api/v4/cineflex/showtimes/${idSessao}/seats`);
        promise.then ( response => {
            console.log(response.data);
            setListaAssentos(response.data);
        })
    }, []);

    if (listaAssentos === null) {
        return <h1>Carregando...</h1>
    }


    return (
        <div className="main-container">
            <div className="texto-main-container">
                <h2>Selecione o(s) assento(s)</h2>
            </div>

            <div className='tela-de-assentos'>
                {listaAssentos.seats.map( (item) => (
                    <AssentosFilme
                    key={item.id}
                    name={item.name}
                    isAvailable={item.isAvailable}
                />))}
            </div>

            <div className='container-status-assentos'>
                <div className='botoes-status-assentos' >
                    <div className='botao-status selecionado'></div>
                    <div className='botao-status disponivel'></div>
                    <div className='botao-status indisponivel'></div>
                </div>
                <div className='texto-status-assentos'>
                    <span>Selecionado</span>
                    <span>Disponível</span>
                    <span>Indisponível</span>
                </div>
            </div>
            
            <div className='informacoes-usuario'>
                {informacaodousuario.map( (item) => <InformacaoUsuario tituloinput={item.tituloinput} placeholder={item.placeholder} />)} 
            </div>

            <button className='botao-reservar-assento'>
                    <span>Reservar assento(s)</span>
            </button>          
            
            <div className='footer'>
                <div className='caixa-imagem-filme'>
                   <img src={listaAssentos.movie.posterURL} />
                </div>
                <div className='texto-footer'>
                    <h2>{listaAssentos.movie.title}</h2>   
                    <h2>{listaAssentos.day.weekday} - {listaAssentos.name}</h2>     
                </div>
            </div>
        </div>

    );
}
