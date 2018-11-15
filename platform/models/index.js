'use strict';

const fs = require('fs');
var path = require('path');
var Sequelize = require('sequelize');
var basename = path.basename(module.filename);
var config = sails.config.db;
var sequelize = new Sequelize(config.database, config.username, config.password, config);
var db = {};

fs
    .readdirSync(__dirname)
    .filter(file => {
        return file.indexOf('.') !== 0 && file !== basename && file.match(/\.js$/);
    })
    .for_each(file => {
        var model = sequelize['import'](path.join(__dirname, file));
        db[model.name] = model;
    });

Object.keys(db).for_each(model_name => {
    if ('associate' in db[model_name]) {
        db[model_name].associate(db);
    }

    // non shitty camel case aliases
    db[model_name].bulk_create = db[model_name].bulkCreate;
    db[model_name].find_one = db[model_name].findOne;
    db[model_name].find_all = db[model_name].findAll;
    db[model_name].find_or_create = db[model_name].findOrCreate;
    db[model_name].find_and_count_all = db[model_name].findAndCountAll;
    db[model_name].belongs_to = db[model_name].belongsTo;
    db[model_name].has_one = db[model_name].hasOne;
    db[model_name].has_many = db[model_name].hasMany;
    db[model_name].belongs_to_many = db[model_name].belongsToMany;
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.challenges.has_one(db.user_challenges, { as: 'solution', foreignKey: 'challenge_id' });

db.comments.belongs_to(db.users, { as: 'user', foreignKey: 'user_id' });

db.questions.belongs_to(db.users, { as: 'user', foreignKey: 'user_id' });
db.questions.has_one(db.question_votes, { as: 'vote', foreignKey: 'question_id' });
db.questions.has_many(db.question_votes, { as: 'votes', foreignKey: 'question_id' });
db.questions.has_many(db.question_tags, { as: 'question_tags', foreignKey: 'question_id' });
db.questions.belongsToMany(db.tags, { as: 'tags', through: { model: db.question_tags }, foreignKey: 'question_id' });

db.question_tags.belongsTo(db.questions, { as: 'question', foreignKey: 'question_id' });
db.question_tags.belongsTo(db.tags, { as: 'tag', foreignKey: 'tag_id' });

db.tags.belongsToMany(db.questions, { as: 'questions', through: { model: db.question_tags }, foreignKey: 'tag_id' });

db.user_challenges.belongs_to(db.challenges, { as: 'challenge', foreignKey: 'challenge_id' });

db.video_requests.has_one(db.video_request_votes, { as: 'vote', foreignKey: 'video_request_id' });
db.video_requests.has_many(db.video_request_votes, { as: 'votes', foreignKey: 'video_request_id' });

module.exports = db;
