const redis = require("redis");

// const client = redis.createClient();

const client = redis.createClient({
    url: 'redis://redis'

});
client.connect().then(() => client.on('error', err => {
    console.log('Error ' + err);
}));

module.exports = client;

