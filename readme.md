# Darts IP Test Automation

### What is this repository for?

- The purpose of this project is to create automated API and E2E tests for Darts IP application

### Test framework details

- Tools used:
  - Playwright
  - Typescript
  - Winston

- Framework: Page Object Model

- Directories:
  - Main directory: **test-automation**
  - Test Directory: **tests**
  - Structure of tests
        - **api-tests**
                - **tests**: This directory will have all the tests created
                - **utils**: This directory will have different utilities for example api-fixture, apiHelper etc
        - **e2e-tests**
                - **pages**: This directory will have pages created for different pages from application, and it will be used for maintaining page specific functionalities and locators from the page
                - **resources**
                - **testcases**: This directory will have all the tests created
                - **utils**: This directory will have different utilities for example logger utility, ui-actions and base fixture etc.
  - Subdirectories and files:
    - **logs**: This directory will have generated logs during test execution
    - **node_modules**: This directory will have all the dependencies downloaded which are mentioned in package.json file
    - **playwright-reports**: This directory will have HTML report generated after test execution
    - **package.json**: This file have dependencies and project related details and custom scripts created for running commands
    - **playwright.config.ts**: This fill have playwright configurations which will be used during execution by default
    - **tsconfig.json**: This file have Typescript configuration and is inheriting properties from opposition-tool-ui typescript configurations.

### How do I get set up and execute tests?

##### Test Automation

- Navigate to the **test-automation** directory
- If you run the tests first time, you need to run `npm install`
- you may also need to run `npx playwright install` if playwright is not installed
- if only chrome is need to get installed then use command `npx playwright chrome install`

- Set below environment variables in your IDE
  - BASE_URL: Darts-IP-URL
  - UI_EMAIL: User-Email
  - UI_PASSWORD: User-Password

- `Set environment variables` in your **command prompt**
  - set BASE_URL="<Darts-IP-URL>"
  - set UI_EMAIL="<User-Email>"
  - set UI_PASSWORD="<User-Password>"
- `Set environment variables` in your **powershell**
  - $env:BASE_URL = "<Darts-IP URL>"
  - $env:UI_EMAIL = "<User-Email>"
  - $env:UI_PASSWORD = "<User-Password>"
- `Set environment variables` in your **bash**
  - export BASE_URL="<Darts-IP-URL>"
  - export UI_EMAIL="<User-Email>"
  - export UI_PASSWORD="<User-Password>"

**To run the tests from command line prompt**
- Run `npm run test` for running all tests on chrome in headless mode
- Run `npm run test:headed` for running all tests on chrome in headed mode
- Run `npm run test:debug` for running all tests on chrome in headed mode
- Run `npm run test:ui` for running all tests on chrome in UI mode

**To run the api test**
- Run `npm run test:api` for running **all api test**
- Run `npm run api:grep` for running **specific api test**
- Run `npm run api:debug` for debugging **speficic api tests** in debugger mode

- Run `npm run api:smoke` for running **all smoke api tests**
- Run `npm run api:performance` for running **performance api tests**
- Run `npm run api:regression` for running **regression api tests**
- Run `npm run api:cleanup` for running **cleanup api tests**

**To run the e2e test**
- Run `npm run test:e2e` for running **all e2e test** on chrome in headless mode
- Run `npm run test:e2e:headed` for running **all e2e tests** on chrome in headed mode

- Run `npm run e2e:grep` for running **specific test** on chrome in headed mode
- Run `npm run e2e:debug` for debugging **specific tests** on chrome in headed mode

- Run `npm run e2e:smoke` for running **smoke tests** on chrome in headless mode
- Run `npm run e2e:sanity` for running **sanity tests** on chrome in headless mode
- Run `npm run e2e:regression` for running **regression tests** on chrome in headless mode

**Different command line options while running tests**
- Run `npm run e2e:chromium` for running **all tests** on chromium in headless mode
- Run `npm run e2e:firefox` for running **all tests** on firefox in headless mode
- Run `npm run e2e:webkit` for running **all tests** on webkit/safari in headless mode
- Run `npm run e2e:edge` for running **all tests** on edge in headless mode
- Run `npm run e2e:chrome` for running **all tests** on chrome in headless mode

**To View the last test execution report**
- Run `npm run test:report` for generating HTML report from last execution

**To run the dry test i.e. to get the count of tests**
- Run `npm run test:list` for dry run i.e. print **all available tests** in console and count

- Run `npm run api:list` for dry run i.e. print all **API** tests in console and count
- Run `npm run api:smoke:list` for dry run i.e. print **all API** smoke tests in console and count
- Run `npm run api:performance:list` for dry run i.e. print **API performance** in console and count
- Run `npm run api:regression:list` for dry run i.e. print **API regression** tests in console and count

- Run `npm run e2e:list` for dry run i.e. print **all E2E tests** in console and count
- Run `npm run e2e:smoke:list` for dry run i.e. print **E2E smoke tests** in console and count
- Run `npm run e2e:sanity:list` for dry run i.e. print **E2E sanity tests** in console and count
- Run `npm run e2e:regression:list` for dry run i.e. print **E2E regression tests** in console and count