

//import { defineConfig } from '@playwright/test';

//type BrowserName = 'chromium' | 'firefox' | 'msedge';

//// -------------------------
//// Browser setup helper
//// -------------------------
////function browserUse(browser: BrowserName) {
////    return {
////        browserName: browser,
////        headless: false,
////        viewport: null, // disables fixed viewport
       
////        launchOptions: {
////            args:
                
////                     ['--start-maximized'] // Chromium supports this flag
                     
////        },
////        ...(process.env.REMOTE_WS
////            ? { connectOptions: { wsEndpoint: process.env.REMOTE_WS } }
////            : {}),
////    };
////}

//function browserUse(browser: BrowserName) {
//    return {
//        browserName: browser,
//        headless: false,
//        viewport: null, // use full screen size
//        deviceScaleFactor: undefined,
//        launchOptions: {
//            args: browser === 'chromium' ? ['--start-maximized'] : [],
//        },
//        ...(process.env.REMOTE_WS
//            ? { connectOptions: { wsEndpoint: process.env.REMOTE_WS } }
//            : {}),
//    };
//}
//// -------------------------
//// Config
//// -------------------------
//export default defineConfig({
//    timeout: 3_000_000,
//    testDir: './tests',
//    fullyParallel: true,
//    forbidOnly: !!process.env.CI,
//    retries: process.env.CI ? 2 : 0,
//    workers: process.env.CI ? 1 : 3,

//    reporter: [
//        ['./src/reporters/CustomLoggerReporter.ts'],
//        ['html'],
//        ['line'],
//        ['list'],
//        ['junit', { outputFile: 'results/results.xml' }],
//        ['allure-playwright'],
//    ],

//    use: {
//        baseURL: process.env.BASE_URL || 'https://restful-booker.herokuapp.com',
//        extraHTTPHeaders: {
//            Accept: 'application/json',
//            'Content-Type': 'application/json',
//        },
//        trace: 'on-first-retry',
//        video: 'on',
//        headless: true,
//        launchOptions: { slowMo: 500 },
//    },

//    projects: [
//        // 🔹 Default browser projects only
//        { name: 'chromium', use: browserUse('chromium') },
//        { name: 'firefox', use: browserUse('firefox') },
//        { name: 'Edge', use: browserUse('msedge') },

//        // 🔹 API project
//        {
//            name: 'api',
//            testDir: './tests/API_Testing',
           
//            use: {
//                baseURL: process.env.BASE_URL || 'https://restful-booker.herokuapp.com',
//                extraHTTPHeaders: {
//                    Accept: 'application/json',
//                    'Content-Type': 'application/json',
//                },
//            },
//        },
//    ],
//});
import { defineConfig } from '@playwright/test';

// -------------------------
// Browser setup helper
// -------------------------
type BrowserName = 'chromium' | 'firefox' | 'msedge';

function browserUse(browser: BrowserName) {
    return {
        browserName: browser === 'msedge' ? 'chromium' : browser, // ✅ Edge uses chromium
        headless: false,
        viewport: null, // use full screen size
        deviceScaleFactor: undefined,
        channel: browser === 'msedge' ? 'msedge' : undefined, // ✅ tell Playwright to launch Edge
        launchOptions: {
            args: browser === 'chromium' || browser === 'msedge' ? ['--start-maximized'] : [],
        },
        ...(process.env.REMOTE_WS
            ? { connectOptions: { wsEndpoint: process.env.REMOTE_WS } }
            : {}),
    };
}

// -------------------------
// Config
// -------------------------
export default defineConfig({
    timeout: 3_000_000,
    testDir: './tests',
    fullyParallel: true,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 2 : 0,
    workers: process.env.CI ? 1 : 3,

    reporter: [
        ['./src/reporters/CustomLoggerReporter.ts'],
        ['html'],
        ['line'],
        ['list'],
        ['junit', { outputFile: 'results/results.xml' }],

    ],

    use: {
        baseURL: process.env.BASE_URL || 'https://restful-booker.herokuapp.com',
        extraHTTPHeaders: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        trace: 'on-first-retry',
        video: 'on',
        headless: true,
        launchOptions: { slowMo: 500 },
    },

    projects: [
        // 🔹 Default browser projects
        { name: 'chromium', use: browserUse('chromium') },
        { name: 'firefox', use: browserUse('firefox') },
        { name: 'Edge', use: browserUse('msedge') }, // ✅ Edge project

        // 🔹 API project
        {
            name: 'api',
            testDir: './tests/API_Testing',
            use: {
                baseURL: process.env.BASE_URL || 'https://restful-booker.herokuapp.com',
                extraHTTPHeaders: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
            },
        },
    ],
});
