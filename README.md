# pnc-js-libs

library at the moment mainly process pnc notifications
- pnc-dto-types - module clones pnc and build pnc/rest-api module to get pnc-openapi.json 
                  specification using generate-openapi-spec.sh script and transform it to index.d.ts using dtsgen command
- pnc-messagebus-client - code base for messagebus and notification processing
- umd-bundle - conversion from typescript to javascript

## Prerequisites

- locall instalation of **Node** and **npm**

## Build project
- git clone <repository> pnc-js-libs
- cd pnc-js-libs
- npm install

- npm run build
  - generate up-to-date TypeScript type file based on the latest OpenAPI file, output: pnc-dto-types/index.d.ts
  - run tests available in pnc-messagebus-client/
  - transpile TypeScript to JavaScript, output: umd-bundle/dist/pnc-js-libs.js (it's accessible via bower.json main property)

## Release
- we're using bower as package manager in main ui project that's using this library, it's 
  enough to create signed tag in github and new version will be picked up by bower
