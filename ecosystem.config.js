module.exports = {
  apps: [
    {
      name: "app",
      script: "./www/app.js",
      env_production: {
        NODE_ENV: "production",
        max_memory_restart: "200M",
        error_file : "$HOME/.pm2/logs/err.log",
        instances: -3,
      },
    },
  ],
};
