function _convert(string,to,how) {
    if (!to) to = _type(string).type == "string" ? "number" : "string"
    to = to.toLowerCase();
    if (to == "number") {
        if (_type(string).type == "array" && _type(string).arrayType == "number") {
            if (!how || how == "sum") return string.sum(); 
            if (how.orCompare("avg","average")) return string.avg();
        }
        
        return Number(string);
    }
    if (to.orCompare("str","string")) {
        if (_type(string).type == "array") return string.join(how ?? ",")
        return string.toString();
    }
    if (to == "set") {
        if (_type(string).type == "array") {
            if (!how || how == "array")
                return [...new Set(string)];
            if (how == "object")
                return new Set(string);
        }
    }
    if (to.orCompare("array","arr")) {
        if (_type(string).type == "object") {
            let arr = [];
            if (!how) how = "array";
            for (var key of Object.keys(string)) {
                if (how == "array") arr.push([key,string[key]])
                if (how.orCompare("object","obj")) arr.push({key: key, value: string[key]})
            }
            return arr;
        }
        if (_type(how).type == "string") {
            string.toString();
            return string.split(how)
        }
        return [string];
    }
    if (to.orCompare("js","javascript")) {
        if (_type(string).isJSON) return JSON.parse(string);
    }
    if (to.orCompare("json")) {
        return JSON.stringify(string);
    }
    if (to.orCompare("obj","object")) {
        let obj = {};

        if (_type(string).type == "string" || _type(string).type == "number") {
            obj[how ?? "value"] = string;
        }
        if (_type(string).type == "array") {
            for (let i = 0; i < string.length; i++) {
                if (_type(how).type == "string") obj[how + i] = string[i]
                else obj[how[i] ?? "value" + i] = string[i];
            }
        }

        return obj;
    }
    let conversionSets = [
        //Temps
        {from: ["celsius"], to: ["kelvin"], func: (x)=>{return x + 273.15}},
        {from: ["kelvin"], to: ["celsius"], func: (x)=>{return x - 273.15}},
        {from: ["fahrenheit"], to: ["celsius"], func: (x)=>{return (x-32)*(5/9)}},
        {from: ["celsius"], to: ["fahrenheit"], func: (x)=>{return ((9/5) * x) + 32}},
        {from: ["fahrenheit"], to: ["kelvin"], func: (x)=>{return ((x-32)*(5/9))+273.15}},
        {from: ["kelvin"], to: ["fahrenheit"], func: (x)=>{return ((x-273.15)*(9/5))+32}},

        {from: ["kg","kilogram"], to: ["pounds","lb"], func: (x)=>{return x * 2.2046 }},
        {from: ["pounds","lb"], to: ["kg","kilogram"], func: (x)=>{return x / 2.2046 }},

        //Distance
        {from: ["mil","inch","feet","foot","yard","inches","mile","capefoot","rod","angstrom","nanometer","micron","millimeter","centimeter","meter","kilometer","lightyear","lightday","lighthour","lightminute","lightsecond"], to: ["mil","inch","feet","foot","yard","mile","capefoot","rod","angstrom","nanometer","micron","millimeter","centimeter","meter","kilometer","lightyear","lightday","inches","lighthour","lightminute","lightsecond"], func: (x,from,to)=>{return _convertDist(x,from,to) }},

        //Time
        {from: ["nanosecond","millisecond","second","minute","hour","day","week","fortnight","month","year","decade","century","millennium","eon"], to: ["nanosecond","millisecond","second","minute","hour","day","week","fortnight","month","year","decade","century","millennium","eon"], func: (x,from,to)=>{return _convertTime(x,from,to) }},

        //Cookimng
        {from: ["teaspoon","tablespoon","ounce","cup","pint","quart","gallon","milliliter","liter"], to: ["teaspoon","tablespoon","ounce","cup","pint","quart","gallon","milliliter","liter"], func: (x,from,to)=>{return _convertCook(x,from,to) }},

        //Bytes
        {from: ["bit","byte","kilobyte","kb","megabyte","mb","gigabyte","gb","terabyte","tb","petabyte","pb","exabyte","eb"], to: ["bit","byte","kilobyte","kb","megabyte","mb","gigabyte","gb","terabyte","tb","petabyte","pb","exabyte","eb"], func: (x,from,to)=>{return _convertByte(x,from,to) }},

    ];

    let iKnowFrom = false;
    let iKnowTo = false;
    for (let i = 0; i < conversionSets.length; i++) {
        let set = conversionSets[i];
        if (!iKnowFrom && set.from.includes(to)) iKnowFrom = true;
        if (!iKnowTo && set.to.includes(how)) iKnowTo = true;
        if ((set.from.includes(to) || set.from.includes(to.subset(0,"*end\\-1"))) && (set.to.includes(how) || set.to.includes(how.subset(0,"*end\\-1")))) return set.func(string,to,how);


    }

    if (!iKnowFrom || !iKnowTo)
        console.warn("Unknown type(s):" + (!iKnowFrom ? " " + to : "") + (!iKnowTo ? " " + how : ""));
    else
        console.warn("I can't convert that type. Sorry")
}


String.prototype.rearrange = function(from,to) {
    let arr = this.split("");
    if (!to) {
        to = from;
        from = "abcdefghijklmnopqrstuvwxyz0123456789";
    }
    from = from.split("");
    to = to.split("");

    let fromArr = [];
    for (let i = 0; i < arr.length; i++) {
        fromArr.push({
            key: arr[i],
            value: from[i],
            index: i,
        })
    }
    let returnString = "";
    for (let i = 0; i < to.length; i++) {
        for (let j = 0; j < fromArr.length; j++) {
            if (to[i] == fromArr[j].value) returnString += this.charAt(fromArr[j].index);
        }
    }
    return returnString;
}

function _convertDist(number,from,to) {
    if (from.charAt(from.length-1).toLowerCase() == "s") from = from.subset(0,"*end\\-1")
        if (to.charAt(to.length-1).toLowerCase() == "s") to = to.subset(0,"*end\\-1")
    
        let rateOfMeter = {
            mil:         (1/(0.0000254/1000)),
            inch:        1/0.0000254,
            inches:      1/0.0000254,
            foot:        1/0.00030478512648582747,
            feet:        1/0.00030478512648582747,
            yard:        1/(0.00030478512648582747*3),
            mile:        1/1.609344,
            capefoot:    1/(1/3176.0349109757412),
            rod:         1/(1/198.83878152),
            angstrom:    1/(1/10000000000000),
            nanometer:   1/(1/1000000000000),
            micron:      1/(1/1000000000),
            millimeter:  1/(1/1000000),
            centimeter:  1/(1/100000),
            meter:       1000,
            kilometer:   1,
            lightyear:   0.0000000000001057,
            lightday:    0.000000000038607,
            lighthour:   0.000000000926567,
            lightminute: 0.000000055594,
            lightsecond: 0.00000333564,
        }
        let meter;
        meter = Number(number) / rateOfMeter[from];
        return Number((meter * rateOfMeter[to]));
}
function _convertTime(number,from,to) {
    if (from.charAt(from.length-1).toLowerCase() == "s") from = from.subset(0,"*end\\-1")
    if (to.charAt(to.length-1).toLowerCase() == "s") to = to.subset(0,"*end\\-1")

    let ratesOfMonth = {
        nanosecond: 2592000000000000,
        millisecond: 2592000000,
        second: 2592000,
        minute: 43200,
        hour: 720,
        day: 30,
        week: 4,
        fortnight: 2,
        month: 1,
        year: 1/12,
        decade: 1/120,
        century: 1/1200,
        millennium: 1/12000,
        eon: 1/12000000000,
    }
    let month;
    month = Number(number) / ratesOfMonth[from];
    return month * ratesOfMonth[to];

}
function _convertCook(number,from,to) {
    if (from.charAt(from.length-1).toLowerCase() == "s") from = from.subset(0,"*end\\-1")
    if (to.charAt(to.length-1).toLowerCase() == "s") to = to.subset(0,"*end\\-1")

    let ratesOfMonth = {
        teaspoon: 202.9,
        tablespoon: 67.628,
        ounce: 33.814,
        cup: 4.227,
        pint: 2.113,
        quart: 1.057,
        gallon: 3.785,
        milliliter: 1000,
        liter: 1,
    }
    let month;
    month = Number(number) / ratesOfMonth[from];
    return Number((month * ratesOfMonth[to]).toFixed(2));

}
function _convertByte(number,from,to) {
    if (from.charAt(from.length-1).toLowerCase() == "s") from = from.subset(0,"*end\\-1")
    if (to.charAt(to.length-1).toLowerCase() == "s") to = to.subset(0,"*end\\-1")

    let ratesOfMonth = {
        bit: 8000000000000,
        byte: 1000000000000,
        kilobyte: 1000000000,
        kb: 1000000000,
        megabyte: 1000000,
        mb: 1000000,
        gigabyte: 1000,
        gb: 1000,
        terabyte: 1,
        tb: 1,
        petabyte: 0.001,
        pb: 0.001,
        exabyte: 0.000001,
        eb: 0.000001,
    }
    let month;
    month = Number(number) / ratesOfMonth[from];
    return Number((month * ratesOfMonth[to]).toFixed(2));

}