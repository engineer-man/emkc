module.exports = {
    get_inputs_and_outputs(test_object) {
        const inputs = test_object.input
            .split('\n')
            .map((input) => input.split('|'));
        const outputs = test_object.output.split('\n');
        return { inputs, outputs };
    },

    are_valid(test_object) {
        return (
            test_object.input.split('\n').length ===
            test_object.output.split('\n').length
        );
    }
};
