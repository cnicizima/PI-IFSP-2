const { PrismaClient } = require('@prisma/client');
const { faker } = require('@faker-js/faker');

const prisma = new PrismaClient();

function generateCPF() {
  // Gerar um CPF aleatório no formato ###.###.###-##
  const cpf = `${faker.number.int({ min: 100, max: 999 })}.${faker.number.int({ min: 100, max: 999 })}.${faker.number.int({ min: 100, max: 999 })}-${faker.number.int({ min: 10, max: 99 })}`;
  return cpf;
}

function generateEstado() {
    const estados = [
      { code: "AC", name: "Acre" },
      { code: "AL", name: "Alagoas" },
      { code: "AP", name: "Amapá" },
      { code: "AM", name: "Amazonas" },
      { code: "BA", name: "Bahia" },
      { code: "CE", name: "Ceará" },
      { code: "DF", name: "Distrito Federal" },
      { code: "ES", name: "Espírito Santo" },
      { code: "GO", name: "Goiás" },
      { code: "MA", name: "Maranhão" },
      { code: "MT", name: "Mato Grosso" },
      { code: "MS", name: "Mato Grosso do Sul" },
      { code: "MG", name: "Minas Gerais" },
      { code: "PA", name: "Pará" },
      { code: "PB", name: "Paraíba" },
      { code: "PR", name: "Paraná" },
      { code: "PE", name: "Pernambuco" },
      { code: "PI", name: "Piauí" },
      { code: "RJ", name: "Rio de Janeiro" },
      { code: "RN", name: "Rio Grande do Norte" },
      { code: "RS", name: "Rio Grande do Sul" },
      { code: "RO", name: "Rondônia" },
      { code: "RR", name: "Roraima" },
      { code: "SC", name: "Santa Catarina" },
      { code: "SP", name: "São Paulo" },
      { code: "SE", name: "Sergipe" },
      { code: "TO", name: "Tocantins" },
      { code: "EX", name: "Estrangeiro" }
    ];
  
    // Escolhe um estado aleatoriamente
    const estadoAleatorio = estados[Math.floor(Math.random() * estados.length)];
  
    // Retorna o código do estado
    return estadoAleatorio.code;
  }
  
  function generateTelefone() {
    // Gera números aleatórios para preencher o formato
    const ddd = Math.floor(Math.random() * 90) + 10; // Gera DDD entre 10 e 99
    const numero = Math.floor(Math.random() * 1000000000); // Gera um número de telefone aleatório
  
    // Formata o número no padrão (xx) XXXXX-XXXX
    const celular = `(${ddd}) ${String(numero).padStart(9, '0').slice(0, 5)}-${String(numero).padStart(9, '0').slice(5)}`;
  
    return celular;
  }
  

async function createUser() {
  // Gerar dados fictícios usando o Faker
  const nome = faker.person.fullName(); // Nome completo
  const email = faker.internet.email(); // Email
  const senha = faker.internet.password(); // Senha
  const cpf = generateCPF(); // Gerar CPF fictício
  const nascimento = faker.date.past(30, new Date(2000, 0, 1)); // Data de nascimento entre 1990 e 2000
  const sexo = faker.helpers.arrayElement(['M', 'F']); // Sexo
  const estado = generateEstado(); // Gera um estado aleatório
  const celular = generateTelefone(); // Gera um telefone no formato (xx) XXXXX-XXXX


  // Criar o usuário no banco de dados
  await prisma.users.create({
    data: {
      nome,
      email,
      senha,
      cpf,
      nascimento,
      sexo,
      estado,
      celular,
    },
  });
}

async function generateData() {
  const userCount = 150; // Quantidade de usuários fictícios a serem gerados

  // Gerar múltiplos usuários
  for (let i = 0; i < userCount; i++) {
    await createUser();
  }

  console.log(`${userCount} usuários fictícios foram criados com sucesso!`);
  prisma.$disconnect();
}

generateData().catch((e) => {
  console.error(e);
  prisma.$disconnect();
});
