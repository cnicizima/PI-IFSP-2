// Função para buscar usuários
async function fetchUsuarios() {
    try {
        const response = await fetch('http://localhost:4000/users');
        const usuarios = await response.json();
        return usuarios;
    } catch (error) {
        console.error('Erro ao buscar usuários:', error);
        return [];
    }
}

// Função para calcular a idade
function calcularIdade(dataNascimento) {
    const nascimento = new Date(dataNascimento);
    const hoje = new Date();
    let idade = hoje.getFullYear() - nascimento.getFullYear();
    const mes = hoje.getMonth() - nascimento.getMonth();
    if (mes < 0 || (mes === 0 && hoje.getDate() < nascimento.getDate())) {
        idade--;
    }
    return idade;
}

// Função para calcular faixa etária
function calcularFaixaEtaria(idade) {
    if (idade < 18) return 'Menor de 18';
    if (idade < 30) return '18-29 anos';
    if (idade < 40) return '30-39 anos';
    if (idade < 50) return '40-49 anos';
    if (idade < 60) return '50-59 anos';
    return '60+ anos';
}

// Função para gerar relatórios dinâmicos
async function gerarRelatorios() {
    const usuarios = await fetchUsuarios();

    if (!usuarios.length) {
        console.error("Nenhum usuário encontrado!");
        return;
    }

    // Total de Usuários
    document.getElementById('totalUsuarios').innerText = usuarios.length;

    // Sexo
    const sexoReport = usuarios.reduce((acc, usuario) => {
        acc[usuario.sexo] = (acc[usuario.sexo] || 0) + 1;
        return acc;
    }, {});
    document.getElementById('sexoReport').innerHTML = Object.entries(sexoReport)
        .map(([key, value]) => `<li>${key}: ${value}</li>`)
        .join('');

    // Estado
    const estadoReport = usuarios.reduce((acc, usuario) => {
        acc[usuario.estado] = (acc[usuario.estado] || 0) + 1;
        return acc;
    }, {});
    document.getElementById('estadoReport').innerHTML = Object.entries(estadoReport)
        .map(([key, value]) => `<li>${key}: ${value}</li>`)
        .join('');

    // Média de Idade
    const totalIdade = usuarios.reduce((acc, usuario) => acc + calcularIdade(usuario.nascimento), 0);
    document.getElementById('mediaIdade').innerText = Math.round((totalIdade / usuarios.length).toFixed(2));

    // Faixa Etária
    const faixaEtaria = usuarios.reduce((acc, usuario) => {
        const faixa = calcularFaixaEtaria(calcularIdade(usuario.nascimento));
        acc[faixa] = (acc[faixa] || 0) + 1;
        return acc;
    }, {});
    document.getElementById('faixaEtariaReport').innerHTML = Object.entries(faixaEtaria)
        .map(([key, value]) => `<li>${key}: ${value}</li>`)
        .join('');

    // Gráficos
    gerarGraficoSexo(sexoReport);
    gerarGraficoEstado(estadoReport);
    gerarGraficoFaixaEtaria(faixaEtaria);
}

// Funções para gráficos
function gerarGraficoSexo(sexoData) {
    const ctx = document.getElementById('sexoChart').getContext('2d');
    new Chart(ctx, {
        type: 'pie',
        data: {
            labels: Object.keys(sexoData),
            datasets: [{
                label: 'Distribuição de Sexo',
                data: Object.values(sexoData),
                backgroundColor: [
                    '#FF6384', // Cor para 'F'
                    '#36A2EB', // Cor para 'M'
                    '#FFCD56', // Cor para 'null' ou outros
                ],
                hoverOffset: 4,
            }],
        },
        options: {
            plugins: {
                legend: {
                    labels: {
                        color: '#E5E5E5', // Cor dos rótulos
                        font: {
                            size: 14
                        },
                    },
                },
            },
        },
    });
}

function gerarGraficoEstado(estadoData) {
    const ctx = document.getElementById('estadoChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: Object.keys(estadoData),
            datasets: [{
                label: 'Usuários por Estado',
                data: Object.values(estadoData),
                backgroundColor: '#36A2EB',
                borderColor: '#1E88E5',
                borderWidth: 1,
            }],
        },
        options: {
            plugins: {
                legend: {
                    labels: {
                        color: '#E5E5E5', // Cor dos rótulos
                        font: {
                            size: 14,
                        },
                    },
                },
            },
            scales: {
                x: {
                    ticks: {
                        color: '#E5E5E5', // Cor das labels no eixo X
                    },
                },
                y: {
                    ticks: {
                        color: '#E5E5E5', // Cor das labels no eixo Y
                    },
                },
            },
        },
    });
}

function gerarGraficoFaixaEtaria(faixaEtariaData) {
    const ctx = document.getElementById('faixaEtariaChart').getContext('2d');
    new Chart(ctx, {
        type: 'pie',
        data: {
            labels: Object.keys(faixaEtariaData),
            datasets: [{
                label: 'Faixa Etária dos Usuários',
                data: Object.values(faixaEtariaData),
                backgroundColor: [
                    '#FF6384', // Menor de 18
                    '#36A2EB', // 18-29 anos
                    '#FFCD56', // 30-39 anos
                    '#4BC0C0', // 40-49 anos
                    '#9966FF', // 50-59 anos
                    '#C9CBCF', // 60+ anos
                ],
                hoverOffset: 4,
            }],
        },
        options: {
            plugins: {
                legend: {
                    labels: {
                        color: '#E5E5E5', // Cor dos rótulos
                        font: {
                            size: 14,
                        },
                    },
                },
            },
        },
    });
}

// Carregar relatórios e gráficos ao carregar a página
window.onload = gerarRelatorios;
