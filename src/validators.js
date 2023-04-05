export function dataValida(value) {

    var datex = value;
    var dateDay = datex.slice(0,2);
    var dateMonth = datex.slice(3,5);
    var dateYear = datex.slice(6,10);
    var currentDate = new Date().toJSON().slice(0,4);

    if(dateDay >= 1 && dateDay <= 31 && dateMonth >= 1 && dateMonth <=12 ){
        if(dateYear <= (currentDate - 3) && dateYear >= (currentDate - 120)){
            return true;
        }
    }else{
        return false
    }

}
