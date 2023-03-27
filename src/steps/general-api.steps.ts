import { ICustomWorld } from '../support/custom-world';
import { Then, When } from '@cucumber/cucumber';
import { expect } from '@playwright/test';

When('ich den Request absende', async function (this: ICustomWorld) {
  this.requestResponse = await this.requestContext?.get(this.requestPath!, {
    data: this.requestParams,
  });
});

Then(
  'erwarte ich "{}" als content-type in der API-Antwort',
  async function (this: ICustomWorld, expectedContentType: string) {
    const headers = this.requestResponse?.headers();
    expect(headers!['content-type']).toEqual(expectedContentType);
  },
);

Then(
  'erwarte ich einen sicheren x-frame-options Header in der API-Antwort',
  async function (this: ICustomWorld) {
    const xFrameHeader = this.requestResponse?.headers()['x-frame-options'];
    expect(xFrameHeader?.toLowerCase()).toMatch(/^deny$|^sameorigin$/);
  },
);

Then('erwarte ich keine Server-Details in der API-Antwort', async function (this: ICustomWorld) {
  const serverHeader = this.requestResponse?.headers()['server'];
  if (!serverHeader) {
    // Wenn der Header nicht gesetzt wird, werden keine Informationen preisgegeben, daher ist der Test erfolgreich
    expect(serverHeader).toBeUndefined();
    return;
  }
  expect(serverHeader.toLowerCase()).not.toMatch(/^nginx$|^tomcat$/);
});
