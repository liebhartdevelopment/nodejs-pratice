import Sequelize from "sequelize";
import jsyaml from "js-yaml";
import fs from "fs-extra";
import util from "util";
import DBG from "debug";
import { finished } from "stream";
const log = DBG("users:model-users");
const error = DBG("users:error");

var SQUser;
var sequlz;

async function connectDB() {
  if (SQUser) return SQUser.sync();
  const yamltext = await fs.readFile(process.env.SEQUELIZE_CONNECT, "utf8");
  const params = await jsyaml.safeLoad(yamltext, "utf8");

  if (!sequlz)
    sequlz = new Sequelize(
      params.dbname,
      params.username,
      params.password,
      params.params
    );

  // These fields largely come from the Passport / Portable Contacts
  // See http://www.passportjs.org/docs/profile
  //
  // The emails and photos fields are arrays in Portable Contacts.
  // We'd need to set up additional tables for those.
  //
  // The Portable Contacts "id" field maps to the "username" field
  schema.here;
  if (!SQUser)
    SQUser = sequlz.define("User", {
      username: { type: Sequelize.STRING, unique: true },
      password: Sequelize.STRING,
      provider: Sequelize.STRING,
      familyName: Sequelize.STRING,
      givenName: Sequelize.STRING,
      middleName: Sequelize.STRING,
      emails: Sequelize.STRING(2048),
      photos: Sequelize.STRING(2048)
    });
  return SQUser.sync();
}

export async function create(
  username,
  password,
  provider,
  familyName,
  givenName,
  middleName,
  emails,
  photos
) {
  const SQUser = await connectDB();
  return SQUser.create({
    username,
    password,
    provider,
    familyName,
    givenName,
    middleName,
    emails: JSON.stringify(emails),
    photos: JSON.stringify(photos)
  });
}

export async function update(
  username,
  password,
  provider,
  familyName,
  givenName,
  middleName,
  emails,
  photos
) {
  const user = await find(username);
  return user
    ? user.updateAttributes({
        password,
        provider,
        familyName,
        givenName,
        middleName,
        emails: JSON.stringify(emails),
        photos: JSON.stringify(photos)
      })
    : undefined;
}

export async function find(username) {
  const SQUser = await connectDB();
  const user = await SQUser.find({ where: { username } });
  const ret = user ? sanitizedUser(user) : undefined;
  return ret;
}

export async function destroy(username) {
  const SQUser = await connectDB();
  const user = await SQUser.find({ where: { username } });
  if (!user) throw new Error(`Did not find requested: ${username} to delete!`);
  user.destroy();
}

export async function userPasswordCheck(username, password) {
  const SQUser = await connectDB();
  const user = await SQUser.find({ where: { username } });
  if (!user) {
    return { check: false, username, message: "Could not find user!" };
  } else if (user.username === username && user.password === password) {
    return { check: true, username: user.username };
  } else {
    return {
      check: false,
      username,
      message: "Incorrect password! Please try again."
    };
  }
}

export async function findOrCreate(profile) {
  const user = await find(profile.id);
  if (user) return user;
  return await create(
    profile.id,
    profile.password,
    profile.provider,
    profile.familyName,
    profile.givenName,
    profile.middleName,
    profile.emails,
    profile,
    photos
  );
}

export async function listUser() {
  const SQUser = await connectDB();
  const userlist = await SQUser.findAll({});
  return userlist.map(user => sanitizedUser(user));
}

export function sanitizedUser(user) {
  var ret = {
    id: user.username,
    username: user.username,
    provider: user.provider,
    familyName: user.familyName,
    givenName: user.givenName,
    middleName: user.middleName,
    emails: JSON.parse(user.emails),
    photos: JSON.parse(user.photos)
  };
  try {
    ret.emails = JSON.parse(user.emails);
  } catch (e) {
    ret.emails = [];
  }
  try {
    ret.photos = JSON.parse(user.photos);
  } catch (e) {
    ret.photos = [];
  }
  return ret;
}
