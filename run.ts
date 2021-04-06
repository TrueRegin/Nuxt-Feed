const args = process.argv;
import chalk = require('chalk');
import childProcess = require('child_process')
import { join } from 'path';
import config from "./client_config"
const {client_devmode_command, server_devmode_command} = config.commands;
const {run} = config.production_commannds;

function errorMessage(command_type: string, command: string) {
    console.log(chalk.red.bold('ERROR:') + `The ${command_type} command: '${command}' was unable to execute!`)
}

function startDevClient() {
    const devClient = childProcess.exec(client_devmode_command, {cwd: join(__dirname, 'client')}).on("error", () => {
        errorMessage("client devmode", client_devmode_command);
    })
    devClient.stdout?.on('data', (data: string) => {
        console.log(chalk.green(chalk.bold("CLIENT: ") + data));
    })

    devClient.stdout?.on('error', (error: string) => {
        console.log(chalk.green.bold("CLIENT ") + chalk.redBright.bold(chalk.bold("ERROR: ") + error));
    })
}

function startDevServer() {
    const devServer = childProcess.exec(server_devmode_command, {cwd: join(__dirname, 'server')});
    devServer.stdout?.on('data', (data: string) => {
        console.log(chalk.yellow(chalk.bold("SERVER: ") + data));
    })
    
    devServer.stdout?.on('error', (error: string) => {
        console.log(chalk.yellow.bold("SERVER: ") + chalk.redBright.bold("ERROR: ") + error);
    })
}

function startProdServer() {
    const prodServer = childProcess.exec(run, {cwd: join(__dirname, 'dist')})
    prodServer.stdout?.on('data', (data: string) => {
        console.log(chalk.blueBright(chalk.bold("PRODUCTION: ") + data));
    })
}

async function start() {
    for(let i = 0; i < args.length; i++) {
        const curr_arg = args[i];
        switch(curr_arg) {
            case "--development":
            case "-D":
                startDevClient();
                startDevServer();
                return;
            case '--production':
            case '-P':
                startProdServer();
                return;
            case "--client":
            case "-C":
                startDevClient();
                return;
            case "--server":
            case "-S":
                startDevServer();
                return;
        }
    }
}

start();