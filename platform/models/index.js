const path = require('path');
const basename = path.basename(module.filename);
const config = sails.config.db;
const db = {};

const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
);

require('fs')
    .readdir_sync(__dirname)
    .filter(file => {
        return file.indexOf('.') !== 0 && file !== basename && file.match(/\.js$/);
    })
    .for_each(file => {
        //let model = sequelize.import(path.join(__dirname, file));
        let model = require(path.join(__dirname, file))(sequelize, DataTypes);
        db[model.name] = model;
    });

for (const model_name in db) {
    db[model_name].bulk_create = db[model_name].bulkCreate;
    db[model_name].find_one = db[model_name].findOne;
    db[model_name].find_all = db[model_name].findAll;
    db[model_name].find_or_create = db[model_name].findOrCreate;
    db[model_name].find_and_count_all = db[model_name].findAndCountAll;
    db[model_name].belongs_to = db[model_name].belongsTo;
    db[model_name].has_one = db[model_name].hasOne;
    db[model_name].has_many = db[model_name].hasMany;
    db[model_name].belongs_to_many = db[model_name].belongsToMany;
}

db.sequelize = sequelize;
db.Sequelize = Sequelize;

$or = Sequelize.Op.or;
$and = Sequelize.Op.and;
$like = Sequelize.Op.like;
$ne = Sequelize.Op.ne;
$not = Sequelize.Op.not;
$gt = Sequelize.Op.gt;
$gte = Sequelize.Op.gte;
$lt = Sequelize.Op.lt;
$lte = Sequelize.Op.lte;

db.challenges.has_one(db.user_challenges, { as: 'solution', foreignKey: 'challenge_id' });
db.challenges.has_many(db.user_challenges, { as: 'solutions', foreignKey: 'challenge_id' });

db.contests.has_many(db.contest_submissions, { as: 'submissions', foreignKey: 'contest_id' });

db.users.has_many(db.contest_submissions, { as: 'submissions', foreignKey: 'user_id' });

db.user_challenges.belongs_to(db.challenges, { as: 'challenge', foreignKey: 'challenge_id' });
db.user_challenges.belongs_to(db.users, { as: 'user', foreignKey: 'user_id' });
db.contest_submissions.belongs_to(db.contests, { as: 'contest', foreignKey: 'contest_id' });
db.contest_submissions.belongs_to(db.users, { as: 'user', foreignKey: 'user_id' });

module.exports = db;
