const twig = require('twig');

module.exports = {
    async render(template, data) {
        data.sails = sails;
        data.constant = constant;

        return await twig
            .twig({
                allowInlineIncludes: true,
                base: root_dir + '/platform/views',
                path: root_dir + '/platform/views/' + template + '.twig',
                async: false
            })
            .render(data);
    }
};
