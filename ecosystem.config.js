module.exports = {
    /**
     * Application configuration section
     * http://pm2.keymetrics.io/docs/usage/application-declaration/
     */
    apps: [
        {
            name: "Saasly Tracker API",
            script: "app.js",
            out_file: "/root/.pm2/logs/saasly-tracker-api/out.log",
            error_file: "/root/.pm2/logs/saasly-tracker-api/err.log",
            env: {
                COMMON_VARIABLE: "true",
            },
            env_production: {
                NODE_ENV: "production",
            },
            log_date_format: "YYYY-MM-DD HH:mm Z",
        },
    ],

    /**
     * Deployment section
     * http://pm2.keymetrics.io/docs/usage/deployment/
     */
    deploy: {
        production: {
            user: "root",
            host: "saasly-tracker-api.spritle.com",
            ref: "origin/main",
            repo: "git@code.spritle.com:saasly/saasly-tracker-api.git",
            path: "/root/projects/saasly-tracker-api",
            "post-deploy":
                "npm install && pm2 startOrRestart ecosystem.config.js --env production",
        },
    },
};
