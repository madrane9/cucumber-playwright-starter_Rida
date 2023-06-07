/* eslint-disable prettier/prettier */
import { ICustomWorld } from '../support/custom-world';
import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { existsSync } from 'fs';

Given('ich möchte mich authetifizieren', async function (this: ICustomWorld) {
  await this.page?.goto(
    'http://automationpractice.pl/index.php?controller=authentication&back=my-account',
  );
  await this.loginPage?.login('madrane9@gmx.de', 'Test123');
  // Wait until the page reaches a state where all cookies are set.
  await this.page?.waitForLoadState('load');
  // Save authentication state.
  await this.saveStorageState(
    'C:/Users/Client/cucumber-playwright-starter_Rida/src/support/auth/user.json',
  );
  await this.loginPage?.logout();
});

Given('ich habe ein gespeichertes JSON StorageState', async function (this: ICustomWorld) {
  // Hier sollten wir prüfen, ob die JSON-Datei vorhanden ist oder nicht
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const jsonPath = 'C:/Users/Client/cucumber-playwright-starter_Rida/src/support/auth/user.json';
  expect(existsSync(jsonPath)).toBe(true);
});

When('ich versuche mich mit dem JSON StorageState anzumelden', async function (this: ICustomWorld) {
  const jsonPath = 'C:/Users/Client/cucumber-playwright-starter_Rida/src/support/auth/user.json';
  // Setzen Sie den Zustand des Browsers mit dem geladenen Storage-Zustand
  await this.setStorageState(jsonPath);
  await this.page?.goto(
    'http://automationpractice.pl/index.php?controller=authentication&back=my-account',
  );
});

When('klicke ich Repository', async function (this: ICustomWorld) {
  await this.loginPage?.ClickMyFirstAdress();
});

Then('sehe ich new Repository', async function (this: ICustomWorld) {
  const YourAdress = this.page?.locator('h1.page-subheading');
  expect(await YourAdress?.isVisible()).toBeTruthy();
  await this.loginPage?.logout();
});
