const { Builder, By, until } = require("selenium-webdriver");
const assert = require("assert");

async function loginWithCorrectCredentials() {
  //launch the browser
  let driver = await new Builder().forBrowser("chrome").build();

  try {
    //navigate to the application
    await driver.get("http://localhost:3000");

    //test
    await driver.findElement(By.className("loginButton")).click();

    await driver.wait(until.elementLocated(By.className("loginDialog")), 5000);

    // Überprüfe, ob der Dialog geöffnet wurde
    const isDialogOpen = await driver
      .findElement(By.className("loginDialog"))
      .isDisplayed();
    assert.strictEqual(isDialogOpen, true, "Der Dialog wurde nicht geöffnet.");

    await driver
      .findElement(By.className("inputEmail"))
      .sendKeys("john@some-host.de");
    await driver
      .findElement(By.className("inputPassword"))
      .sendKeys("12abcAB!");

    await driver.findElement(By.className("okButton")).click();

    await driver.wait(until.elementLocated(By.className("logoutButton")), 5000);

    const isLogoutButtonOpen = await driver
      .findElement(By.className("logoutButton"))
      .isDisplayed();
    assert.strictEqual(
      isLogoutButtonOpen,
      true,
      "Der Logout Button wird nicht angezeigt."
    );

    console.log("Test loginWithCorrectCredentials erfolgreich abgeschlossen");
  } catch (err) {
    console.log("Test loginWithCorrectCredentials error!" + err);
  } finally {
    //close the browser
    await driver.quit();
  }
}

async function testLoginWithWrongCredentials() {
  // launch the browser
  let driver = await new Builder().forBrowser("chrome").build();

  try {
    // navigate to the application
    await driver.get("http://localhost:3000");

    // test
    await driver.findElement(By.className("loginButton")).click();

    await driver.wait(until.elementLocated(By.className("loginDialog")), 5000);

    // Überprüfe, ob der Dialog geöffnet wurde
    const isDialogOpen = await driver
      .findElement(By.className("loginDialog"))
      .isDisplayed();
    assert.strictEqual(isDialogOpen, true, "Der Dialog wurde nicht geöffnet.");

    // Falsche Anmeldeinformationen eingeben
    await driver
      .findElement(By.className("inputEmail"))
      .sendKeys("falscher@nutzer.de");
    await driver
      .findElement(By.className("inputPassword"))
      .sendKeys("falschesPasswort");

    await driver.findElement(By.className("okButton")).click();

    await driver.wait(until.elementLocated(By.className("errorMessage")), 5000);

    // Überprüfen, ob eine Fehlermeldung oder ein Verhalten für falsche Anmeldeinformationen angezeigt wird
    const isErrorMessageVisible = await driver
      .findElement(By.className("errorMessage"))
      .isDisplayed();
    assert.strictEqual(
      isErrorMessageVisible,
      true,
      "Falsche Anmeldeinformationen werden nicht erkannt."
    );

    console.log("Test testLoginWithWrongCredentials erfolgreich abgeschlossen");
  } catch (err) {
    console.log("Test testLoginWithWrongCredentials error!" + err);
  } finally {
    // Browser schließen
    await driver.quit();
  }
}

loginWithCorrectCredentials();
testLoginWithWrongCredentials();
