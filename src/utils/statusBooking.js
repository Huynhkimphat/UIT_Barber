const { convertCurrentTime } = require("./convertTime");

module.exports = {
    getStatus: function(result) {
        let dayCurrent = new Date();
        let i =0;
        for (i = 0; i < result.length;i++){
            result[i] = Object.assign(result[i],{done:0})
            result[i] = Object.assign(result[i],{inProgress:0})
            if (result[i].YEAR < dayCurrent.getFullYear()){
                result[i].done = 1;
            } else if(result[i].YEAR == dayCurrent.getFullYear()){
                    if(result[i].MONTH < dayCurrent.getMonth() + 1){
                        result[i].done = 1;
                    } else if (result[i].MONTH == dayCurrent.getMonth() + 1){
                            if(result[i].DAY < dayCurrent.getDate()){
                                result[i].done = 1;
                            } else if (result[i].DAY == dayCurrent.getDate()){
                                    if (result[i].MAGIO < convertCurrentTime(dayCurrent.getHours() + dayCurrent.getMinutes()/60)){
                                        result[i].done = 1;
                                    } else if(result[i].MAGIO == convertCurrentTime(dayCurrent.getHours() + dayCurrent.getMinutes()/60)){
                                        result[i].inProgress = 1;
                                    }
                            }                        
                    }
            } 
        }
        return result;    
    },
};
