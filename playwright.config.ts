import { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
    projects: [
        {
            name: 'Chromium',
            use: { browserName: 'chromium' },
        },
        {
            name: 'Firefox',
            use: { browserName: 'firefox' },
        },
        {
            name: 'WebKit',
            use: { browserName: 'webkit' },
        },
    ],
};

export default config;
