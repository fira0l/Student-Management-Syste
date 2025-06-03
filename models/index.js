import fs from 'fs';
import path from 'path';
import Sequelize from 'sequelize';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';
import { pathToFileURL } from 'url';

const require = createRequire(import.meta.url);
const configFile = require('../config/config.json'); // 👈 load JSON this way

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const env = process.env.NODE_ENV || 'development';
const config = configFile[env];

const db = {};
let sequelize;

if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

const files = fs.readdirSync(__dirname)
  .filter(file =>
    file.endsWith('.js') && !file.endsWith('.test.js') && file !== 'index.js'
  );

for (const file of files) {

const fullPath = pathToFileURL(path.join(__dirname, file));
const modelModule = await import(fullPath.href);

  const model = modelModule.default(sequelize, Sequelize.DataTypes);
  db[model.name] = model;
}

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
