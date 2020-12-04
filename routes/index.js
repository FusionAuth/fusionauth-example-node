const express = require('express');
const router = express.Router();
const {FusionAuthClient} = require('@fusionauth/typescript-client');
<<<<<<< HEAD
const clientId = '97aff5bb-e454-4e69-acd1-047ba67123af'
const clientSecret = 'V2oqdjcS0YNJzk1zY6kLQs9oEd-FE9OFpuPJZeziuDM';
const client = new FusionAuthClient('noapikeyneeded', 'https://team-bam.fusionauth.io');
=======
const clientId = 'fusionauth-application-clientid-here';
const clientSecret = 'fusionauth-application-client-secret-here';
const client = new FusionAuthClient('noapikeyneeded', 'http://localhost:9011');
const pkceChallenge = require('pkce-challenge');
>>>>>>> 101f8041f44c7063edc0b655543c2b4cafc5267e

/* GET home page. */
router.get('/', function (req, res, next) {
    const stateValue = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    req.session.stateValue = stateValue;

    //generate the pkce challenge/verifier dict
    pkce_pair = pkceChallenge();
    // Store the PKCE verifier in session
    req.session.verifier = pkce_pair['code_verifier']
    const challenge = pkce_pair['code_challenge']
    res.render('index', {
        user: req.session.user,
        stateValue: stateValue,
        title: 'FusionAuth Example',
        clientId: clientId,
        challenge: challenge
    });
});

/* OAuth return from FusionAuth */
router.get('/oauth-redirect', function (req, res, next) {
<<<<<<< HEAD
  // This code stores the user in a server-side session
  console.log("here");
  client.exchangeOAuthCodeForAccessToken(req.query.code,
                                         clientId,
                                         clientSecret,
                                         'http://localhost:3000/oauth-redirect')
      .then((response) => {
        console.log(response.response.access_token);
        return client.retrieveUserUsingJWT(response.response.access_token);
      })
      .then((response) => {
        req.session.user = response.response.user;
      })
      .then((response) => {
=======
    // This code stores the user in a server-side session
    const stateFromServer = req.query.state;
    if (stateFromServer !== req.session.stateValue) {
        console.log("State doesn't match. uh-oh.");
        console.log("Saw: " + stateFromServer + ", but expected: " + req.session.stateValue);
>>>>>>> 101f8041f44c7063edc0b655543c2b4cafc5267e
        res.redirect(302, '/');
        return;
    }
    client.exchangeOAuthCodeForAccessTokenUsingPKCE(req.query.code,
        clientId,
        clientSecret,
        'http://localhost:3000/oauth-redirect',
        req.session.verifier)
        .then((response) => {
            console.log(response.response.access_token);
            return client.retrieveUserUsingJWT(response.response.access_token);
        })
        .then((response) => {
            req.session.user = response.response.user;
        })
        .then((response) => {
            res.redirect(302, '/');
        }).catch((err) => {
        console.log("in error");
        console.error(JSON.stringify(err));
    });
});

module.exports = router;
