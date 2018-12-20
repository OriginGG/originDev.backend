const express = require('express');
const { postgraphile } = require('postgraphile');
const ConnectionFilterPlugin = require("postgraphile-plugin-connection-filter");
const config = require('./config/index');

const app = express();


app.use(postgraphile(config.postgraphile.host, config.postgraphile.schema_name, {
    appendPlugins: [ConnectionFilterPlugin],
    pgDefaultRole: config.postgraphile.default_role,
    enableCors: true,
    jwtSecret: config.postgraphile.jwt_secret,
    bodySizeLimit: config.postgraphile.body_size_limit,
    jwtPgTypeIdentifier: config.postgraphile.jwt_token,
    graphiql: config.postgraphile.graphiql,
    jwtVerifyOptions: {
        ignoreExpiration: true

    },
    showErrorStack: true,
    extendedErrors: ["hint", "detail", "errcode", "where"]
}));

app.listen(config.postgraphile.port || 80, '0.0.0.0');