```                     __                    _     
/\_/\__ _ _ __ _ __ / _\_      ___   _ ___| |__  
\_ _/ _` | '__| '_ \\ \\ \ /\ / / | | / __| '_ \ 
 / \ (_| | |  | | | |\ \\ V  V /| |_| \__ \ | | |
 \_/\__,_|_|  |_| |_\__/ \_/\_/  \__,_|___/_| |_|
                                                 
```
# YARNSwush
#### Yarnswush will help you switch to [Yarn](https://yarnpkg.com/) from using [Npm](http://npmjs.com/) by subsituting you npm commands for yarn alternatives. 

Cases where it can be helpful are
- Copying and pasting NPM commands from a website to a terminal and running it with Yarn.
 
## Installing
If you are using BASH
```bash
$ yarn global add yarnswush

```
Then run any npm command. eg. `npm i keypress`;
![preview](preview.gif)


It currently covers 
- npm install :- save and save dev.
- npm uninstall :- 
- npm global install 
- npm global uninstall
- npm run 
- npm 

## Uninstalling
After `yarn global remove yarnswush`, Remove this line from your `~/.bashrc ` if you are using Bash, `~/.zshrc ` if you are using ZSH. 
- *This might not be necessary. The postuninstall script takes care of removing this line for these files.*
```
npm () { yarnswush "$@"; }
```


## Testing
I use [Jest](https://jestjs.io/docs/en/getting-started). I wrote this TDD style baby. Saved me writing unnecessary code. 
Install yarn globally and run Jest
```
$ yarn global add jest
$ jest ./index.test.js
```

## Changelog
- v1.2.1
  - Fixed bash function in .bashrc file
- v1.2.0
  - Postuninstall script removes yarnswush from shell files.
  - Fix Ctrl + k to use NPM command instead.