var dbConfig = module.exports = {};

dbConfig.connection = {
    username: 'sa',
    password: 'DockerCon!!!',
    host: 'bb-db',
    post: 1433,
    dbName: 'BulletinBoard'
};

dbConfig.pool = {
    max: 10
};