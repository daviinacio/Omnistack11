# Semana Omnistack11 - backend
Projeto desenvolvido durante a semana omnistack, promovida pela [RocketSeat](https://rocketseat.com.br)

O **backend** é responsável pelas regras de negócio, comunicação com banco de dados, autenticação de usuário, etc..

Podemos diser que o **backend** é o "coração" da aplicação

## Referências
- [RocketSeat](https://rocketseat.com.br)
- [gitignore.io](https://gitignore.io)


## Anotações
Para utilizar SQL na aplicação nodeJS, foi instalado o módulo **KNEX**
```bash
yarn add knex
```

Inicializar o **KNEX**
```bash
npx knex init
```

Criando uma **migration** com knex
```bash
npx knex migrate:make migration_name
```

Executar a ultima **migration** com knex
```bash
npx knex migrate:latest
```

Desfazer a ultima **migration**
```bash
npx knex migrate:rollback
```