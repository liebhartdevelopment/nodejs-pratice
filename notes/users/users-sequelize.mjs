import Sequelize from "sequelize";
import jsyaml from "js-yaml";
import fs from "fs-extra";
import util from "util";
import DBG from "debug";
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
