import restify from "restify";
import util from "util";

import DBG from "debug";
const log = DBG("users:service");
const error = DBG("users:error");

import * as usersModel from "./users-sequelize";
import { unwatchFile } from "fs";

var server = restify.createServer({
  name: "User-Auth-Service",
  version: "0.0.1"
});

server.use(restify.plugins.authorizationParser());
server.use(check);
server.use(restify.plugins.queryParser());
server.use(
  restify.plugins.bodyParser({
    mapParams: true
  })
);

// Create a user record
server.post("/create-user", async (req, res, next) => {
  try {
    var result = await usersModel.create(
      req.params.username,
      req.params.password,
      req.params.provider,
      req.params.familyName,
      req.params.givenName,
      req.params.middleName,
      req.params.emails,
      req.params.photos
    );
    res.send(result);
    next(false);
  } catch (err) {
    res.send(500, err);
    next(false);
  }
});

// Update an existing user record
server.post("/update-user/:username", async (req, res, next) => {
  try {
    var result = await usersModel.update(
      req.params.username,
      req.params.password,
      req.params.provider,
      req.params.familyName,
      req.params.givenName,
      req.params.middleName,
      req.params.emails,
      req.params.photos
    );
    res.send(usersModel.sanitizedUser(result));
    next(false);
  } catch (err) {
    res.send(500, err);
    next(false);
  }
});

// Find a user, if not found create one given profile information
server.post('/find-or-create', async (req, res, next) => {
  log('find-or-create ' + util.inspect(req.params));
  try {
    var result = await usersModel.findOrCreate({
      id: req.params.username,
      username: req.params.username,
      password: req.params.password,
      provider: req.params.provider,
      familyName: req.params.familyName,
      givenName: req.params.givenName,
      middleName: req.params.
    })
  }
})
