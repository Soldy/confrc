/*
 *  @Soldy\confrc\2021.02.04\GPL3
 */
'use strict';
const fs = require('fs');
require('theuniverse');
const $universe = global.theUn1v3rse.controls.interface();
const $clonerc = new (require('clonerc')).base();

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
        return _get(id, value);
    };
    /*
     * @param {string} id
     * @public
     * @return {boolean}
     */
    this.check=function(id){
        return _check(id);
    };
    /*
     * This is part of the boot process ...
     * Have to be Sync
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
    const _readEnv=function(){
        let config = {};
        for(let line of (fs.readFileSync('.env')).split(/\r\n|\n/)){
            let data = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
            if (data === null)
                continue;
            let name = data[0].trim();
            let value = data[1].trim();
            let end = val-1;
            if(
                (value[0] === '"' && value[end] === '"')&&
                (value[0] === '"' && value[end] === "'")
            )
                value = value.substring(1, end));
            if(typeof _config[name] !== 'undefined')
                _config[name]=$clonerc.faster(
                     value
                );
        }
    }
    /*
     *@private
     */
    const _readLocal=function(){
        try{
            let standConfig = JSON.parse(
                fs.readFileSync('.env.confrc.json').toString()
            );
            for(let id in standConfig)
                if(typeof _config[id] !== 'undefined')
                    _config[id]=$clonerc.faster(
                        standConfig[id]
                    );
        }catch(e){
            // We do not throw if the user config not exist
            $universe.error(e);
        }
    };
    /*
     * @param {string} id
     * @param {string} value
     * @private
     * @return {mixed}
     */
    const _get=function(id, value){
        if(_check(id))
            return $clonerc.faster(
                _config[id]
            );
        if (typeof value !== 'undefined')
            return value;
       throw $universe.error(
           Error('ConfRc Value is undefined')
       );
    }
    /*
     * @param {string} id
     * @private
     * @return {boolean}
     */
    const _check=function(id){
        if(typeof id !== 'string')
            throw $universe.error(
                TypeError('ConfrC Id expectd as a string')
            );
        if(typeof _config[id] !== 'undefined')
            return true;
        return false;
    }
    /*
     * @private
     * @var object
     */
    let _config = {};
    //costructor
    _readDefault();
    _readEnv();
    _readLocal();
};

exports.base = confrcBase;

