const constant = require('./constant');
const elasticsearch = require('elasticsearch');

const client = new elasticsearch.Client({
    host: sails.config.elasticsearch.host + ':9200',
    logging: 'verbose'
});

module.exports = {

    client,

    delete_index(index) {
        return client.indices
            .delete({
                index
            })
            .catch(err => {});
    },

    delete(index, id) {
        return client
            .delete({
                index,
                type: index,
                id
            })
            .catch(err => {});
    },

};
