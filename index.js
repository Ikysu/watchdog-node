#!/usr/bin/env node

const { exec } = require('child_process');

// Load cmd args
var args = {}
process.argv.join(" ").split("--").slice(1).forEach(arg => {
    var arr = arg.split(" ")
    var out = true;
    if(arr.length>1) out = arr.slice(1).join(" ")
    args[arr[0]]=out
});

if(!args.script) args.script = "run"
if(!args.wait) args.wait = 10000
if(!args.cmd) args.cmd = false

function init(){
    const child = exec('node '+args.script);

    child.on('exit', function (code, signal) {
        if(args.cmd) console.log("("+new Date().toLocaleString()+") ["+args.script+"] Restart");
        setTimeout(init, +args.wait)
    });
}

init()