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
        if(
            (typeof id !== 'string')||
            (typeof _config[id] !== 'undefined')
        )
            return true;
        return false;
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
    const _read=function(){
        try{
            let standConfig = JSON.parse(
                fs.readFileSync('.env.confrc.json').toString()
            );
            for(let i in standConfig)
                if(typeof _config[i] !== 'undefined')
                    _config[i]=standConfig[i];
        }catch(e){
            // We do not throw if the user cinfig not exist
            $universe.error(e);
        }
    };
    /*
     * @param {string} id
     * @private
     * @return {mixed}
     */
     const _get = function(id, value){
        if(typeof id !== 'string')
            throw $universe.error(
                TypeError('ConfrC Id expectd as a string')
            );
        if(typeof _config[id] === 'undefined'){
            if (typeof value === 'undefined')
                throw $universe.error(
                     Error('ConfRc Value is undefined')
                );
            return value
        }
        if(typeof process.env[id] === 'undefined')
            return $clonerc.faster(
                _config[id]
            );
        return $clonerc.faster(
            process.env[id]
        );
    }
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

