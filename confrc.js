/*
 *  @Soldy\confrc\2021.02.04\GPL3
 */
'use strict';
const fs = require('fs');
require('theuniverse');
const $universe = global.theUn1v3rse.controls.interface();
const $clonerc = new (require('clonerc')).base();


/*
 * @param {string}
 * @private
 * @return {object}
 *
 */
const _jsonProcess=function(file){
    if(!fs.existsSync(file))
        return false;
    return JSON.parse(
        fs.readFileSync(file).toString()
    );
};
/*
 * @param {string}
 * @private
 * @return {object}
 *
 */
const _envProcess=function(file){
    if(!fs.existsSync(file))
        return false;
    let config = {};
    for(let line of (fs.readFileSync(file)).toString().split(/\r\n|\n/)){
        let data = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
        if (data === null)
            continue;
        let name = data[1].trim();
        let value = data[2].trim();
        let end = value.length-1;
        if(
            (value[0] === '"' && value[end] === '"')||
            (value[0] === '\'' && value[end] === '\'')
        )
            value = value.substring(1, end).toString();
        else if(parseInt(value).toString() === value)
            value = parseInt(value);

        _envLevels(name, value, config);
    }
    return config;
};

const _envPush=function(config){
    for (let id in config)
        process.env[id.toString()] = $clonerc.faster(
            config[id]
        );
}

const _envLevels = function(env_leveled, value envs){
    let levels = env_leveled.split('_');
    let level = 0;
    for(let i of levels){
        level++ ;
        let env = envs[i];
        if(typeof env === 'undefined')
            env = {};
        if(level === levels.lengh)
            env = $clonerc.faster(
                value
            );
    }
}

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
        _toConfig(
            _jsonProcess('env.confrc.default.json')
        );
    };
    /*
     *@private
     */
    const _readDotEnv=function(){
        _toConfig(
            _envProcess('env')
        );
    };
    /*
     *@private
     */
    const _readLocalDotEnv=function(){
        _setConfig(
            _envProcess('.env')
        );
    };
    /*
     *@private
     */
    const _readLocal=function(){
        _setConfig(
            _jsonProcess('.env.confrc.json')
        );
        // We do not throw if the user config not exist
    };
    const _toConfig=function(config){
        if(config === false)
            return false;
        for(let name in config)
            _config[name]=$clonerc.faster(
                config[name]
            );
    };
    const _setConfig=function(config){
        if(config === false)
            return false;
        for(let id in config)
            if(typeof _config[id] !== 'undefined')
                _config[id]=$clonerc.faster(
                    config[id]
                );

    };
    /*
     * @private
     * @return {object}
     */
    const _getAll=function(){
        let out = {};
        for (let id in _config)
            out[id.toString()] = $clonerc.faster(
                _config[id]
            );
        return out;
    }
    /*
     * @param {string} id
     * @param {string} value
     * @private
     * @return {any}
     */
    const _get=function(id, value){
        if(_check(id))
            return $clonerc.faster(
                _config[id]
            );
        if (typeof value !== 'undefined')
            return value;
        throw $universe.error(
            Error('ConfRc Value "'+value+'" is undefined')
        );
    };
    /*
     * @param {string} id
     * @private
     * @return {boolean}
     */
    const _check=function(id){
        if(typeof id !== 'string')
            throw $universe.error(
                TypeError(
                   'ConfrC Id expectd as a string but is a '+
                   (typeof id).toString()
                 )
            );
        if(typeof _config[id] !== 'undefined')
            return true;
        return false;
    };
    /*
     * @private
     * @var object
     */
    let _config = {};
    //costructor
    _readDotEnv();
    _readDefault();
    _readLocalDotEnv();
    _readLocal();
    _envPush(
        _getAll()
    );
};

exports.base = confrcBase;

