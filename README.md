**This repo is out of date and is archived. Check out [an updated tutorial on using FusionAuth with Node/Express](https://fusionauth.io/docs/quickstarts/quickstart-javascript-express-web) or [the updated GitHub repository](https://github.com/FusionAuth/fusionauth-quickstart-javascript-express-web).**


# Example: Using Node with FusionAuth
This project is a simple example Node.js application that illustrates how to integrate with FusionAuth's OAuth system using the Authorization Code grant.

This application will use an OAuth Authorization Code workflow and the PKCE extension to log users in. PKCE stands for Proof Key for Code Exchange, and is often pronounced "pixie".

## Prerequisites
You will need the following things properly installed on your computer.

* [Git](http://git-scm.com/): Presumably you already have this on your machine if you are looking at this project locally; if not, use your platform's package manager to install git, and `git clone` this repo.
* [NodeJS](https://nodejs.org): NodeJS can usually be installed using your platform's package manager, or by visiting the NodeJS website and downloading an installer.
* [Docker](https://www.docker.com): For standing up FusionAuth from within a Docker container. (You can [install it other ways](https://fusionauth.io/docs/v1/tech/installation-guide/), but for this example you'll need Docker.)

## Installation
* `git clone https://github.com/FusionAuth/fusionauth-example-node`
* `cd fusionauth-example-node`
* `npm install`

## FusionAuth Configuration
This example assumes that you will run FusionAuth from a Docker container. In the root of this project directory (next to this README) are two files [a Docker compose file](./docker-compose.yml) and an [environment variables configuration file](./.env). Assuming you have Docker installed on your machine, a `docker-compose up` will bring FusionAuth up on your machine.

The FusionAuth configuration files also make use of a unique feature of FusionAuth, called Kickstart: when FusionAuth comes up for the first time, it will look at the [Kickstart file](./kickstart/kickstart.json) and mimic API calls to configure FusionAuth for use. It will perform all the necessary setup to make this demo work correctly, but if you are curious as to what the setup would look like by hand, the "FusionAuth configuration (by hand)" section of this README describes it in detail.

For now, get FusionAuth in Docker up and running (via `docker-compose up`) if it is not already running; to see, [click here](http://localhost:9011/) to verify it is up and running.

> **NOTE**: If you ever want to reset the FusionAuth system, delete the volumes created by docker-compose by executing `docker-compose down -v`. FusionAuth will only apply the Kickstart settings when it is first run (e.g., it has no data configured for it yet).


## Running / Development

* In a terminal window, run `docker-compose up` to bring up the FusionAuth containers.
* In a separate terminal window, run `npm start` to start the node application.
* [Open a browser](http://localhost:3000) and log in using our user's credentials ("richard@example.com"/"password").

Log into the [FusionAuth admin screen](http://localhost:9011) with a different browser or incognito window using the admin user credentials ("admin@example.com"/"password") to explore the admin user experience.
