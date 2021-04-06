import path = require('path');
const { join } = path;
import config = require('./config.json');
const { development_port, production_port } = config.server;
const { development_host, production_host } = config.client;
const { client_dist_path_from_root, server_dist_path_from_root } = config.build;

function convertToUrl(url: string, port: number) {
    if (url.trim() === '/') {
        return '/';
    } else if (port === 80) {
        return url;
    } else {
        return `${url}:${port}`;
    }
}

/**
 * Moves where a relative paths "root" is by going forward a specified amount
 * of files and then setting that folder as the root.
 *
 * Use a negative number to infinitely go forward...
 * TODO: Prevent files from being considered as folders... ie being able to set the location of a file as the root instead of the file.
 *
 * @param uri - A relative path to a file or directory on the system.
 * @param amount - The amount of paths to move forward with.
 */
function moveRootForward(uri: string, amount: number) {
    let components = uri.split('/');
    for (let i = 0; i < components.length; i++) {
        if (components.length > 1 && i > 0 && amount != 0) {
            components.splice(i, 1);
            amount--;
        }
    }

    components = components.map((comp) => {
        if (comp === '.') return './';
        return comp;
    });

    return path.join(...components);
}

const export_object: typeof config = { ...config };
export_object.client.development_host = convertToUrl(
    development_host,
    development_port
);
export_object.client.production_host = convertToUrl(
    production_host,
    production_port
);
export_object.build.output_server_container_path = 'dist/app';
export_object.build.client_location_in_dist = join('dist', config.build.client_location_in_server);
export_object.build.client_location_in_server = join('server', config.build.client_location_in_server);

export default export_object;
