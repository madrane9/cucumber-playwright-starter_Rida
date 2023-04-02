import { ICustomWorld } from '../support/custom-world';
import { Given, Then, When } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
const NACHZAHLUNG_URL = 'https://datatables.net/';

Given(
  'eine Liste von Nachzahlungen zu einer Versicherungsnummer',
  async function (this: ICustomWorld) {
    const { page } = this;
    await page?.goto(NACHZAHLUNG_URL);
  },
);

When(
  'ich die die erste Nachzahlung {} und {} vergleiche',
  async function (this: ICustomWorld, ersteNachzahlung: string, zweiteNachzahlung: string) {
    const nachzahlungsübersicht = this.nachzahlungsübersicht!;
    const erste = await nachzahlungsübersicht.getErsteNachzahlung();
    const zweite = await nachzahlungsübersicht.getZweiteNachzahlung();
    expect(erste).toEqual(ersteNachzahlung);
    expect(zweite).toEqual(zweiteNachzahlung);
  },
);

Then(
  'die zuerst abgelegte Nachzahlung soll sortiert nach dem Zeitraum und oben erscheinen',
  async function (this: ICustomWorld) {
    const nachzahlungsübersicht = this.nachzahlungsübersicht!;
    const datum1 = await nachzahlungsübersicht.getDatumErsteNachzahlung();
    const datum2 = await nachzahlungsübersicht.getDatumZweiteNachzahlung();
    const [tag1, monat1, jahr1] = datum1!.split('.');
    const [tag2, monat2, jahr2] = datum2!.split('.');
    const date1 = new Date(parseInt(jahr1), parseInt(monat1) - 1, parseInt(tag1));
    const date2 = new Date(parseInt(jahr2), parseInt(monat2) - 1, parseInt(tag2));
    expect(date1.getTime()).toBeLessThan(date2.getTime());
  },
);
