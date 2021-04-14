const nanoTest  = new (require("nanoTest")).test();
const confrc = new (require('./index.js')).base();


nanoTest.add(
    "check test1 ",
    {
        "function":confrc.check,
        "options":['test1']
    },
    "===",
    true
);

nanoTest.add(
    "check test2 ",
    {
        "function":confrc.check,
        "options":['test2']
    },
    "===",
    true
);

nanoTest.add(
    "check test3 ",
    {
        "function":confrc.check,
        "options":['test3']
    },
    "===",
    true
);

nanoTest.add(
    "check test4 ",
    {
        "function":confrc.check,
        "options":['test4']
    },
    "===",
    true
);

nanoTest.add(
    "check test5 ",
    {
        "function":confrc.check,
        "options":['test5']
    },
    "===",
   false 
);

nanoTest.add(
    "get test1 ",
    {
        "function":confrc.get,
        "options":['test1']
    },
    "===",
    "1"
);

nanoTest.add(
    "get test2 ",
    {
        "function":confrc.get,
        "options":['test2']
    },
    "===",
    2
);

nanoTest.add(
    "get test3 ",
    {
        "function":confrc.get,
        "options":['test3']
    },
    "===",
    "3b"
);

nanoTest.add(
    "get test4 ",
    {
        "function":confrc.get,
        "options":['test4']
    },
    "===",
    40 
);

nanoTest.add(
    "get test5 ",
    {
        "function":function(){
            try{
                confrc.get('test5');
            }catch(err){
                return err;
            }
        },
        "options":['test5']
    },
    "!==",
    1
);
nanoTest.run();
