/*
    ----------------Simple----------------
          Use JavaScript but simply.
    Version: 15
    Created By: JoeTheHobo (John Jones)
    Email: johnjonesma@gmail.com
*/

Object.prototype.classRemove = function(classes) {
    if (this.length == undefined) {
        [this].classRemove(classes);
    } else {
        let arr = [];
        repeat(this,(obj) => {
            arr.push(obj)
        })
        arr.classRemove(classes);
    }
    return this;
}
Object.prototype.classAdd = function(classes) {
    if (this.length == undefined) {
        [this].classAdd(classes);
    } else {
        let arr = [];
        repeat(this,(obj) => {
            arr.push(obj)
        })
        arr.classAdd(classes);
    }
    return this;
}

Array.prototype.classAdd = function(classes) {
    let list = classes.split(" ")
    repeat(this,(object,i) => {
        repeat(list,(name,i) => {
            object.classList.add(name);
        })
    })
    return this;
}
Array.prototype.classRemove = function(classes) {
    let list = classes.split(" ")
    repeat(this,(object,i) => {
        repeat(list,(name,i) => {
            object.classList.remove(name);
        })
    })
    return this;
}


Object.prototype.$P = function(x = 1) {
    let a = this;
    for (var i = 0; i < x; i++) {
        a = a.parentNode;
    }
    return a;
}
Object.prototype.$ = function(c) {
    return $(c,this); 
}
function $(c,b = document) {
    if (c.includes(' ')) {
        let list = c.split(" ");
        let returnList = [];
        for (let i = 0; i < list.length; i++) {
            returnList.push($(list[i]));
        }
        return returnList;
    } else {
        if(!'#.<'.includes(c.charAt(0))) c = '#' + c;
        if (c.charAt(0) == '<') c = c.charAt(c.length-1) == '>' ? c.substring(1,c.length-1) : c.substring(1,c.length);
        let a = b.querySelectorAll(c);
        return a.length == 1 ? (a[0]) : (a.length == 0 ? false : a);
    }
}
Object.prototype.each = function(type,func) {
    let objs = [];
    if (this.length) {
        for (let i = 0; i < this.length; i++) {
            objs.push(this[i])
        }
    } else {
        objs = [this];
    }
    
    return objs.each(type,func);
}
Array.prototype.each = function(type,response) {
    let whatToPerform;
    let typeCreateDomReturnList = [];

    if (typeof type == "string") whatToPerform = "action";
    if (typeof type == "string" && type == "innerHTML") whatToPerform = "innerHTML";
    if (typeof type == "string" && type == "placeholder") whatToPerform = "placeholder";
    if (typeof type == "string" && type == "id") whatToPerform = "id";
    if (typeof type == "string" && type == "value") whatToPerform = "value";
    if (typeof type == "string" && (type == "class" || type == "className")) whatToPerform = "class";
    if (typeof type == "string" && type == "classRemove") whatToPerform = "classRemove";
    if (typeof type == "string" && type == "classAdd") whatToPerform = "classAdd";
    if (typeof type == "string" && type == "src") whatToPerform = "src";
    if (typeof type == "string" && type == "create") whatToPerform = "create";
    if (typeof type == "function") whatToPerform = "function";
    if (getType(type) == "object") whatToPerform = "style";
    if (getType(type) == "array") whatToPerform = "multiAction";
    if (typeof type == "string" && type.includes(" ")) whatToPerform = "stringMultiAction";
    if (whatToPerform == "action" && type.substring(0,2) == "on") type = type.substring(2,type.length);
    if (whatToPerform == "action") type = type.toLowerCase();
    if (whatToPerform == "stringMultiAction") {
        type = type.split(" ");
        whatToPerform = "multiAction";
    }

    for (let i = 0; i < this.length; i++) {
        if (whatToPerform == 'action') {
            this[i].addEventListener(type,response);
        }
        if (whatToPerform == "multiAction") {
            for (let j = 0; j < type.length; j++) {
                this[i].addEventListener(type[j],response);
            }
        }
        if (whatToPerform == 'style') this[i].css(type);
        if (whatToPerform == 'innerHTML') this[i].innerHTML = response;
        if (whatToPerform == 'placeholder') this[i].placeholder = response;
        if (whatToPerform == 'src') this[i].src = response;
        if (whatToPerform == 'id') this[i].id = response;
        if (whatToPerform == 'class') this[i].class = response;
        if (whatToPerform == 'value') this[i].value = response;
        if (whatToPerform == 'classAdd') this[i].classList.add(response)
        if (whatToPerform == 'classRemove') this[i].classList.remove(response)
        if (whatToPerform == 'function') type(this[i]);
        if (whatToPerform == 'create') typeCreateDomReturnList.push(this[i].id.create(response));
    }
    if (typeCreateDomReturnList.length > 0) return typeCreateDomReturnList;
    else return this;
}

Object.prototype.css = function(obj) {
    for (let i = 0; i < Object.keys(obj).length; i++) {
        eval('this.style.' + Object.keys(obj)[i] + ' = "' + Object.values(obj)[i] + '"')
    }
}
Object.prototype.on = function(what,func) {
    this.length ? this.map(x => x.on(what,func)) : this.addEventListener(what,func);
    return this;
}
String.prototype.rnd = function(amt = false,l=[]) {
    for (let i = 0; i < amt; i++) {
        l.push(this.charAt(rnd(0,this.length - 1)));
    }
    return amt !== false ? l : this.charAt(rnd(0,this.length - 1));
}
Array.prototype.rnd = function(amt = false,l=[]) {
    for (let i = 0; i < amt; i++) {
        l.push(this[rnd(0,this.length - 1)]);
    }
    return amt !== false ? l : this[rnd(0,this.length - 1)];
}

/*
    Documentation
    getType(object,detailed) return a string of whatever the object is
    Detailed is set to false, if you set it too true it will give you a detailed explanation of the type
    All Types
    ------------
    number
    string
    array
    object
    boolean
    number
    function
    HTMLElement
    class
    symbol
    bigint
    null
    undefined
*/
function getType(ele,detailed = false) {
    if (ele == null && ele !== undefined) return "null";
    if (ele == undefined) return "undefined";
    if (isClass(ele)) {
        if (!detailed) return "class";
        return ele.constructor.name;
    } 
    if (ele instanceof HTMLElement) return "HTMLElement";
    if (typeof ele == 'object' && ele.length) {
        return "array";   
    }
    return typeof ele;
}
function isClass(obj) {
    const isCtorClass = obj.constructor
        && obj.constructor.toString().substring(0, 5) === 'class'
    if(obj.prototype === undefined) {
      return isCtorClass
    }
    const isPrototypeCtorClass = obj.prototype.constructor 
      && obj.prototype.constructor.toString
      && obj.prototype.constructor.toString().substring(0, 5) === 'class'
    return isCtorClass || isPrototypeCtorClass
  }
//////////////////
//HOW TO USE RND//
//////////////////
//rnd(num) Returns random number 1 through your number
//rnd(num1,num2) Returns random number between first and second number
//
//rnd("color",none|"rgb"|"hex") Return random color (hex)
//rnd("abc"||"ABC"||"letter"||"LETTER"||"Abc"||"Letter") Return random letter from ABC. Captilized if string is
//////////////////

function rnd(num,to,exp) {
    if (!isNaN(num)) {
        while (true) {
            if (!to && to !== 0) {
                to = num;
                num = 1;
            }
            let finalNum = Math.floor((Math.random() * (to - num + 1)) + num);
            let checked = true; 
            if (exp) {
                if (!exp.length) exp = [exp];
                for (let i = 0; i < exp.length; i++) {
                    if (exp[i] == finalNum) checked = false;
                }
            }
            if (checked || !exp) return finalNum;
        }
    }

    if (typeof num == 'string') {
        if ((num.toLowerCase() == 'letter' || num.toLowerCase() == 'abc') && to !== false) {
            let abc = 'abcdefghijklmnopqrstuvwxyz';
            if (num === 'LETTER' || num === 'ABC') return abc.rnd().toUpperCase();
            if (num === 'Letter' || num === 'Abc') return rnd(2) == 2 ? abc.rnd().toUpperCase() : abc.rnd();
            return abc.rnd();
        }

        if (num == 'color') {
            if (to == 'hex' || !to) {
                let tool = '0123456789abcdef';
                return '#' + tool.rnd() + tool.rnd() + tool.rnd() + tool.rnd() + tool.rnd() + tool.rnd();
            }
            if (to == 'rgb') return 'rgb(' + rnd(0,255) + ',' + rnd(0,255) + ',' + rnd(0,255) + ')';

            return console.warn('Invalid Coler Format, try "hex" or "rgb"');
        }

        //Return Random Letter In String Num
        return num.rnd();
    }
    if (typeof num == 'object') {
        return num.rnd();
    }
}

/*
    Documentation

        --Create A Simple Div--
        create("div")

        --Give Classes And IDS--
        create("div #id .class")
            -Space Between Attributes
            Other Acceptable Ways To Write
            -id="id"
            -#=id
            -class="class"
        
        --Write InnerHTML--
        create("div>innerHTML");

        ------INPUTS--------
        Add Placeholders
        create("input placeholder=placeholder")
            -placeholderINSERTTEXT (Also acceptable Formating)
        
        Add input Types
        create("input type='checkbox')
            -typeTYPE (Also acceptable Formating)
    
*/
function create(ele,x = null) {
    return document.body.create(ele,x);
}
Object.prototype.create = function(elem,x = null) {
    let all = [];
    let type = false;
    class addition {
        constructor(obj) {
            this.names = obj.names.length ? obj.names : [obj.names];
            this.txt = '';
            this.on = false;
            this.control = obj.control;
            this.fix = obj.fix;
        }
    }
    all.push(new addition({
        names: ['#','id'],
        fix: function(ele) {
            ele.id = this.txt;
        },
    }))
    all.push(new addition({
        names: ['.','class'],
        fix: function(ele) {
            ele.className = this.txt;
        },
    }))
    all.push(new addition({
        names: ['type'],
        fix: function(ele) {
            ele.type = this.txt;
        },
    }))
    all.push(new addition({
        names: ['placeholder'],
        fix: function(ele) {
            ele.placeholder = this.txt;
        },
    }))
    let text = '';


    let element = '';
    let acceptable = [' ','>','.','#'];
    for (let i = 0; i < elem.length; i++) {
        if (elem.charAt(i) !== '<' && !acceptable.includes(elem.charAt(i))) element += elem.charAt(i);
        if (acceptable.includes(elem.charAt(i))) break;
    }
    for (let i = element.length; i < elem.length; i++) {
        let a = elem.charAt(i);

        let ban = ['<',' ','"',"'",'`','='];
        if (!ban.includes(a)) {
            all.forEach((e) => {
                let worked = e.names.length;
                let key = false;
                e.names.forEach((n) => {
                    let pass = true;
                    for (let k = 0; k < n.length; k++) {
                        if (elem.charAt(i+k) !== n.charAt(k)) {
                            pass = false;
                        }
                    }
                    if (!pass) worked--;
                    else key = n;
                });
                if (worked > 0) {
                    i += key.length - 1;
                    for (let j = i+1; j < elem.length; j++) {
                        if (!ban.includes(elem.charAt(j)) && !acceptable.includes(elem.charAt(j))) e.txt += elem.charAt(j);
                        if (acceptable.includes(elem.charAt(j))) {
                            i = j;
                            break;
                        }
                    }
                }
            })

            if(elem.charAt(i-1) == '>') {
                for (let j = i; j < elem.length; j++) {
                    text += elem.charAt(j);
                    i = j;
                }
            }
        }
    }

    let ele = document.createElement(element);
    all.forEach((e) => {
        if (e.txt) e.fix(ele);
    })
    if (text) ele.innerHTML = text;
    if (x !== null) {
    this.insertBefore(ele,this.children[x]);
    } else this.appendChild(ele);
    return ele;
}
/*
    Documentation

    --Repeat From 0 to x--
    repeat(x,(i) => {

    })
        -The Count Of The Loop Is Sent To The Functions Parameter

    --Start At Any Number--
    repeat(firstNum,LastNum,Function);

    --Repeat Through Arrays--
    let array = [1,2,3]
    repeat(array,(child,i) => {

    })
        -The Count of the loop, and the current child is sent to the functions Parameters;

    --Repeat Through Strings--
    let string = "abc"
    repeat(string,(child,i) => {
        
    })

    --Tips--

    -You Can Break a Loop by returning false in your functions

    --Inverting A List--
    Simply add a -1 parameter to the end of the repeat function to go backwards.
    repeat(count,function,-1)
        -You can do any number! It just controls the count of the loop. You can index by 2s and more!


    --Doing A While Loop--
    Setting First Parameter to true will make it iterate forever. Make sure to return false somewhere in the function.
    repeat(true,(iteration) => {

        return false;
    })
        -Iteration is passed to your functions parameters
        
*/
function repeat(count,func,func2,inverse = 1) {
    let startNum;
    let countTo;
    let funct;
    let type = false;
    let isInverse = 1;

    if (func2 && getType(func2) == "function") {
        funct = func2;
        countTo = func;
        startNum = count;
        isInverse = inverse;
    } else {
        startNum = 0;
        funct = func;
        countTo = count;
        if (getType(count) == "array") {
            countTo = count.length;
            type = "array";
        }
        if (getType(count) == "string") {
            countTo = count.length;
            type = "string";
        } 
        if (count === true) {
            type = "while";
        }

        if (func2) isInverse = func2;
    }

    if (type == 'while') {
        let i = 0;
        kill: while(true) {
            let resolve = func(i)
            if (resolve === false) break kill;
            i++;
        }
    } else {
        if (isInverse > 0) {
            kill: for (let i = startNum; i < countTo; i += isInverse) {
                let wontKill = true;

                if (type == "array") wontKill = funct(count[i],i); 
                if (type == "string") wontKill = funct(count.charAt(i),i)
                if (!type) wontKill = funct(i);

                if (wontKill === false) break kill; 
            }
        }
        if (isInverse < 0) {
            kill: for (let i = countTo-1; i > startNum-1; i += isInverse) {
                let wontKill = true;
                if (type == "array") wontKill = funct(count[i],i); 
                if (type == "string") wontKill = funct(count.charAt(i),i)
                if (!type) wontKill = funct(i);

                if (wontKill === false) break kill; 
            }
        }
    }

}
/*
    $MAP Documentation
    Example:
    let map = $MAP(5,5,function(i,j) {
        return i*j;
    });
    Example Written Out
    $MAP(height,width,(i,j) => { 
        let cell = null;
        return cell;
    })

*/
function $MAP(y,x=y,func = function() {return null}) {
    let map = [];
    for (let i = 0; i < y; i++) {
        let toPush = [];
        for (let j = 0; j < x; j++) {
            toPush.push(func(i,j))
        }
        map.push(toPush)
    }
    return map;
}


function s_shuffle(array) {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle...
    while (currentIndex != 0) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }
Array.prototype.shuffle = function() {
    return s_shuffle(this);
}
String.prototype.shuffle = function() {
    let arr = this.split('');
    let cop = '';
    let exp = [];
    for (let i = 0; i < arr.length; i++) {
        let num = rnd(0,arr.length-1,exp);
        let chosen = arr[num];
        exp.push(num)
        cop += chosen;
    }

    return cop;
}


Array.prototype.sum = function() {
    return this.reduce((total,num) => { return total + num; });
}
Array.prototype.avg = function() {
    return this.sum()/this.length;
}
Array.prototype.high = function() {
    return Math.max(...this);
}
Array.prototype.low = function() {
    return Math.min(...this);
}
Array.prototype.median = function () {
    return this.slice().sort((a, b) => a - b)[Math.floor(this.length / 2)];
};
Array.prototype.mode = function() {
    let a = this;
    return Object.values(
    a.reduce((count, i) => {
        if (!(i in count)) {
        count[i] = [0, i];
        }
        
        count[i][0]++;
        return count;
    }, {})
    ).reduce((a, v) => v[0] < a[0] ? a : v, [0, null])[1];
}

function clone(orig) {
    return Object.assign(Object.create(Object.getPrototypeOf(orig)),orig);
}

/*
    Example code:
    slog('.[background: green; color: red;]Hello World'); //Out puts a log that says "Hello World" in red with a green background.
*/
window.slog = function() {
    let final = 'console.log(';
    if (!arguments.length) arguments = [''];
    for (let k = 0; k < arguments.length; k++) {
        let texts = [];
        let addons = [];
        let text = '';
        let prev = false;
        let txt = arguments[k] + '';
        if (txt !== '<br>') {
            for (var i = 0; i < txt.length; i++) {
                if (txt.charAt(i) == '.' && txt.charAt(i + 1) == '[') {
                    if (prev) {
                        texts.push(text);
                        text = '';
                    }
                    i += 2;
                    let add = '';
                    for (var j = i; j < txt.length; j++) {
                        if (txt.charAt(j) == ']') {
                            addons.push(add);
                            i = j;
                            j = txt.length;
                        } else {
                            add += txt.charAt(j);
                        }
                    }
                    prev = true;
                } else {
                    text += txt.charAt(i);
                }
            }
            texts.push(text);
            if (addons.length > 0) {
                for (var i = 0; i < texts.length - k; i++) {
                    final += ' "%c' + texts[i] + '" +';
                }
            } else if (k > 0) {
                final += "'" + texts + "''";
            } else {
                final += "'" + texts + "''";
            }
            final = final.substring(0, final.length - 1);
            final += ',';
            for (var i = 0; i < addons.length; i++) {
                final += ' "' + addons[i] + '",';
            }   
            final = final.substring(0, final.length - 1);
            final += ',';
        } else {
            final += `"<br>",`;
        }
    }
    final = final.substring(0,final.length - 1) + ')';
    eval(final);
}
sloglibrary = function(v,n,c) {
slog('.[background: lightgreen; font-weight: bold; font-size: 14px; color: black]V' + v + ' Library .[background: lightgreen;font-weight: bold; font-size: 20px; color: black]' + n + '.[background: lightgreen;font-weight: bold; font-size: 14px; color: black] ' + c);
}
slogplugin = function(v,n,c) {
    slog('.[background: lightyellow; color: black;font-weight: bold; black;font-size: 14px]V' + v + ' Plugin .[background: lightyellow;font-weight: bold;color: black; font-size: 20px]' + n +'.[background: lightyellow;color: black;font-weight: bold; font-size: 14px] ' + c);
}
let includesString = "-Simple Includes: ";
slogIncludes = function(text) {
    slog(`.[font-size: 12px; background: silver; color: black;]${text}`)
}

sloglibrary(15.1,'Simple','JoeTheHobo');






/*
LS Version 3

Localstorage! LS object
ls.save(name, value)  -  Save any value (arrays, objects, numbers, strings) to a given name.
ls.get(name, result)  -  Returns the value of the name given, and if it can't find anything returns result.
ls.clear()  -  Deletes all items.
ls.delete(name)  -  Deletes that one item with given name.
ls.log()  -  Logs all the items in your Localstorage.
*/

window.ls = {
    uniqueID: false,
    setID: function(id) {
        ls.uniqueID = id;
    },
    save: function(saveName,whatToSave) {
        let add = ls.uniqueID ? "/ui/" + ls.uniqueID + "/ui/" : "";
        localStorage.setItem(add + saveName,JSON.stringify(whatToSave))
    },
    get: function(saveName,elseReturn = false,byPass) {
        let add = ls.uniqueID ? "/ui/" + ls.uniqueID + "/ui/" : "";
        if (byPass) add = "";
        
        if (localStorage.getItem(add+saveName) == null || localStorage.getItem(add+saveName) == undefined) return elseReturn;
        else if (localStorage.getItem(add+saveName) == "undefined") return undefined;
        else return JSON.parse(localStorage.getItem(add+saveName));
    },
    clear: function(deleteAll = false) {
        if (deleteAll) localStorage.clear();
        else {
            if (ls.uniqueID) {
                repeat(Object.keys(localStorage),(name,i) => {
                    if (name.includes("/ui/" + ls.uniqueID + "/ui/")) {
                        ls.delete(name,true)
                    }
                })
            } else
                console.warn("Local Storage: No uniqueID set, to delete all cookies write ls.clear(true), or set UniqueID by writing ls.setUniqueID(yourID)");
        }
    },
    delete: function(saveName,byPass) {
        let add = ls.uniqueID ? "/ui/" + ls.uniqueID + "/ui/" : "";
        if (byPass) add = "";
        localStorage.removeItem(add + saveName);
    },
    log: function(logAll = false) {
        if (!logAll) 
            if (ls.uniqueID) logAll = false;

        logAll ? slog(".[background:white;color:black;font-size:15px]LS is Logging All Storages") : slog(".[background:white;color:black;font-size:15px]LS is Logging '" + ls.uniqueID + "' Storage");
        
        if (logAll) {
            let groups = ls.getArrayOfMe();
            repeat(groups,(group,i) => {
                slog(`.[font-weight: bold;color:black;background:silver;font-size:10px]In Storage '${group.name}':`);
                repeat(group.storage,(obj,j) => {
                    console.log(obj.key + ": ",obj.value)
                })
            })
        } else {
            repeat(localStorage,(item,i) => {
                if (Object.keys(localStorage)[i].includes("/ui/" + ls.uniqueID + "/ui/")) {
                    console.log(Object.keys(localStorage)[i].split("/ui/" + ls.uniqueID + "/ui/")[1] + ": ", ls.get(Object.keys(localStorage)[i],false,true))
                }
            })
    
        }
    },
    facts: function() {
        let groups = ls.getArrayOfMe();

        var _lsTotal = 0,
            _xLen, _x;
        for (_x in localStorage) {
            if (!localStorage.hasOwnProperty(_x)) {
                continue;
            }
            _xLen = ((localStorage[_x].length + _x.length) * 2);
            _lsTotal += _xLen;
            let newObj = {
                key: _x.substring(0, 50),
                value: (_xLen / 1024).toFixed(2),
            }
            let within = false;
            if (newObj.key.includes("/ui/")) {
                within = newObj.key.split("/ui/")[1];
                newObj.key = newObj.key.split("/ui/")[2];
                
            }

            repeat(groups,(group,i) => {
                if (within && group.name !== within) {
                    return;
                }
                repeat(group.storage,(obj,j) => {
                    if (obj.key == newObj.key) {
                        obj.space = (_xLen / 1024).toFixed(2);
                        group.space += Number((_xLen / 1024).toFixed(2));
                    }
                })
            })
        };

        let TotalUsed = (_lsTotal / 1024).toFixed(2);
        let percent = Math.round((TotalUsed / 5000)*10000)/100;



        slog(".[background:white;color:black;font-size:15px]--LS FACTS--")
        slog("Total Storage: 5000 KB");
        slog("Total Used: " + TotalUsed + " KB (" + percent + "%)");
        repeat(groups,(group,i) => {
            slog(`.[font-weight: bold;color:black;background:silver;font-size:12px]Storage '${group.name}' uses ${group.space.toFixed(2)} KB:`);
            repeat(group.storage,(obj,j) => {
                console.log(obj.key + ": " + obj.space + " KB")
            })
        })
    },
    getArrayOfMe: function() {
        let groups = [{name:"General Storage",storage:[],space:0}];
        repeat(localStorage,(item,i) => {
            if (!Object.keys(localStorage)[i].includes("/ui/")) {
                groups[0].storage.push({
                    key: Object.keys(localStorage)[i],
                    value: ls.get(Object.keys(localStorage)[i],false,true),
                    space: 0,
                })
            } else {
                let foundGroup = false;
                let keyName = Object.keys(localStorage)[i].split("/ui/")[1]
                repeat(groups,(obj,i) => {
                    if (obj.name == keyName) foundGroup = i;
                })
                if (!foundGroup) {
                    groups.push({
                        name: keyName,
                        storage: [
                            {
                                key: Object.keys(localStorage)[i].split("/ui/")[2],
                                value: ls.get(Object.keys(localStorage)[i],false,true),
                                space: 0,
                            }
                        ],
                        space: 0,
                    })
                } else {
                    groups[foundGroup].storage.push(
                        {
                            key: Object.keys(localStorage)[i].split("/ui/")[2],
                            value: ls.get(Object.keys(localStorage)[i],false,true),
                            space: 0,
                        }
                    )
                }
            }
        })
        return groups;
    },
}
includesString += 'Local Storage V3';




/*
    ProTimer
    -Set Timers, Stop Timers
*/

class Timer {
    constructor() {
        this.times = [];
        this.laps = [];
        this.average = 0;
    }
    start = function() {
        this.times = [];
        this.laps = [];

        let timeNow = new Date();
        this.laps.push(timeNow.getTime());
    }
    lap = function(log) {
        let timeNow = new Date();
        this.times.push(timeNow.getTime() - this.laps[this.laps.length-1]);
        this.laps.push(timeNow.getTime());
        if (log) console.log("Lap: " + (this.laps.length-1) + ":",this.times[this.times.length-1],"ms")
        return this.times;
    }
    stop = function(log) {
        let timeNow = new Date();
        this.times.push(timeNow.getTime() - this.laps[this.laps.length-1]);
        if (log) console.log("Lap: " + this.laps.length + ":",this.times[this.times.length-1],"ms")
        return this.times;
    }
    
}

includesString += ', proTimer V1';









slogIncludes(includesString)