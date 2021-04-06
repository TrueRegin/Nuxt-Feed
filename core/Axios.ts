import { AxiosRequestConfig } from 'axios';
import config from '../client_config';
const { production_host, development_host } = config.client;

/**
 *
 * @param mode - The mode the client is being run in... either development or production.
 */
export function AxiosConfig(mode: string): AxiosRequestConfig {
    if (mode === 'development') {
        return {
            baseURL: development_host,
        };
    } else if (mode === 'production') {
        return {
            baseURL: production_host,
        };
    } else {
        throw new Error('Invalid mode provided for Axios config');
    }
}
