const express = require('express');
const bodyParser = require('body-parser')
const config = require('./config/index');
const gql = require('graphql-tag');
const axios = require('axios');
const sa = require('superagent');

const app = express();

app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));


app.post('/update_theme', function (req, res) {

    const q = `mutation updateTheme($themeName: String!, $themeData: String!) {
        updateThemeByThemeName(input:{themeName:$themeName, themePatch: {
            themeData: $themeData
        }}) 
        {
            theme {
            themeName
            themeData
            }
        }
    }`;

    const { themeName } = req.body;
    const { themeData } = req.body;
    const x = JSON.parse(themeData);
    const bd = {
        "query": q,
        "operationName": "updateTheme",
        "variables": {
            "themeName": themeName,
            "themeData": JSON.stringify(x)
        }
    }

    sa.post(config.graphql.graphql_url)
        .send(bd)
        .end((err, res) => {
            res.send('hello world')
            //TODO
        });
    // now we register the organisation
})
app.listen(config.server.port || 3001);