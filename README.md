# 575: The Haiku Card Games

## Overview

    +-- client              Game Client
    | +-- app               Angular App
    | | +-- layout          Thematic Components
    | | +-- network         Sockets / Players / Rooms
    | | +-- pregame         Signins / Lobby / Help
    | | +-- app.*.js        Angular Startup
    | | +-- app.*.html      Main Template
    | +-- less              Precompiled CSS Stylesheets
    +-- server              Node.JS Server w/Express + Socket.io
    | +-- controller        Socket Events and Emitters
    | +-- lib               Libraries
    | +-- model             Data Models (Rooms / Players)
    | +-- app.js            Server Startup
    +-- cordova             Cordova Build
    +-- www                 Compiled Client
    +-- gulpfile.js         Client Compiler
    +-- server.js           Primary Server Script

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

## Cordova Building

TBD
