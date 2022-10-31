const redis = require("redis");

const client = redis.createClient();
// const client = redis.createClient({
//     host: 'redis-server',
//     port: 6379
// });

client.connect().then(() => client.on('error', err => {
    console.log('Error ' + err);
}));

module.exports = client;

