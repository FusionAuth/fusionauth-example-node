const express = require('express');
const router = express.Router();
const {FusionAuthClient} = require('@fusionauth/typescript-client');
const clientId = 'd827b811-3d03-4cc0-96c3-914077219e7d';
const clientSecret = 'U4FUYnEgAKQcSpik7SuZh17ZzMan9zzbALGjeUHd89M';
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
  console.log("here2");
        //return client.retrieveUserUsingJWT(response.successResponse.access_token);
      //})
      //.then((response) => {
  //console.log("here3");
        //req.session.user = response.successResponse.user;
      //})
      //.then(() => {
  //console.log("here4");
        //res.redirect(302, '/');
      }).catch((err) => {console.error(JSON.stringify(err));});

  // This code pushes the access and refresh tokens back to the browser as secure, HTTP-only cookies
  // client.exchangeOAuthCodeForAccessToken(req.query.code,
  //                                        clientId,
  //                                        clientSecret,
  //                                        'http://localhost:3000/oauth-redirect')
  //     .then((response) => {
  //       res.cookie('access_token', response.successResponse.access_token, {httpOnly: true});
  //       res.cookie('refresh_token', response.successResponse.refresh_token, {httpOnly: true});
  //       res.redirect(302, '/');
  //     });
});

module.exports = router;
