const fs = require("fs");



exports.confrc=function(){
    /*
     * id @string
     * @public
     */
    this.get=function(id){
        if(typeof id !== "string")
            return false;
        if(typeof config[id] === "undefined")
            return undefined;
        return config[id];
    };
    /*
     * id @string
     * @public
     */
    this.check=function(id){
        if((typeof id !== "string") ||(typeof config[id] !== "undefined"))
            return true;
        return false;
    }
    /*
     * @private
     */
    let readDefault=function(){
        config = JSON.parse(fs.readFileSync("env.confrc.default.json").toString());
    };
    /*
     *@private
     */
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
    /*
     * @private
     */
    let config = {};
    //costructor
    readDefault();
    read();
};


