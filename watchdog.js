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

function init(){
    const child = exec('node '+args.script);

    child.on('exit', function (code, signal) {
        console.log("["+args.script+"] Restart");
        setTimeout(init, args.wait)
    });
}

init()