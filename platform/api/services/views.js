const q = require('q');
const twig = require('twig');

module.exports = {

    render(template, data) {
        data.sails = sails;
        data.constant = constant;

        return q
            .fcall(() => {
                return twig
                    .twig({
                        allowInlineIncludes: true,
                        base: root_dir + '/platform/views',
                        path: root_dir + '/platform/views/' + template + '.twig',
                        async: false
                    })
                    .render(data);
            });
    }

};
