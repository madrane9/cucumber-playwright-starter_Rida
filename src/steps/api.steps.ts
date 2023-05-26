/* eslint-disable prettier/prettier */
import { ICustomWorld } from '../support/custom-world';
import { Given } from '@cucumber/cucumber';

Given('ich möchte mich authetifizieren', async function (this: ICustomWorld) {
  await this.page?.goto('https://github.com/login');
  await this.loginPage?.login('madrane9@hotmail.com', 'MA99ri71');
  // Wait until the page reaches a state where all cookies are set.
  await this.page?.waitForLoadState('load');
  // Save authentication state.
  await this.saveStorageState(
    'C:/Users/Client/cucumber-playwright-starter_Rida/src/support/auth/user.json',
  );
});
