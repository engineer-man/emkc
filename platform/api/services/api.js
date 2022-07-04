module.exports = {
    handle_err(res, err) {
        console.log(err, '\n\n');

        try {
            err = JSON.parse(err.message);

            return res.send({
                message: err[0] || 'An error occurred',
                errors: err[1]
            });
        } catch (e) {
            return res.send({
                message: err.message || 'An error occurred'
            });
        }
    }
};
