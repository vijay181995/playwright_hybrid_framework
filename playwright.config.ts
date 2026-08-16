import { defineConfig, devices } from "@playwright/test";
import * as process from "node:process";

const isCI = !!process.env["CI"];
const BASE_URL = process.env["BASE_URL"]!;

const TIMEOUTS = {
  api: 10 * 60 * 1000,               // 10 minutes
  e2e: 10 * 60 * 1000,              // 10 minutes Test timeout
  global: 5 * 60 * 60 * 1000,       // 5 hours
  expect: 10 * 1000,                // 10 seconds
  navigation: 30 * 1000,            // 30 seconds
  action: 10 * 1000,                // 10 seconds
} as const;

const commonE2EConfig = {
  testDir: "tests/e2e",
  testMatch: "**/*.spec.ts",
  timeout: TIMEOUTS.e2e,
  fullyParallel: true,
  workers: isCI ? 2 : 1,
  retries: 0,
  use: {
    trace: "on-first-retry" as const,
    screenshot: "only-on-failure" as const,
    video: "retain-on-failure" as const,
    navigationTimeout: TIMEOUTS.navigation,
    actionTimeout: TIMEOUTS.action,
    headless: isCI,
  },
  expect: {
    timeout: TIMEOUTS.expect,
    toHaveScreenshot: { maxDiffPixels: 100 },
    toMatchSnapshot: { maxDiffPixelRatio: 0.1 },
  },
};

const desktopLaunchOptions = {
  args: ["--start-maximized", "--force-device-scale-factor=1"],
  slowMo: isCI ? 0 : 1000,
};
const ciDesktopViewport = { width: 1920, height: 1080 };

const createE2EProject = (
  name: string,
  device?: typeof devices[keyof typeof devices],
  channel?: "chrome" | "msedge"
) => ({
  name,
  ...commonE2EConfig,
  outputDir: `test-results/e2e/${name.replace("e2e-", "")}`,
  use: {
    ...commonE2EConfig.use,
    ...device,
    viewport: isCI ? ciDesktopViewport : null,
    deviceScaleFactor: isCI ? 1 : undefined,
    ...(channel && { channel }),
    launchOptions: {
      ...desktopLaunchOptions,
      args: isCI
        ? [...desktopLaunchOptions.args, `--window-size=${ciDesktopViewport.width},${ciDesktopViewport.height}`]
        : desktopLaunchOptions.args,
    },
  },
  expect: commonE2EConfig.expect,
});

export default defineConfig({
  globalSetup: './tests/api/utils/global-setup',
  testDir: "./tests",
  testMatch: "**/*.spec.ts",
  outputDir: "test-results/artifacts",
  timeout: TIMEOUTS.e2e,
  globalTimeout: TIMEOUTS.global,

  reporter: isCI
    ? [
      ["playwright-teamcity-reporter", { testMetadataArtifacts: "test-results", logConfig: false }],
      ["html", { open: "never", outputFolder: "test-results/html-report" }],
      ["junit", { outputFile: "test-results/junit.xml" }],
      ["json", { outputFile: "test-results/results.json" }],
    ]
    : [
      ["html", { open: "on-failure", outputFolder: "test-results/html-report" }],
      ["list"],
    ],

  use: {
    baseURL: process.env["BASE_URL"]!,
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
  },

  expect: {
    timeout: TIMEOUTS.expect,
  },

  projects: [
    {
      name: "api",
      testDir: "tests/api",
      testMatch: "**/*.spec.ts",
      timeout: TIMEOUTS.api,
      fullyParallel: false,
      workers: 1,
      retries: 0,
      outputDir: "test-results/api",
      use: {
        baseURL: BASE_URL,
        extraHTTPHeaders: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "Authorization": `Bearer ${process.env['API_ACCESS_TOKEN']}`,
          "Cookie": `${process.env['API_CDN_COOKIE']}`,
        },
        headless: true,
      },
    },

    createE2EProject("e2e-chromium", devices["Desktop Chrome"]),
    createE2EProject("e2e-firefox", devices["Desktop Firefox"]),
    createE2EProject("e2e-webkit", devices["Desktop Safari"]),
    createE2EProject("e2e-edge", devices["Desktop Chrome"], "msedge"),
    createE2EProject("e2e-chrome", devices["Desktop Chrome"], "chrome"),
  ],
});
