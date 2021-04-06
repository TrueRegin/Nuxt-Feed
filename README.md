# Setup
1. Run `yarn install` or `npm install` if you don't have yarn to install the build dependencies in the root folder.
2. Run `yarn install-all` or `npm run install-all` if you don't have yarn. This will install all the dependencies of the project you want.

That's literally it, so go develop whatever the heck you want after you do that.

# FullStack-Website-Template
A template for creating full deployment ready websites.

Comes bundled with Nuxt and NestJS. Designed for any client/server connection of projects however. Consider this a monorepo.

Here's some of the capabilities this template can make easy.
1. Running a server and client at the same time
2. Changing the server url for development and production mode.
3. Combining the client and server together to create a distribution folder.

#### Please note...
if you are starting from new and you run into errors importing `client_config.ts` or `server_config.ts` you need to add `./tsconfig.json` to the references in `./client/tsconfig.json` or `./server/tsconfig.json` file like this... Feel free to copy this code... References just allow you to reference another project's typescript files in your typescript project which is why this works.
```json
{
    "references": [{ "path": "../tsconfig.json" }],
    "include": ["../config.json", "**/*"]
}
```

## Core Files
These are the core files in this template that take your project and build it into a distribution... It's very simple code that just copies the files and creates a few new ones in `./dist`.

`run.ts` - Handles running both the client and server simultaneously for development mode.
`build.ts` - Houses code for building the client + server and combining them into dist
`client_config.ts` - Converts the config into a proper format ONLY FOR CLIENT
`server_config.ts` - Converts the config into a proper format ONLY FOR SERVER
`config.json` - Stores a shared configuration for both the client and server to use. Parsed in client_config.ts/server_config.ts

## Server
The default server is NestJS and you can read up on it at the [NestJS Docs](https://nestjs.com)
The server is where any logic for the app will be run and if you are using this template you should use an API style of logic for the server.

## Client
The default client is made in NuxtJS you can read up on it at the [NuxtJS Docs](https://nuxtjs.org/docs/2.x/get-started/routing). The client comes with a notifier to tell you whether or not the client can connect to the server... It uses the development/production port as well as the production/development host from `config.json` to determine the server's url.

## Config Command Info
|*build*|details|
|---|---|
| client_dist_path_from_root | The path to the client output folder from the project's root directory |
| server_dist_path_from_root | The path to the distribution folder from the project's root directory |
| output_server_container_path | Auto configured route based on the location of the server's distribution file |
| client_location_in_server | The location of the client relative to the `./server/` directory  |
| client_location_in_dist | Auto configured, based on `client_location_in_server` |
| server_start_path_from_container | The path to the server start file relative to the server's distribution folder or "container" |
| distribution_dir | The distribution folder, the name should include "dist" in it otherwise it will not be recognized by the build script. |
| static_files | A list of files in the dist folder that should not be deleted on build time, by default environment variables and dependencies are saved between builds. The build script checks by seeing if a filename includes any of the strings in the `static_files` array. |

|*client*|details|
|--------|-------|
| development_host | The base url you want to use on the client for API requests DEVELOPMENT ONLY |
| production_host | The base url you want to use on the client for API requests PRODUCTION ONLY |

|*server*|details|
|--------|-------|
| development_port | The port to run the dev server on. Also used to add the port to `development_host` on the client. DEVELOPMENT ONLY! |
| production_port | The port to run the production server on. Also used to add the port to `production_host` on the client. Make sure to rebuild if you change... PRODUCTION ONLY! |

|*commands*|details|
|--------|-------|
| client_build_commands | The build command for the client, this will be executed from `./client/`. Leave empty if your server has no build script. |
| client_devmode_command | The command to run the client for development purposes. Is run from `./client/`. |
| server_build_command | The build command for the server, this will be executed from `./server/`. Leave empty if your server has no build script. |
| server_devmode_command | The command to run the client for development purposes. Is run from `./client/`. |
| install_dependencies | The command used to install any required npm packages in the project. This should either be `yarn install` if you use yarn and `npm install` if you don't. |

|*production_commands*|details|
|--------|-------|
| run | The run command for the production server. Note that a relative path to the start file will be appended to the end of whatever you enter in `config.json`... Example `node` becomes `node ./server/src/main` you check this yourself if you build the project and check `dist/package.json` | 

| **README_TEXT** | The text pasted into the distribution README |
|--------|-------|

## Questions you Might Ask
**Q:** What if I want to preload a page?
**A:** Well, you can't, not yet... unless you have good knowledge of Nuxt and want to setup the server to work with its server side renderer.


*More questions + answers to come, based on who asks...*

## Developer Comments
IF you find anything "wrong" or have a question about the project, open up an issue. Don't expect me to snappily respond because I don't commonly use this Github account.

Some suggestions if you want to contribute...
1. This project needs a better default setup.
2. The core files need unit testing.
