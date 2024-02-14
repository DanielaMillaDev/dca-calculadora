import { resolve } from 'path';

export function webpack(config, { isServer }) {
    if (!isServer) {
        config.resolve.alias['@scss'] = resolve(process.cwd(), 'node_modules/bootstrap/scss');
    }
    return config;
}

