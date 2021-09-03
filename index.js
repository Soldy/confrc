/*
 *  @Soldy\confrc\2021.02.04\GPL3
 */
'use strict';
if(typeof  global.theUn1v3rse === 'undefined')
    require('theuniverse');
const $universe = global.theUn1v3rse.controls.interface();


if(!$universe.baseCheck('confrc')){
    const $confrc = new (require('./confrc.js')).base();
    $universe.baseAdd('confrc', $confrc);
}

exports.base = $universe.baseGet('confrc');

