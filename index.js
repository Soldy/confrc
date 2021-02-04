/*
 *  @Soldy\confrc\2021.02.04\GPL3
 */
'use strict';
const fs = require('fs');

/*
 * @prototype
 */
const confrcBase=function(){
    /*
     * @param {string} id
     * @public
     * @return {mixed}
     */
    this.get=function(id){
        if(typeof id !== 'string')
            return false;
        if(typeof config[id] === 'undefined')
            return undefined;
        if(typeof process.env[id] === 'undefined')
            return config[id];
        return process.env[id];
    };
    /*
     * @param {string} id
     * @public
     * @return {boolean}
     */
    this.check=function(id){
        if(
            (typeof id !== 'string')||
            (typeof config[id] !== 'undefined')
        )
            return true;
        return false;
    };
    /*
     * @private
     */
    const readDefault=function(){
        config = JSON.parse(
            fs.readFileSync('env.confrc.default.json').toString()
        );
    };
    /*
     *@private
     */
    const read=function(){
        try{
            let standConfig = JSON.parse(
                fs.readFileSync('.env.confrc.json').toString()
            );
            for(let i in standConfig)
                if(typeof config[i] !== 'undefined')
                    config[i]=standConfig[i];
        }catch(e){
            console.log(e);
        }
    };
    /*
     * @private
     * @var object
     */
    let config = {};
    //costructor
    readDefault();
    read();
};

exports.base = confrcBase;

