const auth = require('../app/services/auth.service.js');

auth.login('yura', 'password').then(r => console.log(r));