const fs = require("fs");



exports.confrc=function(){
    let readDefault=function(){
        config = JSON.parse(fs.readFileSync("env.confrc.default.json").toString());
    };
    let read=function(){
        try{
            let standConfig = JSON.parse(
                fs.readFileSync(".env.confrc.json").toString()
            );
            for(let i in standConfig)
                if(typeof config[i] !== "undefined")
                    config[i]=standConfig[i];
        }catch(e){
            console.log(e);
        }
    };
    this.get=function(id){
        if(typeof config[id] === "undefined")
            return undefined;
        return config[id];
    };
    this.check=function(id){
        if(typeof config[id] !== "undefined")
            return true;
        return false;
    }
    var config = {};
    readDefault();
    read();
};


