![alt tag](https://travis-ci.com/Soldy/confrc.svg?branch=master)


# confrc
Independent, simple, dependency less, config manager.


## config format 
```
{
   'config':'value'
}

```

##init
```javascript

const confrc = new (require('./index.js')).confrc();
```

## check if config exist
```javascript
confrc.check('someConfig')
```

## config read
```javascript
let someConfig = copnfrc.get('comeConfig');

```



## more example
```javascript

const confrc = new (require('./index.js')).confrc();

if(!confrc.check('someConfig')){
    process.exit(5); 
};
let someConfig = copnfrc.get('comeConfig');

```

