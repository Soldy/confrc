
# confrc
Independent, simple, dependency less, config manager.


## config format 
```
{
   'config':'value'
}

```

## init
```javascript

const confrc = new (require('confrc')).confrc();
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

const confrc = new (require('confrc')).confrc();

if(!confrc.check('someConfig')){
    process.exit(5); 
};
let someConfig = confrc.get('someConfig');

```

