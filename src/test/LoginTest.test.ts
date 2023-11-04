import { Builder, By, WebDriver, until } from "selenium-webdriver";
import assert from "assert";

describe("Login Test", function () {
  let driver:WebDriver;

  beforeEach(async function () {
    driver = await new Builder().forBrowser("chrome").build();
    //driver = await new Builder().forBrowser("chrome").setChromeOptions(new chrome.Options().headless()).build();
    //navigate to the application
    await driver.get(`http://localhost:3000`);
    await driver.manage().window().maximize();
  },10000);

  afterEach(async function () {
    await driver.quit();
  }); 

  it("login with correct credentials", async function () { 
    const loginButton = await driver.findElement(By.id("loginButton"));
    await loginButton.click();
    await driver.wait(until.elementLocated(By.id("loginDialog")), 5000);

    // Überprüfe, ob der Dialog geöffnet wurde
    const isDialogOpen = await driver.findElement(By.id("loginDialog")).isDisplayed();
    assert.strictEqual(isDialogOpen, true, "Der Dialog wurde nicht geöffnet.");
    
    const inputMail = await driver.findElement(By.id("inputEmail"));
    const inputPassword = await driver.findElement(By.id("inputPassword"));
    await inputMail.sendKeys("john@some-host.de");
    await inputPassword.sendKeys("12abcAB!");

    const okButton = await driver.findElement(By.id("okButton"));
    await okButton.click();   

    await driver.wait(until.elementLocated(By.id("logoutButton")), 5000);

    const isLogoutButtonOpen = await driver.findElement(By.id("logoutButton")).isDisplayed();
    assert.strictEqual(isLogoutButtonOpen, true, "Der Logout Button wird nicht angezeigt.");
  },10000);

  it("test login with wrong credentials", async function () {
    // test
    await driver.findElement(By.id("loginButton")).click();

    await driver.wait(until.elementLocated(By.id("loginDialog")), 5000);

    // Überprüfe, ob der Dialog geöffnet wurde
    const isDialogOpen = await driver.findElement(By.id("loginDialog")).isDisplayed();
    assert.strictEqual(isDialogOpen, true, "Der Dialog wurde nicht geöffnet.");

    // Falsche Anmeldeinformationen eingeben
    const inputMail = await driver.findElement(By.id("inputEmail"));
    const inputPassword = await driver.findElement(By.id("inputPassword"));
    await inputMail.sendKeys("john@some-host.de");
    await inputPassword.sendKeys("falschesPasswort");
    const okButton = await driver.findElement(By.id("okButton"));
    await okButton.click();

    await driver.wait(until.elementLocated(By.id("errorMessage")), 5000);

    // Überprüfen, ob eine Fehlermeldung oder ein Verhalten für falsche Anmeldeinformationen angezeigt wird
    const isErrorMessageVisible = await driver.findElement(By.id("errorMessage")).isDisplayed();
    assert.strictEqual(isErrorMessageVisible, true, "Falsche Anmeldeinformationen werden nicht erkannt.");
  },10000);
});
