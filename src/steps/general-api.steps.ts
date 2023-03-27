import { ICustomWorld } from '../support/custom-world';
import { When } from '@cucumber/cucumber';

When('ich den Request absende', async function (this: ICustomWorld) {
  this.requestResponse = await this.requestContext?.get(this.requestPath!, {
    data: this.requestParams,
  });
});
