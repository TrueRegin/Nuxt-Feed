import chalk from 'chalk';
import fse from 'fs-extra';
import { join } from 'path';
import childProcess = require('child_process');

import config from './server_config';
import packageDotJson from './package.json';
import serverPackageDotJson from './server/package.json';
const { README_TEXT } = config;
const {
    client_dist_path_from_root,
    server_dist_path_from_root,
    distribution_dir,
    static_files,
    server_files_to_copy,
    output_server_container_path,
    client_location_in_server,
    client_location_in_dist
} = config.build;
const {
    client_build_command,
    server_build_command,
    install_dependencies,
} = config.commands;

// Add some stuff to clear dist
// Then copy the client dist and server dist into the dist folder.
async function cleanDistFolder() {
    if (distribution_dir.endsWith('dist')) {
        const stats = fse.statSync(join(__dirname, distribution_dir));
        if (stats.isDirectory()) {
            fse.readdirSync(join(__dirname, distribution_dir)).forEach(
                (file) => {
                    const _FILEPATH = join(__dirname, distribution_dir, file);
                    const file_stats = fse.statSync(_FILEPATH);
                    if (!static_files.includes(file)) {
                        if (file_stats.isDirectory()) {
                            fse.rmdirSync(_FILEPATH, { recursive: true });
                        } else {
                            fse.unlinkSync(_FILEPATH);
                        }
                    }
                }
            );
        }
        return true;
    } else {
        console.log(
            chalk.red.bold(
                '!!! Aborting build... the dist folder should be named "dist" this is to prevent the accidental deletion of sensitive files !!!'
            )
        );
        return false;
    }
}

async function addFileInDist(path: string, data: string) {
    const ws = await fse.createWriteStream(join(__dirname, 'dist', path));
    ws.write(data);
    ws.close();
}

function addFileInDistIfNotThere(path: string, data: string) {
    if (!fse.existsSync(path)) {
        addFileInDist(path, data);
    }
}

async function addReadme() {
    await addFileInDist('README.md', README_TEXT);
}

async function addPackageDotJson() {
    const newPackageDotJson = {
        name: packageDotJson.name,
        version: packageDotJson.version,
        description: packageDotJson.description,
        author: packageDotJson.author,
        dependencies: serverPackageDotJson.dependencies,
        license: packageDotJson.license,
        scripts: {
            start: config.production_commannds.run + " " + config.build.server_start_path_from_container
        }
    };
    await addFileInDist('package.json', JSON.stringify(newPackageDotJson));
}

async function addDotenv() {
    addFileInDistIfNotThere('.env', '');
}

async function buildClient() {
    childProcess.execSync(client_build_command, {
        cwd: join(__dirname, 'client'),
    });
}

/**
 * Copies all necessary files to run the server into the dist folder.
 */
async function buildServer() {
    childProcess.execSync(server_build_command, {
        cwd: join(__dirname, 'server'),
    });
}

async function copyServerToDist() {
    await fse.copy(server_dist_path_from_root, output_server_container_path);
    server_files_to_copy.forEach(async (file) => {
        await fse.copy(
            join(__dirname, 'server', file),
            join(__dirname, 'dist', file)
        );
    });

    childProcess.execSync(install_dependencies, {
        cwd: join(__dirname, 'dist'),
    });
}

/**
 * Copies the current client in the client folder into the server's client folder.
 */
async function copyClientToServer() {
    await fse.emptyDirSync(client_location_in_server)
    await fse.copy(client_dist_path_from_root, client_location_in_server);
}

/**
 * Copies the current client in the client folder into the distribution folder.
 */
async function copyClientToDist() {
    await fse.emptyDirSync(client_location_in_dist)
    await fse.copy(client_dist_path_from_root, client_location_in_dist);
}


async function start() {
    console.log(chalk.greenBright.bold("BUILDING Project... This takes around 10 seconds to complete. FIrst build takes longer because you install all dependencies."))
    await cleanDistFolder();
    await addReadme();
    await addPackageDotJson();
    await addDotenv();

    process.argv.forEach(async arg => {
        switch(arg) {
            case "--client":
            case "-C":
                await buildClient();
                break;
            case "--server":
            case "-S":
                await buildServer();
                break;
            case "--client-to-server":
            case "-CTS":
                await copyClientToServer();
                break;
            case "--all":
                await buildClient();
                await buildServer();
                await copyClientToServer();
                break;
        }

        await copyClientToDist();
        await copyServerToDist();
    })

}

start();
