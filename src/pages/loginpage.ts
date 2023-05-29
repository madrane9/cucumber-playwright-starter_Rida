import { Locator, Page } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  private readonly emailadresse: Locator;
  private readonly passwort: Locator;
  private readonly loginButton: Locator;
  private readonly logoutButton: Locator;
  private readonly AddmyFirstAdressButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailadresse = page.locator('#email');
    this.passwort = page.locator("input[type='password']");
    this.loginButton = page.locator('button#SubmitLogin>span');
    this.logoutButton = page.locator('a.logout');
    this.AddmyFirstAdressButton = page.locator("//span[text()='Add my first address']");
  }

  public async login(email: string, password: string) {
    await this.emailadresse.type(email);
    await this.passwort.type(password);
    await this.loginButton.click();
  }

  public async logout() {
    await this.logoutButton.click();
  }

  public async ClickMyFirstAdress() {
    await this.AddmyFirstAdressButton.click();
  }
}
