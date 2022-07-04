const twig = require('twig');

for (let filter of require('../resources/twig/filters')) {
    twig.extendFilter(filter.name, filter.filter);
}

module.exports.views = {
    layout: false,
    engine: {
        ext: 'twig',
        fn: twig.__express
    }
};
