require("dotenv").config();

const { DEPLOY_USER, DEPLOY_HOST, DEPLOY_PATH, DEPLOY_REF, DEPLOY_REPOSITORY } =
  process.env;

module.exports = {
  apps: [
    {
      name: "mesto",
      script: "dist/app.js",
    },
  ],
  deploy: {
    production: {
      user: DEPLOY_USER,
      host: DEPLOY_HOST,
      ref: DEPLOY_REF,
      repo: DEPLOY_REPOSITORY,
      path: DEPLOY_PATH,
      "pre-deploy-local": `bash scripts/deployEnv.sh ${DEPLOY_USER}@${DEPLOY_HOST} ${DEPLOY_PATH}`,
      "post-deploy":
        "cd deploy && pwd && npm ci && npm run build && pm2 startOrRestart ecosystem.config.js --env production",
    },
  },
};
