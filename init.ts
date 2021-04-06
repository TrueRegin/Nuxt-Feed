import childProcess = require('child_process');
import config from './server_config';

async function installClientDependencies() {
    childProcess.execSync(config.commands.install_dependencies, {
        cwd: './client',
    });
}

async function installServerDependencies() {
    childProcess.execSync(config.commands.install_dependencies, {
        cwd: './server',
    });
}

async function start() {
    await installClientDependencies();
    await installServerDependencies();
}

start();