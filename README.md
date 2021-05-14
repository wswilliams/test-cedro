# Test-cedro

Objetivo: api-test-cedro adicionar usuários e gerar arquivos no sistema


# Setup api-test-cedro

## Pré-Requisitos

    node 10x ou superior
    docker e docker-compose

## Ambiente de desenvolvimento 

Clone repository - api-test-cedro (branch: master)

    git clone https://github.com/wswilliams/test-cedro.git 


## Executar aplicação 
### Install dependences
```
npm install
```

### Run project
```
npm rum start:dev
```

### Executar aplicação com Docker
```
docker-compose -f docker-compose.dev.yml up
```

Teste utilizando Postman ou Insomia

    Importe a coleção de:  deploy/collections_postman/teste.postman_collection.json

