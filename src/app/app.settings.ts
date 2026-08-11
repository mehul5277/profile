export const AppSettings = {
    appName: 'My Angular App',
    logLevel: 'debug',
    apiUrl: 'http://localhost:3000/api',
    auth: {
        loginUrl: '/auth/login',
        logoutUrl: '/auth/logout',
        registerUrl: '/auth/register',
        tokenKey: 'token',
        userKey: 'user',
    },
    routes: {
        home: '/',
        admin: '/admin',
        login: '/auth/sign-in',
        register: '/auth/register',
    },
    features: {
        enableGoogleSignIn: true,
        enableFacebookSignIn: false,
        enableTwoFactorAuth: false,
    },
    ui: {
        theme: 'light',
        itemsPerPage: 10,
    },
    security: {
        passwordMinLength: 8,
        passwordRequireNumbers: true,
        passwordRequireSpecialChars: true,
    },
    logging: {
        enableClientLogging: true,
        enableServerLogging: false,
    },
    performance: {
        enablePerformanceMonitoring: true,
        enableErrorTracking: true,
    },
    analytics: {
        enableUserTracking: true,
        enableEventTracking: true,
    },
    notifications: {
        enableEmailNotifications: true,
        enablePushNotifications: false,
    },
    integrations: {
        enableThirdPartyIntegrations: true,
        thirdPartyApiKeys: {
            googleMaps: 'YOUR_GOOGLE_MAPS_API_KEY',
        }
    },
    localization: {
        defaultLanguage: 'en',
        supportedLanguages: ['en', 'es', 'fr'],
    },
    accessibility: {
        enableScreenReaderSupport: true,
        enableHighContrastMode: false,
    },
    backup: {
        enableAutoBackup: true,
        backupFrequency: 'daily',
    },
    maintenance: {
        enableMaintenanceMode: false,
        maintenanceMessage: 'The application is currently under maintenance. Please try again later.',
    },
    apiVersion: 'v1',
    maxUploadSizeMB: 50,
    sessionTimeoutMinutes: 30,
    enableDebugTools: true,
    enableBetaFeatures: false,
}