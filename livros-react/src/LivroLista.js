import React, { useState, useEffect } from "react";
import { ControleLivros } from "./controle/ControleLivros";
import { ControleEditora } from "./controle/ControleEditora";

const controleLivros = new ControleLivros();
const controleEditoras = new ControleEditora();

const LinhaLivro = (props) => {
    const { livro, excluir } = props;
    const nomeEditora = controleEditoras.getNomeEditora(livro.codEditora);

    return (
        <tr>
            <td>
                <button onClick={() => excluir(livro.codigo)} className="btn btn-danger">
                    Excluir
                </button>
            </td>
            <td>{livro.titulo}</td>
            <td>{livro.resumo}</td>
            <td>{nomeEditora}</td>
            <td>
                <ul>
                    {livro.autores.map((autor, index) => (
                        <li key={index}>{autor}</li>
                    ))}
                </ul>
            </td>
        </tr>
    );
};

const LivroLista = () => {
    const [livros, setLivros] = useState([]);
    const [carregado, setCarregado] = useState(false);

    useEffect(() => {
        if (!carregado) {
            setLivros(controleLivros.obterLivros());
            setCarregado(true);
        }
    }, [carregado]);

    const excluir = (codigo) => {
        controleLivros.excluir(codigo);
        setCarregado(false);
    };

    return (
        <main>
            <h1>Lista de Livros</h1>
            <table className="table">
                <thead>
                    <tr>
                        <th>Ações</th>
                        <th>Título</th>
                        <th>Resumo</th>
                        <th>Editora</th>
                        <th>Autores</th>
                    </tr>
                </thead>
                <tbody>
                    {livros.map((livro) => (
                        <LinhaLivro key={livro.codigo} livro={livro} excluir={excluir} />
                    ))}
                </tbody>
            </table>
        </main>
    );
};

export default LivroLista;
