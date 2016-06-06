# 575: The Haiku Card Game

## Overview

    |-- client          Angular Client for Cordova / Web
    |-- cordova         Cordova Build
    |-- server          Node.JS Server w/Express + Socket.io
    |-- www             Compiled Client
    |-- server.js       Primary Server Script

## Development Setup

The following required Node.JS and NPM.

    https://nodejs.org/en/download/

You will also need the following global packages.

    npm i -g cordova gulp

Then you can `cd` into this directory and initialize the project.

    npm install

## Development Testing

First, you will need to start the server running locally.

    npm start

In a new terminal, then start watching for client changes.

    gulp default

You can then start Cordova to serve your page locally.

    cordova serve

    
