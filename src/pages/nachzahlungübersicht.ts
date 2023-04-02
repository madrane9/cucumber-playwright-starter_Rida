import { Locator, Page } from '@playwright/test';

export class NachzahlungÜbersicht {
  readonly page: Page;
  private readonly ersteNachzahlung: Locator;
  private readonly datumErsteNachzahlung: Locator;
  private readonly zweiteNachzahlung: Locator;
  private readonly datumZweiteNachzahlung: Locator;

  constructor(page: Page) {
    this.page = page;
    this.ersteNachzahlung = page.getByRole('cell', { name: '+ Airi Satou' });
    this.zweiteNachzahlung = page.getByRole('cell', { name: '+ Angelica Ramos' });
    this.datumErsteNachzahlung = page.locator("(//td[@class='dt-body-right'])[2]");
    this.datumZweiteNachzahlung = page.locator("//table[@id='example']/tbody[1]/tr[2]/td[5]");
  }

  public async getErsteNachzahlung(): Promise<string | null> {
    return this.ersteNachzahlung.textContent();
  }

  public async getZweiteNachzahlung(): Promise<string | null> {
    return this.zweiteNachzahlung.textContent();
  }
  public async getDatumErsteNachzahlung(): Promise<string | null> {
    return this.datumErsteNachzahlung.textContent();
  }
  public async getDatumZweiteNachzahlung(): Promise<string | null> {
    return this.datumZweiteNachzahlung.textContent();
  }
}
