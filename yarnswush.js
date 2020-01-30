
/**
 * Prepares a valid yarn command from
 * the npm command supplied.
 * Replaces options and paramters with Yarn 
 * equivalents
 */
function yarnInstallCmd (args) {
  const hasDev = isSaveDev(args) ? ` -D ` : ''
  return `yarn add ${hasDev}` + cleanUpCmd(args).join(" ")
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

function isRemove(args) {
  return args.find((arg, index) => {
    return arg === `uninstall`
  })
}
/**
 * Removes any known npm command options and parameters. 
 */
function cleanUpCmd (args) {
  const badNpmCmds = ['add', 'uninstall', 'i', 'install', '--save-dev', 'save', '-g', 'npm']
  const goodYarn = []
  args.forEach((arg) => {
    if (badNpmCmds.indexOf(arg) === -1) {
      goodYarn.push(arg)
    }
  })
  return goodYarn
}



function Yarnswush () {
  return {
    run: (processArgs) => {
      if (isInstall(processArgs)) {
        return yarnInstallCmd(processArgs)
      }
      if (isRemove(processArgs)) {
        return 
      }
    }
  }
}

module.exports = Yarnswush

