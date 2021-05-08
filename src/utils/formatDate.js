module.exports = {
    formatDate: function(object) {
        for (let i = 0; i < object.rows.length; i++) {
            const keys = Object.keys(object.rows[i]);
            keys.forEach((key, index) => {
                if (object.rows[i][key] === null) {
                    object.rows[i][key] = null;
                } else if (typeof object.rows[i][key] === "object") {
                    object.rows[i][key] = object.rows[i][key].toDateString();
                    str = object.rows[i][key];
                    var mnths = {
                            Jan: "01",
                            Feb: "02",
                            Mar: "03",
                            Apr: "04",
                            May: "05",
                            Jun: "06",
                            Jul: "07",
                            Aug: "08",
                            Sep: "09",
                            Oct: "10",
                            Nov: "11",
                            Dec: "12"
                        },
                        date = str.split(" ");
                    object.rows[i][key] = String([date[3], mnths[date[1]], date[2]].join("-"));
                }
            });
        }
        return object;
    },
};