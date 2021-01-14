# FusionAuth Node.js example

This project is a simple example Node.js application that illustrates how to integrate with FusionAuth's OAuth system using the Authorization Code grant.

This application will use an OAuth Authorization Code workflow and the PKCE extension to log users in. PKCE stands for Proof Key for Code Exchange, and is often pronounced "pixie".

## To run

This assumes you already have a running FusionAuth instance, user and application running locally. If you don't, please see the [5-Minute Setup Guide](https://fusionauth.io/docs/v1/tech/5-minute-setup-guide) to do so.

* update your FusionAuth application to allow a redirect of `http://localhost:3000/oauth-redirect`
* make sure your user has a first name.
* `npm install`
* update `routes/index.js` with the client id and client secret of your FusionAuth application.
* `npm start`

Go to http://localhost:3000/ and login with the previously created user.

You should see 'Hello <name>'
