const express = require('express');
const router = express.Router();
const {FusionAuthClient} = require('@fusionauth/typescript-client');
const apiKey = 'tEmPftBMVnPF_R1Jri-WgSa8sk0nFmy4_tawDc69Tck';
const client = new FusionAuthClient(apiKey, 'http://localhost:9011');

/* GET home page. */
router.get('/', function (req, res, next) {
  client.retrieveUserByEmail('fornodejsexample@example.com')
      .then(clientResponse => {
	    console.log("User:", JSON.stringify(clientResponse.response.user, null, 2));
  }).catch(console.error);
  res.render('index', {user: req.session.user, title: 'FusionAuth Example'});

});

module.exports = router;
