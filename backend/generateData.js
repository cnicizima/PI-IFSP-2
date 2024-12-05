const { PrismaClient } = require('@prisma/client');
const { fakerPT_BR: faker } = require('@faker-js/faker');



const prisma = new PrismaClient();

function generateCPF() {
  // Gerar um CPF aleatório no formato ###.###.###-##
  const cpf = `${faker.number.int({ min: 100, max: 999 })}.${faker.number.int({ min: 100, max: 999 })}.${faker.number.int({ min: 100, max: 999 })}-${faker.number.int({ min: 10, max: 99 })}`;
  return cpf;
}

function generateTelefone() {
  // Gera um DDD aleatório da lista
  const ddd = faker.helpers.arrayElement([ //Escolhe um elemento aleatorio do array
      '11', '21', '31', '41', '51', 
      '61', '71', '81', '91', '51', 
      '85', '71', '62', '98', '84', 
      '96', '48', '67', '34', '19'
  ]);
  
  // Gera um número de telefone aleatório que sempre começa com 9
  const numero = `9${Math.floor(Math.random() * 100000000).toString().padStart(8, '0')}`;

  // Formata o número no padrão (xx) 9XXXX-XXXX
  const celular = `(${ddd}) ${numero.slice(0, 5)}-${numero.slice(5)}`;

  return celular;
}


async function createUser() {
  // Gerar dados fictícios usando o Faker
  const nome = faker.person.fullName(); // Nome completo
  const email = faker.internet.email(); // Email
  const senha = faker.internet.password(); // Senha
  const cpf = generateCPF(); // Gerar CPF fictício
  const nascimento = faker.date.birthdate() //Gera um nascimento entre 18 e 80 anos
  const sexo = faker.helpers.arrayElement(['M', 'F']); // Sexo
  const estado = faker.helpers.arrayElement([
    'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA',
    'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN',
    'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO', 'EX'
  ]); // Gera um estado aleatório
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

  console.log(`${userCount} usuários criados com sucesso!`);
  prisma.$disconnect();
}

generateData().catch((e) => {
  console.error(e);
  prisma.$disconnect();
});
