import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
    timeout: 300_0000,
    testDir: './tests',
    fullyParallel: true,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 2 : 2,
    workers: process.env.CI ? 1 : 6,

    reporter: [
        ['./src/reporters/CustomLoggerReporter.ts'],
        ['html'],
        ['line'],
        ['list'],
        ['junit', { outputFile: 'results/results.xml' }],
        ['allure-playwright'],
    ],

    // GLOBAL USE (common settings)
    use: {
        baseURL: 'https://restful-booker.herokuapp.com',
        extraHTTPHeaders: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        trace: 'on-first-retry',
        video: 'on',
        headless: true,
        launchOptions: {
            slowMo: 500,   // slow down actions by 500ms
        }

    },

    projects: [
        // -------------------------
        // NORMAL LOCAL TEST (Chrome)
        // -------------------------
        {
           
            name: 'chromium',
            use: {
                browserName: 'chromium',
                headless: false,
                viewport: null,
                launchOptions: {
                    args: ['--start-maximized'],
                },
            },
        },
        {
            name: 'firefox',
            use: {
                browserName: 'firefox',
                headless: false,
                viewport: null,
                launchOptions: {
                    args: ['--start-maximized'],
                },
            },
        },
        {
            name: 'webkit',
            use: {
                browserName: 'webkit',
                headless: false,
                viewport: null,
                launchOptions: {
                    args: ['--start-maximized'],
                },
            },
        },

        // -------------------------
        // REMOTE PLAYWRIGHT SERVER
        // -------------------------
        {
            name: 'remote-chromium',
            use: {
                browserName: 'chromium',
                viewport: null,
                launchOptions: {
                    args: ['--start-maximized'],
                },
                connectOptions: {
                    wsEndpoint: process.env.REMOTE_WS ?? "",
                    //timeout: 60000,

                 
                }
            }
        },
        {
            name: 'remote-firefox', // 👉 [ADDED]
            use: {
                browserName: 'firefox', // 👉 [ADDED]
                connectOptions: {
                    wsEndpoint: process.env.REMOTE_WS ?? "", // 👉 [ADDED]
                    //timeout: 60000, // 👉 [ADDED]


                }
            }
        },
        {
            name: 'remote-edge', // 👉 [ADDED]
            use: {
                browserName: 'chromium', // Edge runs on Chromium engine
                channel: 'msedge',       // 👉 [ADDED] ensures Edge channel
                connectOptions: {
                    wsEndpoint: process.env.REMOTE_WS ?? "", // 👉 [ADDED]
                    //timeout: 60000, // 👉 [ADDED]
                }
            }
        }
 

    ],
})