# Scratchboard
An electron based salesforce scratch org manager.

# Setup
`yarn install`

# Dependencies
both `sfdx` will need to be available on the command line.

# Commands
Run in dev mode: `yarn run dev`\
Build app: `yarn run dist`

# Recommended Reading
Electron: https://electronjs.org/docs <br/>
Electron-Webpack: https://webpack.electron.build/development

Particularly the difference between the main and renderer process is nice to know

React: https://reactjs.org/docs/getting-started.html
Blueprint UI Core: https://blueprintjs.com/docs/#core

Redux: https://redux.js.org/introduction/getting-started
React-Redux: https://react-redux.js.org/using-react-redux/connect-mapstate

# Tips
@ is an import alias for the top level of either main or renderer depending on which you our in
common is an import alias for src/common