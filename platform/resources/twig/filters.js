const contains = (array, value) => {
    if (value === undefined || value === null) {
        return false;
    }

    for (let checking of array) {
        let found = true;

        for (let entry of Object.entries(checking)) {
            if (value[0][entry[0]] !== entry[1]) {
                found = false;
            }
        }

        if (found) {
            return true;
        }
    }

    return false;
};

module.exports = [
    {
        name: 'contains',
        filter: contains
    }
];
