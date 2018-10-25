'use strict'

const Env = use('Env')
const axios = require('axios');
const Database = use('Database');
const Hash = use('Hash');

class UserController {
    async CreateIndividualInformation({ response, request }) {
        try {
            const p = request.post();
            if (!handle) {
                throw ('handle not found')
            }
            const bd = {

                "query": "mutation authenticate($email: String!, $password: String!) {  authenticate(input: {email: $email, password: $password}) {    authPayload {			jwtToken			userId			isAdmin			organisation		}  }}",
                "variables": {
                    email: 'cashflo@origin.gg',
                    password: '12345678'
                }
            }
            
            const bd_2 = {
                "query": " query getuserbyusername($handle: String!) {        getinduserbyusername(username: $handle) {            edges {                node {                    id                }            }        }    }",
                "variables": {
                    handle
                }
            }
            const td = await axios.post('https://graphql.originapi.com/graphql',
                bd,
            );
            const token = td.data.data.authenticate.authPayload.jwtToken;
            const td_2 = await axios.post('https://graphql.originapi.com/graphql',
                bd_2,
                {
                    headers: { 'Authorization': `bearer ${token}` }
                }
            );
            response.json(td_2.data.data);
        } catch (err) {
            response.json({ success: false, error: err.code });
        }
    };

    async getIndividualInformationHandle({ response, request }) {
        try {
            const p = request.post();
            const { handle } = p;
            if (!handle) {
                throw ('handle not found')
            }
            const bd = {
                
                "query": "mutation authenticate($email: String!, $password: String!) {  authenticate(input: {email: $email, password: $password}) {    authPayload {			jwtToken			userId			isAdmin			organisation		}  }}",
                "variables": {
                    email: 'cashflo@origin.gg',
                    password: '12345678'
                }
            }
            const bd_2 = {
                "query": " query getuserbyusername($handle: String!) {        getinduserbyusername(username: $handle) {            edges {                node {                    id                }            }        }    }",
                "variables": {
                    handle
                }
            }
            const td = await axios.post('https://graphql.originapi.com/graphql',
                bd,
            );
            const token = td.data.data.authenticate.authPayload.jwtToken;
            const td_2 = await axios.post('https://graphql.originapi.com/graphql',
                bd_2,
                {
                    headers: { 'Authorization': `bearer ${token}` }
                }
            );
            response.json(td_2.data.data);
        } catch (err) {
            response.json({ success: false, error: err.code });
        }
    };
   
    async getIndividualInformation({ response, request}) {
        try {
            const p = request.post();
            const { id } = p;
            if (!id) {
                throw ('ID not found')
            }
            const bd = {
                "query": "mutation authenticate($email: String!, $password: String!) {  authenticate(input: {email: $email, password: $password}) {    authPayload {			jwtToken			userId			isAdmin			organisation		}  }}",
                "variables": {
                    email: 'cashflo@origin.gg',
                    password: '12345678'
                }
            }
            const bd_2 = {
                "query": "query getIndividual($id: Int!) {  individualUserById(id: $id) {    firstName    lastName    about    email    contactNumber    updatedAt    createdAt		youtubeChannel    twitchUrl    twitchUserId		twitterHandle		accomplishments		youtubeVideo1Url		youtubeVideo2Url		youtubeVideo3Url    bannerImageUrl		profileImageUrl    facebookLink    instagramLink    username		id  }}",
                "variables": {
                    "id" : id
                }
            }
            const td = await axios.post('https://graphql.originapi.com/graphql',
                bd, 
            );
            const token = td.data.data.authenticate.authPayload.jwtToken;
            const td_2 = await axios.post('https://graphql.originapi.com/graphql',
                bd_2,
                {
                    headers: { 'Authorization': `bearer ${token}` }
                }
            );
            response.json(td_2.data.data);
        } catch (err) {
            response.json({ success: false, error: err.code });
        }
    };
}

module.exports = UserController
