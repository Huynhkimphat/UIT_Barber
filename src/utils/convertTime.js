module.exports = {
    convertCurrentTime: function(timeCurrent){
        if (timeCurrent <= 8.5 && timeCurrent > 0){
            return 0;
        } else if (timeCurrent <= 10) {
            return 1;
        } else if (timeCurrent <= 11.5) {
            return 2;
        } else if (timeCurrent <= 13) {
            return 2.5;    
        } else if (timeCurrent <= 14.5) {
            return 3;
        } else if (timeCurrent <= 16) {
            return 4;
        } else if (timeCurrent <= 17.5) {
            return 5;
        } else if (timeCurrent <= 19) {
            return 6;
        } else if (timeCurrent <= 20.5) {
            return 7;
        } else if (timeCurrent <= 22) {
            return 8;
        } else if (timeCurrent > 22 && timeCurrent <= 24 ) {
            return 9; 
        }
    },
}