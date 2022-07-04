const Constants = {
    exp_mo: [
        '01',
        '02',
        '03',
        '04',
        '05',
        '06',
        '07',
        '08',
        '09',
        '10',
        '11',
        '12'
    ],

    exp_yr: new Array(10).fill(new Date().getFullYear()).map((n, i) => n + i)
};

export default Constants;
