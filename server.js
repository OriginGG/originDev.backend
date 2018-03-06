const express = require('express');
const { postgraphql } = require('postgraphql');

const config = require('./config/index');


const app = express();


console.log(config);

app.use(postgraphql(config.postgraphile.host, config.postgraphile.schema_name, {
    pgDefaultRole: config.postgraphile.default_role,
    enableCors: true,
    jwtSecret: config.postgraphile.jwt_secret,
    jwtPgTypeIdentifier: config.postgraphile.jwt_token,
    graphiql: config.postgraphile.graphiql
}));

app.listen(process.env.PORT || 3001);