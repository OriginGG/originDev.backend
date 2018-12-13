'use strict'

const Env = use('Env');
const axios = use('axios');
const dns = require('dns');
const uuidv3 = require('uuid/v3');
const moment = require('moment');
const crypto = require('crypto');
const Database = use('Database');
const _ = require('lodash');

class ErrorHandlerController {
    async errorhandle(err)
    {
        const error = String(err);
        await axios.post()

    }



}

module.exports = ErrorHandlerController
