import { Locator, Page } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  private readonly emailadresse: Locator;
  private readonly passwort: Locator;
  private readonly loginButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailadresse = page.locator('#login_field');
    this.passwort = page.locator('#password');
    this.loginButton = page.getByRole('button', { name: 'Sign in' });
  }

  public async login(email: string, password: string) {
    await this.emailadresse.type(email);
    await this.passwort.type(password);
    await this.loginButton.click();
  }
}
