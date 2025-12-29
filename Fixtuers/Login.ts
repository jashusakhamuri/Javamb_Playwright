

//import { test as base } from '@playwright/test';
//import { RegisterActions } from '../src/pages/ambTestLab/register';
//import { LoginActions } from '../src/pages/ambTestLab/login';
//import { faker } from '@faker-js/faker';   // v6.x for CommonJS

//// Define types for fixtures
//type AuthFixtures = {
//    loginAsUser: () => Promise<{ email: string; password: string }>;
//    loginAsAdmin: () => Promise<void>;
//};

//export const test = base.extend<AuthFixtures>({
//    loginAsUser: async ({ page }, use) => {
//        async function loginAsUser() {
//            // dynamic faker data
//            const firstName = faker.name.firstName();
//            const middleName = faker.name.middleName();
//            const lastName = faker.name.lastName();
//            const email = faker.internet.email(firstName, lastName);
//            const password = faker.internet.password(10); // random 10‑char password
//            const mobile = '9' + faker.random.numeric(9);
//            const location = faker.address.city();
//            const address = faker.address.streetAddress();

//            const register = new RegisterActions(page);
//            await page.goto('https://ambtestlab.netlify.app/');
//            await register.navigateToRegisterPage();

//            await register.registerUser(
//                firstName,
//                middleName,
//                lastName,
//                email,
//                password,
//                mobile,
//                location,
//                address
//            );

//            await register.navigateToLogin();

//            const login = new LoginActions(page);
//            await login.loginWithCredentials(email, password);

//            return { email, password };
//        }

//        await use(loginAsUser);
//    },

//    loginAsAdmin: async ({ page }, use) => {
//        async function loginAsAdmin() {
//            const login = new LoginActions(page);
//            await page.goto('https://ambtestlab.netlify.app/');

//            await login.navigateToLoginPage();

//            await login.loginWithCredentials(
//                process.env.ADMIN_EMAIL ?? 'ambtestlab@ambmindspace.com',
//                process.env.ADMIN_PASS ?? 'test1234'
//            );
//        }

//        await use(loginAsAdmin);
//    }
//});
import { test as base } from '@playwright/test';
import { RegisterActions } from '../src/pages/ambTestLab/register';
import { LoginActions } from '../src/pages/ambTestLab/login';
import { faker } from '@faker-js/faker';
import { loadProperties } from '../config/configLoader';

type AuthFixtures = {
    loginAsUser: () => Promise<{ email: string; password: string }>;
    loginAsAdmin: () => Promise<void>;
};

// Default to QA if ENV not set
const env = process.env.ENV || 'qa';
const { baseURL } = loadProperties(env);

export const test = base.extend<AuthFixtures>({
    loginAsUser: async ({ page }, use) => {
        async function loginAsUser() {
            const firstName = faker.name.firstName();
            const middleName = faker.name.middleName();
            const lastName = faker.name.lastName();
            const email = faker.internet.email(firstName, lastName);
            const password = faker.internet.password(10);
            const mobile = '9' + faker.random.numeric(9);
            const location = faker.address.city();
            const address = faker.address.streetAddress();

            const register = new RegisterActions(page);
            await page.goto(baseURL); // ✅ dynamic from .properties
            await register.navigateToRegisterPage();

            await register.registerUser(
                firstName,
                middleName,
                lastName,
                email,
                password,
                mobile,
                location,
                address
            );

            await register.navigateToLogin();

            const login = new LoginActions(page);
            await login.loginWithCredentials(email, password);

            return { email, password };
        }

        await use(loginAsUser);
    },

    loginAsAdmin: async ({ page }, use) => {
        async function loginAsAdmin() {
            const login = new LoginActions(page);
            await page.goto(baseURL); // ✅ dynamic from .properties

            await login.navigateToLoginPage();

            await login.loginWithCredentials(
                process.env.ADMIN_EMAIL ?? 'ambtestlab@ambmindspace.com',
                process.env.ADMIN_PASS ?? 'test1234'
            );
        }

        await use(loginAsAdmin);
    },
});

