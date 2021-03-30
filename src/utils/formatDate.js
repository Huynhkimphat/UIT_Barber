module.exports = {
    formatDate: function(array) {
        for (let i = 0; i < array.length; i++) {
            for (let j = 0; j < array[i].length; j++) {
                if (typeof array[i][j] === 'object') {
                    array[i][j] = array[i][j].toDateString();
                }
            }
        }
        return array;
    }
}