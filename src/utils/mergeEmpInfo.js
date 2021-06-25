module.exports = {
    mergeEmpInfo: function(Info, BonusSalary) {
        let object = [];
        for (let i = 0; i < Info.rows.length; i++) {
            object[i] = {...Info.rows[i], ...BonusSalary.rows[i] };
        }
        return object;
    },
};