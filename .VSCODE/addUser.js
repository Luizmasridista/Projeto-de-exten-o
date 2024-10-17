
console.log('cloudProviders declared in RecomendaçãoClound.js');

// Função para deletar um usuário
function deleteUser(userId) {
    if (confirm("Tem certeza que deseja excluir este usuário?")) {
        console.log('Excluindo usuário com ID:', userId); // Depuração

        // Encontrar o card do usuário pelo ID
        const userCard = document.getElementById(`user-card-${userId}`);
        
        // Verificar se o card do usuário foi encontrado
        if (userCard) {
            userCard.remove(); // Remove o card do DOM
        } else {
            console.error("Usuário não encontrado com ID:", userId);
        }
    }
}

// Função para editar um usuário
function editUser(userId) {
    // Obter o card do usuário que está sendo editado
    const userCard = document.getElementById(`user-card-${userId}`);
    const currentRole = userCard.querySelector('.user-status').innerText; // Pega o status atual (ex: 'Ativo', 'Inativo')

    // Criar o formulário de edição
    const editFormHtml = `
    <div id="editUserForm" class="form-overlay">
        <div class="form-container">
            <h2>Editar Usuário</h2>
            <div class="input-group">
                <label for="userRole">Tipo de Acesso:</label>
                <select id="userRole">
                    <option value="Administrador" ${currentRole === 'Administrador' ? 'selected' : ''}>Administrador</option>
                    <option value="Usuário" ${currentRole === 'Usuário' ? 'selected' : ''}>Usuário</option>
                    <option value="Inativo" ${currentRole === 'Inativo' ? 'selected' : ''}>Inativo</option>
                </select>
            </div>
            <button onclick="saveUserRole(${userId})">Salvar Alterações</button>
            <button onclick="closeEditUserForm()" style="background-color: #e53e3e; margin-top: 10px;">Cancelar</button>
        </div>
    </div>
    `;

    // Inserir o formulário no corpo do documento
    document.body.insertAdjacentHTML('beforeend', editFormHtml);
}

// Função para fechar o formulário de edição
function closeEditUserForm() {
    const formElement = document.getElementById('editUserForm');
    if (formElement) {
        formElement.remove(); // Remove o formulário da página
    }
}

// Função para salvar o tipo de acesso do usuário
function saveUserRole(userId) {
    const selectedRole = document.getElementById('userRole').value;

    // Atualizar o card do usuário com o novo tipo de acesso
    const userCard = document.getElementById(`user-card-${userId}`);
    userCard.querySelector('.user-status').innerText = selectedRole; // Atualiza o status do usuário

    // Fechar o formulário de edição
    closeEditUserForm();
}

// Função para adicionar um novo usuário
function addUser() {
    // Coletar os valores dos campos
    const name = document.getElementById('userName').value;
    const phone = document.getElementById('userPhone').value;
    const cpf = document.getElementById('userCpf').value;
    const email = document.getElementById('userEmail').value;

    // Validação simples
    if (!name || !phone || !cpf || !email) {
        alert('Por favor, preencha todos os campos.');
        return;
    }

    // Simular o salvamento do usuário (aqui você pode conectar com o backend)
    console.log('Novo usuário adicionado:', {
        name,
        phone,
        cpf,
        email
    });

    // Adicionar o usuário na lista (exemplo visual)
    const usersList = document.getElementById('usersList');
    const userId = Math.random().toString(36).substring(7); // Gerar um ID aleatório para o usuário
    const newUserHtml = `
        <div id="user-card-${userId}" class="recommendation-card" style="display: block; margin-bottom: 20px;">
            <div class="recommendation-header">
                <span class="provider-name">${name}</span>
                <span class="user-status">Ativo</span>
            </div>
            <div class="description">Novo usuário adicionado.</div>
            <div class="metrics">
                <div class="metric">
                    <div class="metric-label">Telefone</div>
                    <div class="metric-value">${phone}</div>
                </div>
                <div class="metric">
                    <div class="metric-label">CPF</div>
                    <div class="metric-value">${cpf}</div>
                </div>
                <div class="metric">
                    <div class="metric-label">Email</div>
                    <div class="metric-value">${email}</div>
                </div>
            </div>
            <div style="display: flex; gap: 10px; margin-top: 20px;">
                <button onclick="editUser('${userId}')" style="margin-top: 0;">Editar</button>
                <button onclick="deleteUser('${userId}')" style="background-color: #e53e3e; margin-top: 0;">Excluir</button>
            </div>
        </div>
    `;
    usersList.insertAdjacentHTML('beforeend', newUserHtml);

    // Fechar o formulário de adição
    closeAddUserForm();
}

// Função para fechar o formulário de adição
function closeAddUserForm() {
    const formElement = document.getElementById('addUserForm');
    if (formElement) {
        formElement.remove(); // Remove o formulário da página
    }
}

// Função para exibir o formulário de adição de usuário
function showAddUserForm() {
    console.log('Abrindo formulário para adicionar novo usuário');
    
    const existingForm = document.getElementById('addUserForm');
    if(existingForm) return; // Impede a abertura de múltiplos formulários

    // Criar o formulário de adição
    const formHtml = `
        <div id="addUserForm" class="form-overlay">
            <div class="form-container">
                <h2>Adicionar Novo Usuário</h2>
                <div class="input-group">
                    <label for="userName">Nome:</label>
                    <input type="text" id="userName" placeholder="Digite o nome">
                </div>
                <div class="input-group">
                    <label for="userPhone">Telefone:</label>
                    <input type="tel" id="userPhone" placeholder="Digite o telefone">
                </div>
                <div class="input-group">
                    <label for="userCpf">CPF:</label>
                    <input type="text" id="userCpf" placeholder="Digite o CPF">
                </div>
                <div class="input-group">
                    <label for="userEmail">Email:</label>
                    <input type="email" id="userEmail" placeholder="Digite o email">
                </div>
                <button onclick="addUser()">Salvar Usuário</button>
                <button onclick="closeAddUserForm()" style="background-color: #e53e3e; margin-top: 10px;">Cancelar</button>
            </div>
        </div>
    `;

    // Inserir o formulário no corpo do documento
    document.body.insertAdjacentHTML('beforeend', formHtml);
}

// Funções de navegação e outras funcionalidades
document.querySelectorAll('.menu-item').forEach(item => {
    item.addEventListener('click', function() {
        // Remover a classe "active" de todos os itens do menu
        document.querySelectorAll('.menu-item').forEach(i => i.classList.remove('active'));
        item.classList.add('active');

        // Remover a classe "active" de todas as seções de conteúdo
        document.querySelectorAll('.content').forEach(c => c.classList.remove('active'));

        // Capturar o ID do conteúdo a ser exibido
        const contentId = item.getAttribute('data-content');
        console.log("Alternando para seção:", contentId); // Log de depuração

        // Ativar a seção correspondente
        const contentElement = document.getElementById(contentId);
        if (contentElement) {
            contentElement.classList.add('active');
        } else {
            console.error("Elemento não encontrado:", contentId);
        }
    });
});
