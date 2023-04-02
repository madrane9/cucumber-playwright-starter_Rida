import { Calculator } from '../pages/calculator';
import { NachzahlungÜbersicht } from '../pages/nachzahlungübersicht';
import { setWorldConstructor, World, IWorldOptions } from '@cucumber/cucumber';
import * as messages from '@cucumber/messages';
import {
  BrowserContext,
  Page,
  PlaywrightTestOptions,
  APIRequestContext,
  APIResponse,
  Response,
} from '@playwright/test';

export interface CucumberWorldConstructorParams {
  parameters: { [key: string]: string };
}

export interface ICustomWorld extends World {
  debug: boolean;
  feature?: messages.Pickle;
  context?: BrowserContext;
  page?: Page;
  calculator?: Calculator;
  nachzahlungsübersicht?: NachzahlungÜbersicht;

  testName?: string;
  startTime?: Date;

  requestContext?: APIRequestContext;
  tracedResponses?: Response[];
  requestPath?: string;
  requestParams?: { [key: string]: string | boolean | number };
  requestResponse?: APIResponse;

  playwrightOptions?: PlaywrightTestOptions;
}

export class CustomWorld extends World implements ICustomWorld {
  constructor(options: IWorldOptions) {
    super(options);
  }
  debug = false;
}

setWorldConstructor(CustomWorld);
