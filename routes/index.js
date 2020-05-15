const express = require('express');
const router = express.Router();
const {FusionAuthClient} = require('@fusionauth/typescript-client');
const clientId = 'dbfc584e-8b46-4e73-9046-cba9938ec4e0';
const clientSecret = 'eMcurLTOG_aWodrbny2-oDN5Pugu_YI8oVf8gpYOKao';
const client = new FusionAuthClient('noapikeyneeded', 'http://localhost:9011');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {user: req.session.user, title: 'FusionAuth Example'});
});

/* OAuth return from FusionAuth */
router.get('/oauth-redirect', function (req, res, next) {
  // This code stores the user in a server-side session
  console.log("here");
  client.exchangeOAuthCodeForAccessToken(req.query.code,
                                         clientId,
                                         clientSecret,
                                         'http://localhost:3000/oauth-redirect')
      .then((response) => {
        return client.retrieveUserUsingJWT(response.response.access_token);
      })
      .then((response) => {
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
  //     });
});

module.exports = router;
