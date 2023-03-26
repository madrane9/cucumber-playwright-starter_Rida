import { ICustomWorld } from '../support/custom-world';
import { Given, Then, When } from '@cucumber/cucumber';
import { expect } from '@playwright/test';

Given('ein Request an die Katzen-Fakten-API', async function (this: ICustomWorld) {
  this.requestPath = '/facts';
});

When('ich als limit Parameter {int} setze', async function (this: ICustomWorld, value: number) {
  this.requestParams = { limit: value };
});

When('ich den Request absende', async function (this: ICustomWorld) {
  this.requestResponse = await this.requestContext?.get(this.requestPath!, {
    data: this.requestParams,
  });
});

Then(
  'erwarte ich {int} Fakten über Katzen',
  async function (this: ICustomWorld, expectedResultCount: number) {
    const buffer = await this.requestResponse?.body();
    const result = JSON.parse(buffer!.toString());
    expect(result.data.length).toEqual(expectedResultCount);
  },
);
