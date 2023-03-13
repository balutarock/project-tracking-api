require("dotenv").config({ silent: true });

const {
    NODE_ENV,
    BASE_URL,
    CORS_URL,
    APP_URL,
    PORT,
    DATABASE_URL,
    APP_FRONTEND_URL,
    DEFAULT_API_KEY,
    DEFAULT_SUPER_ADMIN_EMAIL,
    DEFAULT_SUPER_ADMIN_PASSWORD,
    AWS_TOPIC_ARN,
    AWS_SES_API_VERSION,
    AWS_SNS_API_VERSION,
    REACT_APP_URL,
} = process.env;

module.exports = {
    environment: NODE_ENV || "production",
    baseUrl: BASE_URL || "",
    appFrontendUrl: APP_FRONTEND_URL || "",
    reactAppBaseUrl: REACT_APP_URL || "",
    corsUrl: CORS_URL ? CORS_URL.split(",") : "",
    port: PORT || 80,
    databaseUrl: DATABASE_URL,
    defaultApiKey: DEFAULT_API_KEY,
    appUrl: APP_URL || "",
    defaultSuperAdminEmail: DEFAULT_SUPER_ADMIN_EMAIL,
    defaultSuperAdminPassword: DEFAULT_SUPER_ADMIN_PASSWORD,
    awsSnsApiVersion: AWS_SNS_API_VERSION || "",
    awsSesApiVersion: AWS_SES_API_VERSION || "",
    awsTopicArn: AWS_TOPIC_ARN || "",
};
