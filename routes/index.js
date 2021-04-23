const express = require('express');
const router = express.Router();
const {FusionAuthClient} = require('@fusionauth/typescript-client');
const clientId = '85a03867-dccf-4882-adde-1a79aeec50df';
const clientSecret = '7gh9U0O1wshsrVVvflccX-UL2zxxsYccjdw8_rOfsfE';
const client = new FusionAuthClient('noapikeyneeded', 'http://localhost:9011');
const pkceChallenge = require('pkce-challenge');

/* GET home page. */
router.get('/', function (req, res, next) {
  const stateValue = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  req.session.stateValue = stateValue;

  //generate the pkce challenge/verifier dict
  const pkce_pair = pkceChallenge();
  // Store the PKCE verifier in session
  req.session.verifier = pkce_pair['code_verifier'];
  const challenge = pkce_pair['code_challenge'];
  res.render('index', {user: req.session.user, title: 'FusionAuth Example', clientId: clientId, challenge: challenge, stateValue: stateValue});
});

/* OAuth return from FusionAuth */
router.get('/oauth-redirect', function (req, res, next) {
  const stateFromServer = req.query.state;
  if (stateFromServer !== req.session.stateValue) {
    console.log("State doesn't match. uh-oh.");
    console.log("Saw: " + stateFromServer + ", but expected: " + req.session.stateValue);
    res.redirect(302, '/');
    return;
  }

  // This code stores the user in a server-side session
 client.exchangeOAuthCodeForAccessTokenUsingPKCE(req.query.code,
                                                 clientId,
                                                 clientSecret,
                                                 'http://localhost:3000/oauth-redirect',
                                                 req.session.verifier)
      .then((response) => {
        return client.retrieveUserUsingJWT(response.response.access_token);
      })
      .then((response) => {
        if (!response.response.user.registrations || response.response.user.registrations.length == 0 || (response.response.user.registrations.filter(reg => reg.applicationId === clientId)).length == 0) {
          console.log("User not registered, not authorized.");
          res.redirect(302, '/');
          return;
        }
      
        req.session.user = response.response.user;
      })
      .then((response) => {
        res.redirect(302, '/');
      }).catch((err) => {console.log("in error"); console.error(JSON.stringify(err));});
      
  // This code pushes the access and refresh tokens back to the browser as secure, HTTP-only cookies
  // client.exchangeOAuthCodeForAccessToken(req.query.code,
  //                                        clientId,
  //                                        clientSecret,
  //                                        'http://localhost:3000/oauth-redirect')
  //     .then((response) => {
  //       res.cookie('access_token', response.response.access_token, {httpOnly: true});
  //       res.cookie('refresh_token', response.response.refresh_token, {httpOnly: true});
  //       res.redirect(302, '/');
  //     }).catch((err) => {console.log("in error"); console.error(JSON.stringify(err));});
});

module.exports = router;
