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
import { browser as globalBrowser } from './common-hooks'; // Importiere das `browser`-Objekt aus der `common hooks`-Datei

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
  browser: typeof globalBrowser; // Fügen Sie das `browser`-Objekt hier hinzu
  testName?: string;
  startTime?: Date;
  requestContext?: APIRequestContext;
  tracedResponses?: Response[];
  requestPath?: string;
  requestParams?: { [key: string]: string | boolean | number };
  requestResponse?: APIResponse;
  playwrightOptions?: PlaywrightTestOptions;
  saveStorageState(path: string): Promise<void>; // Hier wird die Methode saveStorageState deklariert
  setStorageState(path: string): Promise<void>; // Die Methode setStorageState wird hier deklariert
}

export class CustomWorld extends World implements ICustomWorld {
  debug = false;
  context?: BrowserContext;
  page?: Page;
  calculator?: Calculator;
  loginPage?: LoginPage;
  browser = globalBrowser; // Initialisieren Sie das `browser`-Objekt hier
  testName?: string;
  startTime?: Date;
  requestContext?: APIRequestContext;
  tracedResponses?: Response[];
  requestPath?: string;
  requestParams?: { [key: string]: string | boolean | number };
  requestResponse?: APIResponse;

  constructor(options: IWorldOptions) {
    super(options);
    this.browser = globalBrowser; // Setzen Sie das `browser`-Objekt hier
  }

  async saveStorageState(path: string) {
    if (this.context) {
      const storage = await this.context.storageState();
      await fs.writeFile(path, JSON.stringify(storage));
    }
  }

  async setStorageState(path: string) {
    if (this.context) {
      // Laden Sie den gespeicherten Zustand aus der JSON-Datei
      const storageState = JSON.parse(await fs.readFile(path, 'utf-8'));
      this.context = await this.browser.newContext({
        storageState, // use the storageState here
        acceptDownloads: true,
        recordVideo: process.env.PWVIDEO ? { dir: 'screenshots' } : undefined,
        viewport: { width: 1200, height: 800 },
      });
    }
  }
}

setWorldConstructor(CustomWorld);
