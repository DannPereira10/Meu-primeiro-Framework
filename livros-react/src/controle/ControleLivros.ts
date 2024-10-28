import livros from '../LivroDados'; // Importando os dados mock
import { Livro } from '../modelo/Livro';

export class ControleLivros {
    obterLivros(): Array<Livro> {
        return livros;
    }

    incluir(livro: Livro): void {
        const novoCodigo = Math.max(...livros.map(l => l.codigo)) + 1;
        livro.codigo = novoCodigo;
        livros.push(livro);
    }

    excluir(codigo: number): void {
        const index = livros.findIndex(l => l.codigo === codigo);
        if (index !== -1) {
            livros.splice(index, 1);
        }
    }
}