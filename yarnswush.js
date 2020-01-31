const ora = require('ora');
const chalk = require('chalk');
const { spawn } = require("child_process");

/**
 * Prepares a valid yarn command from
 * the npm command supplied.
 * Replaces options and paramters with Yarn 
 * equivalents
 */
function yarnInstallCmd (args) {
  const hasDev = isSaveDev(args) ? ` -D ` : ''
  return `yarn add ${hasDev} ` + cleanUpCmd(args).join(" ")
}

/**
 * Globally install package using yarn instead of npm
 */
function yarnGlobalInstallCmd (args) {
  return `yarn global add ` + cleanUpCmd(args).join(" ")
}

/**
 * Replaces the npm command to remove a package locally
 */
function yarnRemoveCmd(args) {
  return `yarn remove ` + cleanUpCmd(args).join(" ")
}

/**
 * Replaces the npm command to remove a package globally
 */
function yarnGlobalRemoveCmd(args) {
  return `yarn global remove ` + cleanUpCmd(args).join(" ")
}

function yarnRunCmd(args) {
  return `yarn run ` + cleanUpCmd(args).join(" ")
}

function isInstall(args) {
  return args.find((arg, index) => {
    return arg === `i` || arg === `install` || arg === `add`
  })
}

function isSaveDev(args) {
  return args.find((arg) => {
    return arg === `-D` || arg === `--save-dev`
  })
}
function isRun(args) {
  return args.find((arg) => {
    return arg === `run`
  })
}
/**
 * Checks if this global install
 */
function isGlobal(args) {
  return args.find((arg) => {
    return arg === `-g` || arg === `--global`
  })
}

/**
 * Checks if the command is an NPM remove 
 * command
 */
function isRemove(args) {
  const removeAlias = [`remove`, `rm`, `r`, `un`, `unlink`, `uninstall`]
  return args.find((arg) => {
    return removeAlias.indexOf(arg) > -1
  })
}

function isBin(args) {
  return args.find((arg) => {
    return arg === `bin`
  })
}

function yarnOtherCmd(args) {
  return `yarn ` + cleanUpCmd(args).join(" ")
}


/**
 * Removes any known npm command options and parameters. 
 */
function cleanUpCmd (args) {
  const badNpmCmds = [
    `remove`,
    `run`,
    `rm`,
    `r`,
    `un`,
    `unlink`,
    "add",
    "uninstall",
    "i",
    "install",
    "--save-dev",
    "save",
    "-g",
    "npm"
  ];
  const goodYarn = []
  args.forEach((arg) => {
    if (badNpmCmds.indexOf(arg) === -1) {
      goodYarn.push(arg)
    }
  })
  return goodYarn
}

/**
 * Returns the yarn equivalent of the NPM command 
 * you want to run. It would return the original 
 * NPM command if it can't find a Yarn alternative
 * @param {*} processArgs arguments sent from the command line
 */
function processArgs (processArgs) {
  if (isInstall(processArgs)) {
    if (isGlobal(processArgs)) {
      return yarnGlobalInstallCmd(processArgs)
    }
    return yarnInstallCmd(processArgs)
  }

  if (isRemove(processArgs)) {
    if (isGlobal(processArgs)) {
      return yarnGlobalRemoveCmd(processArgs)
    }
    return yarnRemoveCmd(processArgs)
  }

  if(isRun(processArgs)) {
    return yarnRunCmd(processArgs)
  }

  if(isBin(processArgs)) {
    return yarnOtherCmd(processArgs)
  }

  return processArgs.join(" ")
}

function timeoutUserPref (cmd, cb) {
  const spinner = ora({
    text: `Switching to Yarn:: ${chalk.green(cmd)} ` + ` . Press CTRL + C to use NPM instead in 3 secs`,
    color: "red"
  }).start();
  setTimeout(() => {
    spinner.color = 'green';
    spinner.text = `Running ${cmd}`;
    cb(spinner)
  }, 3000);
  return spinner
}



function Yarnswush () {
  return {
    run: function (cmdArgs) {
      const yarnCmd = processArgs(cmdArgs)
      timeoutUserPref(yarnCmd, (spinner) => {
        spinner.stop()
        const child = spawn(yarnCmd, {
          cwd: process.cwd(),
          detached: true,
          stdio: "inherit",
          shell: true
        })
        if (child.stdout) {
          child.stdout.setEncoding('utf8');
          child.stdout.on('data', function(data) {
              //Here is where the output goes
              console.log('stdout: ' + data);
          });
  
          child.stderr.setEncoding('utf8');
          child.stderr.on('data', function(data) {
              //Here is where the error output goes
              console.log('stderr: ' + data);
          });
        }

        child.on('close', function(code) {
            //Here you can get the exit code of the script
            console.log('Thank you for using Yarnswush' );
        });
      })
    },
    processArgs
  }
}

module.exports = Yarnswush

