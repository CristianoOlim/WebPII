import { alumni } from '../../BACKEND/alumni.js'; // Importa os dados dos ex-alunos

// Função para adicionar linhas à tabela
function adicionarLinhasTabela() {
    const tbody = document.querySelector('tbody'); // Seleciona o corpo da tabela

    // Itera sobre o array de ex-alunos
    alumni.forEach(aluno => {
        // Cria uma nova linha na tabela
        const row = document.createElement('tr');
        
        // Adiciona os dados do ex-aluno nas células da linha
        row.innerHTML = `
            <td class="px-6 py-4 whitespace-nowrap">${aluno.nome}</td>
            <td class="px-6 py-4 whitespace-nowrap">${aluno.idade}</td>
            <td class="px-6 py-4 whitespace-nowrap">${aluno.empresa}</td>
            <td class="px-6 py-4 whitespace-nowrap">${aluno.cargo}</td>
            <td class="px-6 py-4 whitespace-nowrap">${aluno.curso}</td>
            <td class="px-6 py-4 whitespace-nowrap">${aluno.interesses.join(', ')}</td>
            <td class="px-6 py-4">
                <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
            </td>
        `;
        
        // Adiciona a linha ao corpo da tabela
        tbody.appendChild(row);
    });
}

// Chama a função para adicionar as linhas à tabela quando o documento estiver pronto
document.addEventListener('DOMContentLoaded', adicionarLinhasTabela);
