// Lista com 12 provedores de cloud
const cloudProviders = [
    { name: 'AWS', annualCost: 10000, capacity: { minClients: 50, maxClients: 1000 }, description: 'Amazon Web Services é uma plataforma de computação em nuvem abrangente.' },
    { name: 'Google Cloud', annualCost: 12000, capacity: { minClients: 100, maxClients: 2000 }, description: 'Google Cloud Platform roda na mesma infraestrutura que o Google usa.' },
    { name: 'Microsoft Azure', annualCost: 11000, capacity: { minClients: 100, maxClients: 1500 }, description: 'Microsoft Azure é uma plataforma de computação em nuvem.' },
    { name: 'IBM Cloud', annualCost: 9500, capacity: { minClients: 50, maxClients: 800 }, description: 'IBM Cloud oferece soluções em IA e computação em nuvem.' },
    { name: 'Oracle Cloud', annualCost: 10500, capacity: { minClients: 75, maxClients: 1200 }, description: 'Oracle Cloud oferece serviços de computação em nuvem e armazenamento.' },
    { name: 'Alibaba Cloud', annualCost: 9000, capacity: { minClients: 60, maxClients: 1000 }, description: 'Alibaba Cloud é um provedor de serviços de computação em nuvem da Alibaba Group.' },
    { name: 'Salesforce', annualCost: 13000, capacity: { minClients: 150, maxClients: 2500 }, description: 'Salesforce oferece soluções de CRM baseadas em nuvem.' },
    { name: 'SAP Cloud', annualCost: 11500, capacity: { minClients: 80, maxClients: 1600 }, description: 'SAP Cloud Platform é uma plataforma de desenvolvimento e integração.' },
    { name: 'Tencent Cloud', annualCost: 8500, capacity: { minClients: 40, maxClients: 900 }, description: 'Tencent Cloud oferece serviços de computação em nuvem da Tencent.' },
    { name: 'DigitalOcean', annualCost: 8000, capacity: { minClients: 30, maxClients: 700 }, description: 'DigitalOcean é um provedor de serviços de nuvem para desenvolvedores.' },
    { name: 'Linode', annualCost: 7500, capacity: { minClients: 25, maxClients: 600 }, description: 'Linode oferece serviços de hospedagem em nuvem.' },
    { name: 'Vultr', annualCost: 7000, capacity: { minClients: 20, maxClients: 500 }, description: 'Vultr é um provedor de infraestrutura de nuvem.' },
    { name: 'Heroku', annualCost: 8500, capacity: { minClients: 30, maxClients: 500 }, description: 'Heroku é uma plataforma como serviço (PaaS) que facilita o desenvolvimento e implantação de apps.' },
    { name: 'OVH Cloud', annualCost: 8000, capacity: { minClients: 50, maxClients: 600 }, description: 'OVH é conhecida por seus servidores dedicados e serviços em nuvem a preços competitivos.' }
];

function generateRecommendation() {
    const clientCount = parseInt(document.getElementById('numClients').value);
    const revenuePerClient = parseFloat(document.getElementById('revenuePerClient').value);

    console.log('Número de Clientes:', clientCount);
    console.log('Receita por Cliente:', revenuePerClient);

    const totalRevenue = revenuePerClient * clientCount;

    const recommendations = cloudProviders
        .filter(provider => clientCount >= provider.capacity.minClients && clientCount <= provider.capacity.maxClients)
        .map(provider => {
            provider.score = totalRevenue - provider.annualCost; 
            return provider;
        })
        .sort((a, b) => b.score - a.score);

    console.log('Recomendações:', recommendations);

    if (recommendations.length > 0) {
        const provider = recommendations[0];
        console.log('Provedor Selecionado:', provider.name);

        document.getElementById('providerName').innerText = provider.name;
        document.getElementById('description').innerText = provider.description;
        document.getElementById('monthlyRevenue').innerText = `R$ ${formatNumber(revenuePerClient * clientCount)}`;
        document.getElementById('annualRevenue').innerText = `R$ ${formatNumber(revenuePerClient * clientCount * 12)}`;
        document.getElementById('monthlyCost').innerText = `R$ ${formatNumber(provider.annualCost / 12)}`;
        document.getElementById('confidenceScore').innerText = `Confiança: Alta`;

        document.getElementById('recommendationCard').classList.add('active');
        console.log('HTML Atualizado com sucesso');

        // Dados do gráfico de evolução de gastos
        const years = [1, 2, 3, 4, 5];
        const costEvolution = years.map(year => provider.annualCost * year);

        // Criar o gráfico de evolução de gastos
        const ctx = document.getElementById('performanceChart').getContext('2d');

        new Chart(ctx, {
            type: 'line',
            data: {
                labels: years,
                datasets: [{
                    label: 'Gastos Anuais (R$)',
                    data: costEvolution,
                    borderColor: 'rgba(75, 192, 192, 1)',
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });

    } else {
        document.getElementById('providerName').innerText = 'Nenhum provedor encontrado';
        document.getElementById('description').innerText = '';
        document.getElementById('monthlyRevenue').innerText = '';
        document.getElementById('annualRevenue').innerText = '';
        document.getElementById('monthlyCost').innerText = '';
        document.getElementById('confidenceScore').innerText = '';

        document.getElementById('recommendationCard').classList.add('active');
        console.log('Nenhum provedor encontrado');
    }
}

// Função para formatar números em formato brasileiro
function formatNumber(num) {
    return num.toLocaleString('pt-BR', { style: 'decimal', minimumFractionDigits: 2 });
}
function generateRecommendation() {
    const clientCount = parseInt(document.getElementById('numClients').value);
    const revenuePerClient = parseFloat(document.getElementById('revenuePerClient').value);

    console.log('Número de Clientes:', clientCount);
    console.log('Receita por Cliente:', revenuePerClient);

    const totalRevenue = revenuePerClient * clientCount;

    const recommendations = cloudProviders
        .filter(provider => clientCount >= provider.capacity.minClients && clientCount <= provider.capacity.maxClients)
        .map(provider => {
            provider.score = totalRevenue - provider.annualCost; 
            return provider;
        })
        .sort((a, b) => b.score - a.score);

    console.log('Recomendações:', recommendations);

    if (recommendations.length > 0) {
        const provider = recommendations[0];
        console.log('Provedor Selecionado:', provider.name);

        document.getElementById('providerName').innerText = provider.name;
        document.getElementById('description').innerText = provider.description;
        document.getElementById('monthlyRevenue').innerText = `R$ ${formatNumber(revenuePerClient * clientCount)}`;
        document.getElementById('annualRevenue').innerText = `R$ ${formatNumber(revenuePerClient * clientCount * 12)}`;
        document.getElementById('monthlyCost').innerText = `R$ ${formatNumber(provider.annualCost / 12)}`;
        document.getElementById('confidenceScore').innerText = `Confiança: Alta`;

        // Torna o card visível
        document.getElementById('recommendationCard').style.display = 'block';
        console.log('HTML Atualizado com sucesso');

        // Dados do gráfico de evolução de gastos
        const years = [1, 2, 3, 4, 5];
        const costEvolution = years.map(year => provider.annualCost * year);

        // Seleciona o canvas correto para o gráfico de evolução de custos
        const ctx = document.getElementById('costEvolutionChart').getContext('2d');

        new Chart(ctx, {
            type: 'line',
            data: {
                labels: years,
                datasets: [{
                    label: 'Gastos Anuais (R$)',
                    data: costEvolution,
                    borderColor: 'rgba(75, 192, 192, 1)',
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });

    } else {
        document.getElementById('providerName').innerText = 'Nenhum provedor encontrado';
        document.getElementById('description').innerText = '';
        document.getElementById('monthlyRevenue').innerText = '';
        document.getElementById('annualRevenue').innerText = '';
        document.getElementById('monthlyCost').innerText = '';
        document.getElementById('confidenceScore').innerText = '';

        // Torna o card visível mesmo sem recomendação
        document.getElementById('recommendationCard').style.display = 'block';
        console.log('Nenhum provedor encontrado');
    }
}

// Função para formatar números em formato brasileiro
function formatNumber(num) {
    return num.toLocaleString('pt-BR', { style: 'decimal', minimumFractionDigits: 2 });
}
