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
Release process:
 1) Create & checkout version branch (2.0.0 for example)
 2a) npx lerna version 2.0.0 --no-git-tag-version --no-push --force-publish
 2b) Manually update root package.json version
 3) npm run build
 4) Commit all changes and raise a PR
 5) After merging the PR pull the changes locally
 6) Tag the release with a semver compatible version (for example v2.0.0)
 7) git push upstream --tags

 8) (Not doing right now) npm publish
