module.exports = {
    sortObject: function(object,key){
        let i;
        for (i = 0; i< object.length;i++){
            let j;
            for (j = i;j < object.length;j++){
                if (object[j][key] < object[i][key] ){
                    let swap = object[j];
                    object[j] = object[i];
                    object[i] = swap;
                }
            }
        }
        return object;
    },
}