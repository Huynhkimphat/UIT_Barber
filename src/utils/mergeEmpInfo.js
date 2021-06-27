module.exports = {
    mergeEmpInfo: function(Info, BonusSalary) {
        let object = [];
        for (let j = 0; j < Info.rows.length; j++) {
            object[j] = Info.rows[j];
        }

        for (let i = 0; i < BonusSalary.rows.length; i++) {
            for (let j = 0; j < Info.rows.length; j++) {
                if (Info.rows[j].MANV == BonusSalary.rows[i].MANV) {
                    object[j] = {...Info.rows[j], ...BonusSalary.rows[i] };
                }

            }

        }
        return object;
    },
};