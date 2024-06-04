// Importa os dados dos usuários
import { users } from '../../BACKEND/users.js'; 

// Função para adicionar linhas à tabela de usuários
function adicionarLinhasTabela() {
    const tbody = document.querySelector('tbody'); // Seleciona o corpo da tabela

    // Itera sobre o array de usuários
    users.forEach(user => {
        // Cria uma nova linha na tabela
        const row = document.createElement('tr');
        
        // Adiciona os dados do usuário nas células da linha
        row.innerHTML = `
            <td class="px-6 py-4 whitespace-nowrap">${user.nome} ${user.sobre_nome}</td>
            <td class="px-6 py-4 whitespace-nowrap">${user.email}</td>
            <td class="px-6 py-4 whitespace-nowrap">${user.password}</td>
            <td class="px-6 py-4 whitespace-nowrap">${user.type}</td>
            <td class="px-6 py-4 whitespace-nowrap">${user.id}</td>
            <td class="px-6 py-4 whitespace-nowrap"> <!-- Adiciona uma classe de posição relativa -->
                <a href="#" class="edit-link font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
            </td>
            <td class="px-6 py-4 whitespace-nowrap"> <!-- Adiciona uma classe de posição relativa -->
            <a href="#" class="delete-link inline-flex items-center bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Delete</a>
        </td>
        `;
        
        // Adiciona a linha ao corpo da tabela
        tbody.appendChild(row);
    });

    // Seleciona todos os links de edição
    const editLinks = document.querySelectorAll('.edit-link');

    // Adiciona um event listener a cada link de edição
    editLinks.forEach(link => {
        link.addEventListener('click', () => {
            // Exibe o modal quando o link de edição é clicado
            modal.classList.remove('hidden');
            modal.setAttribute('aria-hidden', 'false');
            document.body.classList.add('overflow-hidden');
        });
    });
}

// Seletor para o modal
const modal = document.getElementById('crud-modal');

// Se você também deseja fechar o modal quando o botão Close é clicado
const closeButton = document.querySelector('[data-modal-toggle="crud-modal"]');
closeButton.addEventListener('click', () => {
    // Oculta o modal quando o botão Close é clicado
    modal.classList.add('hidden');
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('overflow-hidden');
});

// Chama a função para adicionar as linhas à tabela quando o documento estiver pronto
document.addEventListener('DOMContentLoaded', adicionarLinhasTabela);
