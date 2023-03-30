import { ICustomWorld } from '../support/custom-world';
import { Given, Then, When } from '@cucumber/cucumber';
import { expect } from '@playwright/test';

Given('ein Request an die Katzen-Fakten-API', async function (this: ICustomWorld) {
  this.requestPath = '/facts';
});

When('ich als limit Parameter {int} setze', async function (this: ICustomWorld, value: number) {
  this.requestParams = { limit: value };
});
When('ich nach {} Katzen-Fakten frage', async function (this: ICustomWorld, limit: number) {
  this.requestResponse = await this.requestContext?.get('/facts', {
    params: { limit: limit },
  });
});

Then(
  'erwarte ich {int} Fakten über Katzen',
  async function (this: ICustomWorld, expectedResultCount: number) {
    const buffer = await this.requestResponse?.body();
    //Anschließend wird der Puffer in ein JavaScript-Objekt umgewandelt, indem die "JSON.parse()" Methode aufgerufen wird
    //Das "!"-Symbol wird verwendet, um dem TypeScript-Compiler zu sagen, dass der Wert nicht null oder undefined ist, obwohl dies theoretisch möglich wäre.
    const result = JSON.parse(buffer!.toString());
    expect(result.data.length).toEqual(expectedResultCount);
    // console.log(result.data);
    console.log(result.data.map((entry: { fact: string }) => entry.fact));
  },
);
