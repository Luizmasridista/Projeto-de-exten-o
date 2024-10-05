function showAddUserForm(){
    //Checar se o formulário já está aberto
    const existingform = document.getElementById('addUserForm');
    if(existingform) {
        //Se o formulário já existe, não fazer nada
        return;
    }

    //Criar o elementodo formulário
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

// Função para fechar o formulário de adição
function closeAddUserForm() {
const formElement = document.getElementById('addUserForm');
if (formElement) {
    formElement.remove(); // Remove o formulário da página
}
}

// Função para adicionar o novo usuário
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
const newUserHtml = `
    <div class="recommendation-card" style="display: block; margin-bottom: 20px;">
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
            <button onclick="editUser(${Math.random().toString(36).substring(7)})" style="margin-top: 0;">Editar</button>
            <button onclick="deleteUser(${Math.random().toString(36).substring(7)})" style="background-color: #e53e3e; margin-top: 0;">Excluir</button>
        </div>
    </div>
`;
usersList.insertAdjacentHTML('beforeend', newUserHtml);

// Fechar o formulário
closeAddUserForm();
}