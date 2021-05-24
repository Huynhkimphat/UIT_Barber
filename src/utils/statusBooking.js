module.exports = {
    convertCurrentTime: function(timeCurrent){
        if (timeCurrent <= 10) {
            return 1;
        } else if (timeCurrent <= 11,5) {
            return 2;
        } else if (timeCurrent <= 14,5) {
            return 3;
        } else if (timeCurrent <= 16) {
            return 4;
        } else if (timeCurrent <= 17,5) {
            return 5;
        } else if (timeCurrent <= 19) {
            return 6;
        } else if (timeCurrent <= 20,5) {
            return 7;
        } else if (timeCurrent <= 22) {
            return 8;
        } else{
            return 0;
        }
    },
    getStatus: function(result) {
        let dayCurrent = new Date();
        let i =0;
        for (i = 0; i < result.length;i++){
            result[i] = Object.assign(result[i],{status:0})
            if (result[i].YEAR < dayCurrent.getFullYear()){
                result[i].status = 1;
            } else if(result[i].YEAR == dayCurrent.getFullYear()){
                if(result[i].MONTH < dayCurrent.getMonth() + 1){
                    result[i].status = 1;
                } else if (result[i].MONTH == dayCurrent.getMonth() + 1){
                    if(result[i].DAY < dayCurrent.getDate()){
                        result[i].status = 1;
                    } else if (result[i].DAY == dayCurrent.getDate()){
                        if (result[i].magio <= this.convertCurrentTime(dayCurrent.getHours() + dayCurrent.getMinutes())){
                            result[i].status = 1;
                        }
                    }                        
                }
            } 
        }
        return result;    
    },
};
