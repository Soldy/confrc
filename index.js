/*
 *  @Soldy\confrc\2021.02.04\GPL3
 */
'use strict';
const fs = require('fs');
require('theuniverse');
const $universe = global.theUn1v3rse.controls.interface();

/*
 * @prototype
 */
const confrcBase=function(){
    /*
     * @param {string} id
     * @public
     * @return {mixed}
     */
    this.get=function(id, value){
        if(typeof id !== 'string')
            return $univers.error(
                TypeError('ConfrC Id expectd as a string')
            );
        if(typeof _config[id] === 'undefined'){
            if (typeof value === 'undefined')
                return $universe.error(
                     Error('ConfRc Value is undefined')
                );
            return value
        }
        if(typeof process.env[id] === 'undefined')
            return _config[id];
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
            (typeof _config[id] !== 'undefined')
        )
            return true;
        return false;
    };
    /*
     * @private
     */
    const _readDefault=function(){
        _config = JSON.parse(
            fs.readFileSync('env.confrc.default.json').toString()
        );
    };
    /*
     *@private
     */
    const _read=function(){
        try{
            let standConfig = JSON.parse(
                fs.readFileSync('.env.confrc.json').toString()
            );
            for(let i in standConfig)
                if(typeof _config[i] !== 'undefined')
                    _config[i]=standConfig[i];
        }catch(e){
            console.log(e);
        }
    };
    /*
     * @private
     * @var object
     */
    let _config = {};
    //costructor
    _readDefault();
    _read();
};

exports.base = confrcBase;

