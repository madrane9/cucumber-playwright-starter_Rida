/* eslint-disable import/order */
import { Calculator } from '../pages/calculator';
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
import { LoginPage } from '../pages/loginpage';
import { promises as fs } from 'fs';

export interface CucumberWorldConstructorParams {
  parameters: { [key: string]: string };
}

export interface ICustomWorld extends World {
  debug: boolean;
  feature?: messages.Pickle;
  context?: BrowserContext;
  page?: Page;
  calculator?: Calculator;
  loginPage?: LoginPage;

  testName?: string;
  startTime?: Date;

  requestContext?: APIRequestContext;
  tracedResponses?: Response[];
  requestPath?: string;
  requestParams?: { [key: string]: string | boolean | number };
  requestResponse?: APIResponse;

  playwrightOptions?: PlaywrightTestOptions;
  saveStorageState(path: string): Promise<void>; // Hier wird die Methode saveStorageState deklariert
}

export class CustomWorld extends World implements ICustomWorld {
  debug = false;
  context?: BrowserContext;
  page?: Page;
  calculator?: Calculator;
  loginPage?: LoginPage;

  testName?: string;
  startTime?: Date;

  requestContext?: APIRequestContext;
  tracedResponses?: Response[];
  requestPath?: string;
  requestParams?: { [key: string]: string | boolean | number };
  requestResponse?: APIResponse;
  constructor(options: IWorldOptions) {
    super(options);
  }
  async saveStorageState(path: string) {
    if (this.context) {
      const storage = await this.context.storageState();
      await fs.writeFile(path, JSON.stringify(storage));
    }
  }
}
setWorldConstructor(CustomWorld);
