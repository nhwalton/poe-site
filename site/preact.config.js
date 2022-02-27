/**
 * Function that mutates the original webpack config.
 * Supports asynchronous changes when a promise is returned (or it's an async function).
 *
 * @param {import('preact-cli').Config} config - original webpack config
 * @param {import('preact-cli').Env} env - current environment and options pass to the CLI
 * @param {import('preact-cli').Helpers} helpers - object with useful helpers for working with the webpack config
 * @param {Record<string, unknown>} options - this is mainly relevant for plugins (will always be empty in the config), default to an empty object
 */

export default (config, env, helpers, options) => {
    if (env.dev) {
        config.devServer.proxy = [
            {
                path: '/api/*',
                target: 'http://localhost:6000',
                // ...any other stuff...
            }
            ];
    }
    config.resolve = { 
        "alias": { 
          "react": "preact/compat",
          "react-dom/test-utils": "preact/test-utils",
          "react-dom": "preact/compat",     // Must be below test-utils
          "react/jsx-runtime": "preact/jsx-runtime"
        }
      }
    // if (env.isProd) {   
    //     asyncPlugin(config);
    // }
}