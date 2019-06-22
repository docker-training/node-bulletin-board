var dbConfig = module.exports = {};

dbConfig.connection = {
    username: 'postgres',
    password: 'DockerCon!!!',
    host: 'bb-db',
    post: 5432,
    dbName: 'postgres'
};

dbConfig.pool = {
    max: 10
};