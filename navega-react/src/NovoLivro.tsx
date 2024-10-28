import React, { useState } from 'react';
import { ControleLivros } from './controle/ControleLivros';
import { Livro } from './modelo/Livro';

const NovoLivro = () => {
    const [livro, setLivro] = useState<Livro>({ codigo: 0, codEditora: 0, titulo: '', resumo: '', autores: [] });
    const controleLivros = new ControleLivros();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setLivro({
            ...livro,
            [name]: name === 'autores' ? value.split(',') : name === 'codEditora' ? parseInt(value) : value,
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        controleLivros.incluir(livro);
        alert('Livro incluído com sucesso!');
        setLivro({ codigo: 0, codEditora: 0, titulo: '', resumo: '', autores: [] }); // Reseta o estado
    };

    return (
        <div className="container d-flex justify-content-center align-items-center min-vh-100">
            <form onSubmit={handleSubmit} className="w-50 p-4 bg-light rounded shadow">
                <h2 className="text-center mb-4">Adicionar Novo Livro</h2>
                
                <div className="form-group mb-3">
                    <label htmlFor="titulo">Título</label>
                    <input 
                        id="titulo"
                        name="titulo"
                        placeholder="Título"
                        onChange={handleChange}
                        value={livro.titulo}
                        className="form-control"
                    />
                </div>

                <div className="form-group mb-3">
                    <label htmlFor="resumo">Resumo</label>
                    <input
                        id="resumo"
                        name="resumo"
                        placeholder="Resumo"
                        onChange={handleChange}
                        value={livro.resumo}
                        className="form-control"
                    />
                </div>

                <div className="form-group mb-3">
                    <label htmlFor="autores">Autores</label>
                    <input
                        id="autores"
                        name="autores"
                        placeholder="Autores (separados por vírgula)"
                        onChange={handleChange}
                        value={livro.autores.join(', ')}
                        className="form-control"
                    />
                </div>

                <div className="form-group mb-3">
                    <label htmlFor="codEditora">Editora</label>
                    <select
                        id="codEditora"
                        name="codEditora"
                        value={livro.codEditora}
                        onChange={handleChange}
                        className="form-control"
                    >
                        <option value={0} disabled selected>Selecione uma Opção</option>
                        <option value={1}>Arqueiro</option>
                        <option value={2}>Companhia das Letras</option>
                        <option value={3}>Darkside</option>
                    </select>
                </div>

                <button type="submit" className="btn btn-primary w-100">Adicionar Livro</button>
            </form>
        </div>
    );
};

export default NovoLivro;
