const path = require('path');

const resolvePath = p => path.resolve(__dirname, p)

module.exports = {
    webpack: {
        alias: {
            '@eb-components': resolvePath('./src/components'),
            '@eb-pages': resolvePath('./src/pages'),
            '@eb-core': resolvePath('./src/core'),
            '@eb-state': resolvePath('./src/state')
        }
    },
}
