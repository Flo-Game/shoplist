import assert from "assert";
import { Builder, By, WebDriver, until } from "selenium-webdriver";
import { login } from "../backend/shopperapi";
import { UserResource, UsersResource } from "../Resources";

describe("Create User", function () {
  let driver: WebDriver;

  beforeEach(async function () {
    driver = await new Builder().forBrowser("chrome").build();
    //navigate to the application
    await driver.get("http://localhost:3000");
    await driver.manage().window().maximize();
  });

  afterEach(async function () {
    await driver.quit();
  });

  it("create User Fritz", async function () {
    const loginButton = await driver.findElement(By.id("loginButton"));
    await loginButton.click();
    await driver.wait(until.elementLocated(By.id("loginDialog")), 5000);

    const isDialogOpen = await driver.findElement(By.id("loginDialog")).isDisplayed();
    assert.strictEqual(isDialogOpen, true, "Der Dialog wurde nicht geöffnet.");

    const inputMail = await driver.findElement(By.id("inputEmail"));
    await inputMail.sendKeys("john@some-host.de");
    const inputPassword = await driver.findElement(By.id("inputPassword"));
    await inputPassword.sendKeys("12abcAB!");

    const okButton = await driver.findElement(By.id("okButton"));
    await okButton.click();
    await driver.wait(until.elementLocated(By.id("logoutButton")), 5000);
    const isLogoutButtonOpen = await driver.findElement(By.id("logoutButton")).isDisplayed();
    assert.strictEqual(isLogoutButtonOpen, true, "Der Logout Button wird nicht angezeigt.");

    const clickManagment = driver.findElement(By.linkText("UserManagment"));
    await clickManagment.click();
    await driver.wait(until.elementLocated(By.id("listUsers")), 5000);
    const listUsers = await driver.findElement(By.id("listUsers")).isDisplayed();
    assert.strictEqual(listUsers, true, "Der Dialog wurde nicht geöffnet.");

    driver.findElement(By.id("addUserButton")).click();
    await driver.wait(until.elementLocated(By.id("addUserDialog")), 5000);

    const isDialogOpenAdd = await driver.findElement(By.id("addUserDialog")).isDisplayed();
    assert.strictEqual(isDialogOpenAdd, true, "Der Dialog wurde nicht geöffnet.");

    const inputUsernameAdd = await driver.findElement(By.id("inputUsername"));
    const inputMailAdd = await driver.findElement(By.id("inputEmail"));
    const inputPasswordAdd = await driver.findElement(By.id("inputPassword"));
    await inputUsernameAdd.sendKeys("Fritz");
    await inputMailAdd.sendKeys("fritz@some-host.de");
    await inputPasswordAdd.sendKeys("12abcAB!");

    const addButton = await driver.findElement(By.id("addButton"));
    await addButton.click();

    // Überprüfung ob User im Frontend angelegt wurde
    await driver.wait(until.elementLocated(By.id("user-Fritz")), 5000);
    const userFritz = await driver.findElement(By.id("user-Fritz")).isDisplayed();
    assert.strictEqual(userFritz, true, "Der User Fritz wurde nicht gefunden.");

    //Backend überprüfen
    const loginBackend = await login("john@some-host.de","12abcAB!");
    const jwt = loginBackend.access_token;
    const url = `http://localhost:3000/api/users`;

    const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: ` Bearer ${jwt} `,
        },
    });

    const users: UsersResource = await response.json();
    expect(
      users.users.some((user: UserResource) => {
        return user.name === "Fritz" && user.email === "fritz@some-host.de" && user.admin == false;
      })
    ).toBeTruthy();
  });
});
