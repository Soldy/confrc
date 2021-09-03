
# confrc
Independent, simple, universe compatible, config manager.


## config format 
```
{
   'config':'value'
}

```

## init
```javascript

const confrc = require('confrc').base;
```

## check if config exist
```javascript
confrc.check('someConfig')
```

## config read
```javascript
let someConfig = confrc.get('someConfig');

```



## more example
```javascript

const confrc = require('confrc')).confrc;

if(!confrc.check('someConfig')){
    process.exit(5); 
};
let someConfig = confrc.get('someConfig');

```

