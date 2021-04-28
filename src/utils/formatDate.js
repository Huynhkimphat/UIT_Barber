module.exports = {
    formatDate: function(object) {
        for (let i = 0; i < object.rows.length; i++) {
            const keys = Object.keys(object.rows[i]);
            keys.forEach((key, index) => {
                if (object.rows[i][key] === null) {
                    object.rows[i][key] = null;
                } else if (typeof object.rows[i][key] === "object") {
                    object.rows[i][key] = object.rows[i][key].toDateString();
                }
            });
        }
        return object;
    },
};