# Api Reddit

## Pacotes usados
* express
* sequelize
* axios
* mysql2
* cors
* node-cron

## Endpoints
* HOST/get/DATA_INICIAL/DATA_FINAL/ORDER
* HOST/getUsers/ORDER

## Formatos
* Datas: YYYY-MM-DD ex: 2019-10-23
* Order: "ups" ou "num_comments"

## Config
* Horário do cronJob: 17:33 mas pode ser alterado no arquivo cron.json dentro da pasta config 
* Banco de dados: Mysql. As credenciais estão no arquivo db.json dentro da pasta config
* Servidor rodando na porta 3000. Pode ser alterada no arquivo config.json dentro da pasta config