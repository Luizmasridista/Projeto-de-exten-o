// Lista com 12 provedores de cloud
const cloudProviders = [
    { name: 'AWS', annualCost: 10000, capacity: { minClients: 50, maxClients: 1000 }, description: 'Amazon Web Services é uma plataforma de computação em nuvem abrangente.' },
    { name: 'Google Cloud', annualCost: 12000, capacity: { minClients: 100, maxClients: 2000 }, description: 'Google Cloud Platform roda na mesma infraestrutura que o Google usa.' },
    { name: 'Microsoft Azure', annualCost: 11000, capacity: { minClients: 100, maxClients: 1500 }, description: 'Microsoft Azure é uma plataforma de computação em nuvem.' },
    { name: 'IBM Cloud', annualCost: 9500, capacity: { minClients: 50, maxClients: 800 }, description: 'IBM Cloud oferece soluções em IA e computação em nuvem.' },
    { name: 'Oracle Cloud', annualCost: 10500, capacity: { minClients: 150, maxClients: 1800 }, description: 'Oracle Cloud é uma plataforma de nuvem com forte presença no mercado de bancos de dados.' },
    { name: 'Alibaba Cloud', annualCost: 9500, capacity: { minClients: 200, maxClients: 2500 }, description: 'Alibaba Cloud é uma das maiores plataformas de computação em nuvem da Ásia.' },
    { name: 'DigitalOcean', annualCost: 7000, capacity: { minClients: 10, maxClients: 300 }, description: 'DigitalOcean é ideal para startups e pequenos projetos com infraestrutura simples.' },
    { name: 'Linode', annualCost: 6000, capacity: { minClients: 10, maxClients: 250 }, description: 'Linode oferece VPS e soluções de nuvem de baixo custo, ideal para pequenas empresas.' },
    { name: 'Vultr', annualCost: 5500, capacity: { minClients: 5, maxClients: 200 }, description: 'Vultr é uma plataforma de nuvem econômica, voltada para pequenas empresas e desenvolvedores.' },
    { name: 'Heroku', annualCost: 8500, capacity: { minClients: 30, maxClients: 500 }, description: 'Heroku é uma plataforma como serviço (PaaS) que facilita o desenvolvimento e implantação de apps.' },
    { name: 'OVH Cloud', annualCost: 8000, capacity: { minClients: 50, maxClients: 600 }, description: 'OVH é conhecida por seus servidores dedicados e serviços em nuvem a preços competitivos.' },
    { name: 'Tencent Cloud', annualCost: 10500, capacity: { minClients: 100, maxClients: 2200 }, description: 'Tencent Cloud oferece uma gama de serviços de computação em nuvem, popular na China.' }
];

function deleteUser(id) {
    if (confirm("Tem certeza que deseja excluir este usuário?")) {
        var userCard = document.querySelector(`#user-card-${id}`);
        if (userCard) {
            userCard.remove();
        }
        console.log(`Usuário com ID ${id} foi excluído.`);
    }
}

function generateRecommendation() {
    const numClients = parseInt(document.getElementById('numClients').value);
    const revenuePerClient = parseFloat(document.getElementById('revenuePerClient').value);
    const totalRevenue = numClients * revenuePerClient;

    const scoredProviders = cloudProviders.map(provider => {
        let score = 0;

        const costFactor = totalRevenue / provider.annualCost;
        score += costFactor > 3 ? 10 : costFactor * 3;

        if (numClients < provider.capacity.minClients) {
            score -= (provider.capacity.minClients - numClients) * 0.1;
        } else if (numClients > provider.capacity.maxClients) {
            score -= (numClients - provider.capacity.maxClients) * 0.1;
        } else {
            score += 10;
        }

        const annualProfit = totalRevenue - provider.annualCost;
        const profitFactor = annualProfit > 0 ? (annualProfit / totalRevenue) * 10 : 0;
        score += profitFactor;

        return { ...provider, score, annualProfit };
    });

    const bestProvider = scoredProviders.reduce((prev, curr) => (prev.score > curr.score ? prev : curr));

    if (bestProvider) {
        document.getElementById('providerName').innerText = bestProvider.name;
        document.getElementById('description').innerText = bestProvider.description;
        document.getElementById('monthlyRevenue').innerText = (totalRevenue / 12).toFixed(2);
        document.getElementById('annualRevenue').innerText = totalRevenue.toFixed(2);
        document.getElementById('monthlyCost').innerText = (bestProvider.annualCost / 12).toFixed(2);
        document.getElementById('annualProfit').innerText = (totalRevenue - bestProvider.annualCost).toFixed(2);
        document.getElementById('recommendationCard').style.display = 'block';
    } else {
        alert('Nenhuma recomendação disponível.');
    }
}

function generatePerformance() {
    const numClients = document.getElementById('numClientsPerformance').value;
    const numTransactions = document.getElementById('numTransactions').value;
    const avgSessionTime = document.getElementById('avgSessionTime').value;

    const labels = ['Clientes', 'Acessos Diários', 'Tempo Médio de Sessão'];
    const data = [numClients, numTransactions, avgSessionTime];

    const ctx = document.getElementById('performanceChart').getContext('2d');

    if (window.performanceChart instanceof Chart) {
        window.performanceChart.destroy();
    }

    window.performanceChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: labels,
            datasets: [{
                label: 'Performance',
                data: data,
                backgroundColor: ['#4CAF50', '#2196F3', '#FF9800'],
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
            }
        }
    });
}

function toggleTooltip(id) {
    const tooltip = document.getElementById(id);
    tooltip.style.display = tooltip.style.display === 'block' ? 'none' : 'block';
}

document.querySelectorAll('.menu-item').forEach(item => {
    item.addEventListener('click', function() {
        // Remover a classe "active" de todos os itens do menu
        document.querySelectorAll('.menu-item').forEach(i => i.classList.remove('active'));
        item.classList.add('active');

        // Remover a classe "active" de todas as seções de conteúdo
        document.querySelectorAll('.content').forEach(c => c.classList.remove('active'));

        // Identificar o conteúdo correspondente ao item do menu clicado
        const contentId = item.getAttribute('data-content');
        console.log("Alternando para seção:", contentId); // Log de depuração
        const contentElement = document.getElementById(contentId);

        // Verificar se o elemento foi encontrado
        if (contentElement) {
            contentElement.classList.add('active');
        } else {
            console.error("Elemento não encontrado:", contentId);
        }
    });
});

function searchUsers() {
    const searchTerm = document.getElementById('searchUser').value;
    console.log('Buscando usuários com termo:', searchTerm);
}

function showAddUserForm(){
    console.log('Abrindo formulário para adicionar novo usuário');
    
    const existingForm = document.getElementById('addUserForm');
    if(existingForm) return;
}

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

document.querySelectorAll('.menu-item').forEach(item => {
    item.addEventListener('click', function() {
        // Remover a classe "active" de todos os itens do menu
        document.querySelectorAll('.menu-item').forEach(i => i.classList.remove('active'));
        item.classList.add('active');

        // Remover a classe "active" de todas as seções de conteúdo
        document.querySelectorAll('.content').forEach(c => c.classList.remove('active'));

        // Capturar o ID do conteúdo a ser exibido
        const contentId = item.getAttribute('data-content');
        console.log("Alternando para seção:", contentId); // Depuração

        // Ativar a seção correspondente
        const contentElement = document.getElementById(contentId);
        if (contentElement) {
            contentElement.classList.add('active');
        } else {
            console.error("Elemento não encontrado:", contentId);
        }
    });
});
