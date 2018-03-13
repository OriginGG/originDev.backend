const express = require('express');
const { postgraphql } = require('postgraphql');
const config = require('./config/index');

const app = express();


app.use(postgraphql(config.postgraphile.host, config.postgraphile.schema_name, {
    pgDefaultRole: config.postgraphile.default_role,
    enableCors: true,
    jwtSecret: config.postgraphile.jwt_secret,
    jwtPgTypeIdentifier: config.postgraphile.jwt_token,
    graphiql: config.postgraphile.graphiql,
    jwtVerifyOptions: {
        ignoreExpiration: true

    }
}));

app.listen(config.postgraphile.port || 5000);