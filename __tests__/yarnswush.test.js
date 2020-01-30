

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
  'npm i jquery --save',
  'npm i @vue/cli -g',
]
test("yarn add when :-> i and --save-dev", () => {

  const runYarnswish = Yarnswush().run(testNpmCommands[0].split(" "))
  console.log(runYarnswish)
  expect(runYarnswish).to.include(`add`)
  expect(runYarnswish).to.include(`-D`)
})

test("yarn global")

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
