
CyStoreScaffold
====================
A quick start scaffold project for creating CyStores for the CyFramework. This project requires that npm be installed globally on the development machine.

How to bootstrap a new project
-----------------------------
Use the setup script in the directory to convert the scaffold into your project (it will delete itself upon finishing setup).
```
git clone https://github.com/CyComponent/CyStoreScaffold.git
cd CyStoreScaffold && chmod +x setup.sh
./setup.sh

```

####Contains:
- Redux
- Webpack
- Babel (es6 supported!)
- ESLint
- Jest
- Travis

Commands
--------
```
npm run build - Build the store into /build
npm run clean - Remove anything in /build
npm run lint - Run eslint, will not cause npm to exit with an error
npm run test - Run eslint followed by jest, may cause npm to exit with an error (for travis)
npm run coverage - Run jest's coverage tool
```
