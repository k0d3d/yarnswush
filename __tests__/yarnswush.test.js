

// get the arguments passed from bash alias 
// npm install --save "reactstrap"
// execute a shell command 
// node ~/yarnswitch.js $1 $2...$n

// yarnswitch
const expect = require('chai').expect
const Yarnswush = require("../yarnswush")
// reads arguments from shell
const testNpmCommands = [
  'npm i @vue/cli-plugin-eslint --save-dev',
  'npm i eslint -g',
  'npm uninstall jquery --save',
  'npm rm @vue/cli --global',
  'npm run test',
]
test("yarn add when :-> i or --save-dev", () => {

  const runYarnswish = Yarnswush().processArgs(testNpmCommands[0].split(" "))
  expect(runYarnswish).to.include(`add`)
  expect(runYarnswish).to.include(`-D`)
})

test("yarn global when :- -g or --global", () => {
  const runYarnswish = Yarnswush().processArgs(testNpmCommands[1].split(" "))
  expect(runYarnswish).to.include(`yarn global add `)  
  expect(runYarnswish).to.include(`global`)  
})

test("yarn remove when :-> uninstall or remove, rm, r, un, unlink", () => {
  const runYarnswish = Yarnswush().processArgs(testNpmCommands[2].split(" "))
  expect(runYarnswish).to.include('remove')
})

test("remove global when :-> -g or --global and uninstall and aliases", () => {
  const runYarnswish = Yarnswush().processArgs(testNpmCommands[3].split(" "))
  expect(runYarnswish).to.include(`global`)
  expect(runYarnswish).to.include(`remove`)
})

test("yarn run when :-> run", () => {
  const runYarnswish = Yarnswush().processArgs(testNpmCommands[4].split(" "))
  expect(runYarnswish).to.include(`yarn run`)
})

// just use a switch statement and a few
//    conditional functions to figure out which yarn command to run
// replace the argments with the alternative yarn command to run 
// run count down. 
//     show countdown timer and cancel option
// if cancel key combo
//  // use quoted-insert,
//      cancel and run npm instead
// run command
//      // prolly use a child shell or something like that    
