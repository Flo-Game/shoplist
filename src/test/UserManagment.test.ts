import { Builder, By, WebDriver, until } from "selenium-webdriver";
import assert from "assert";
import chrome from "selenium-webdriver/chrome";
import { UserResource, UsersResource } from "../Resources";
import { login } from "../backend/shopperapi";

describe("User Management Test", function () {
  let driver: WebDriver;

  beforeEach(async function () {
    driver = await new Builder().forBrowser("chrome").setChromeOptions(new chrome.Options()).build();

    await driver.get(`http://localhost:3000`);
    await driver.manage().window().maximize();
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

    // click User Management
    const clickManagment = driver.findElement(By.linkText("UserManagment"));
    await clickManagment.click();
    await driver.wait(until.elementLocated(By.id("listUsers")), 5000);
    const listUsers = await driver.findElement(By.id("listUsers")).isDisplayed();
    assert.strictEqual(listUsers, true, "Der Dialog wurde nicht geöffnet.");
  }, 10000);

  afterEach(async function () {
    await driver.quit();
  });

  it("listing all users and admins", async function () {
    const userJohn = await driver.findElement(By.id("user-John")).isDisplayed();
    assert.strictEqual(userJohn, true, "Der User John wurde nicht gefunden.");
    const userFlo = await driver.findElement(By.id("user-Flo")).isDisplayed();
    assert.strictEqual(userFlo, true, "Der User Flo wurde nicht gefunden.");
  }, 20000);

  it("create user", async function () {
    driver.findElement(By.id("addUserButton")).click();
    await driver.wait(until.elementLocated(By.id("addUserDialog")), 5000);

    const isDialogOpen = await driver.findElement(By.id("addUserDialog")).isDisplayed();
    assert.strictEqual(isDialogOpen, true, "Der Dialog wurde nicht geöffnet.");

    const inputUsername = await driver.findElement(By.id("inputUsername"));
    const inputMail = await driver.findElement(By.id("inputEmail"));
    const inputPassword = await driver.findElement(By.id("inputPassword"));
    await inputUsername.sendKeys("Max");
    await inputMail.sendKeys("max@some-host.de");
    await inputPassword.sendKeys("12abcAB!");

    const addButton = await driver.findElement(By.id("addButton"));
    await addButton.click();

    // Überprüfung ob User im Frontend angelegt wurde
    await driver.wait(until.elementLocated(By.id("user-Max")), 5000);
    const userMax = await driver.findElement(By.id("user-Max")).isDisplayed();
    assert.strictEqual(userMax, true, "Der User Max wurde nicht gefunden.");

    /*
    //überprüfen im backend ob der user angelegt wurde
    const loginRessource = await login("john@some-host.de", "12abcAB!");
    const jwt = loginRessource.access_token;
    console.log(jwt);
    const url = `http://localhost:3000/api/users`;

    console.log("URL: " + url);

    // eslint-disable-next-line no-useless-catch
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
        cache: `no-store`,
      });

      const users: UsersResource = await response.json();
      expect(
        users.users.some((user: UserResource) => {
          return user.name === "TestUser" && user.email === "testuser@gmail.com" && user.admin == false;
        })
      ).toBeTruthy();
    } catch (err) {
      throw err;
    }
    */
  }, 10000);

  it("edit user", async function (){
    const editButton = driver.findElement(By.id("editButton-Flo"));
    await editButton.click();
    await driver.wait(until.elementLocated(By.id("editUserDialog")), 5000);
    const isDialogOpen = await driver.findElement(By.id("editUserDialog")).isDisplayed();
    assert.strictEqual(isDialogOpen, true, "Der Dialog wurde nicht geöffnet.");

    const usernameInput = await driver.findElement(By.id("inputUsername"));
    await usernameInput.clear(); 
    await usernameInput.sendKeys("Florian");
    const emailInput = await driver.findElement(By.id("inputEmail"));
    await emailInput.clear(); 
    await emailInput.sendKeys("florian@some-host.de")

    const editNowButton = await driver.findElement(By.id("editNow"));
    await editNowButton.click();
    await driver.wait(until.elementLocated(By.id("user-Florian")), 5000);
    const userFlorianAdmin = await driver.findElement(By.id("user-Florian")).isDisplayed();
    assert.strictEqual(userFlorianAdmin, true, "Der User Florian wurde nicht gefunden.");
  },10000);

  it("delete user", async function (){
    const deleteButton = await driver.findElement(By.id("deleteButton-Max"));
    await deleteButton.click();
    await driver.sleep(500);

    // Überprüfen das "Max" nicht mehr in der Benutzerliste vorhanden ist
    const isMaxDeleted = await driver.findElement(By.id("user-Max")).isDisplayed().then(
      () => false,
      (error:Error) => error.toString().includes("no such element"),
    );
    assert.strictEqual(isMaxDeleted, true, "Der Benutzer 'Max' wurde nicht gelöscht.");
  },10000);

  it("login with new account", async function (){
    const addButton = driver.findElement(By.id("addUserButton"));
    await addButton.click();
    await driver.wait(until.elementLocated(By.id("addUserDialog")), 5000);

    const isAddDialogOpen = await driver.findElement(By.id("addUserDialog")).isDisplayed();
    assert.strictEqual(isAddDialogOpen, true, "Der Dialog wurde nicht geöffnet.");
    //Informationen in Dialog eintragen
    const inputUsername = await driver.findElement(By.id("inputUsername"));
    const inputEmail = await driver.findElement(By.id("inputEmail"));
    const inputPassword = await driver.findElement(By.id("inputPassword"));
    await inputUsername.sendKeys("Max");
    await inputEmail.sendKeys("max@some-host.de");
    await inputPassword.sendKeys("12abcAB!");

    const addButtonDialog = await driver.findElement(By.id("addButton"));
    await addButtonDialog.click();

    //Check ob User erstellt
    await driver.wait(until.elementLocated(By.id("user-Max")), 5000);
    const userMax = await driver.findElement(By.id("user-Max")).isDisplayed();
    assert.strictEqual(userMax, true, "Der User Max wurde nicht gefunden.");

    //Ausloggen
    const logoutButton = await driver.findElement(By.id("logoutButton"));
    await logoutButton.click();
    await driver.sleep(500);

    //Login mit neuen User
    const loginButton = await driver.findElement(By.id("loginButton"));
    await loginButton.click();
    await driver.wait(until.elementLocated(By.id("loginDialog")), 5000);
    const isLoginDialogOpen = await driver.findElement(By.id("loginDialog")).isDisplayed();
    assert.strictEqual(isLoginDialogOpen, true, "Der Dialog wurde nicht geöffnet.");

    const emailInput = await driver.findElement(By.id("inputEmail"));
    const passwordInput = await driver.findElement(By.id("inputPassword"));
    await emailInput.sendKeys("max@some-host.de");
    await passwordInput.sendKeys("12abcAB!");
    const okButton = await driver.findElement(By.id("okButton"));
    await okButton.click();

    //Check ob eingeloggt
    await driver.wait(until.elementLocated(By.id("logoutButton")), 5000);
    const isLogoutButtonOpenMax = await driver.findElement(By.id("logoutButton")).isDisplayed();
    assert.strictEqual(isLogoutButtonOpenMax, true, "Der Logout Button Max wird nicht angezeigt.");
  },10000);

  it("create User without password ERROR!", async function (){
    const addUserButton = driver.findElement(By.id("addUserButton"));
    await addUserButton.click();
    await driver.wait(until.elementLocated(By.id("addUserDialog")), 5000);

    const isDialogOpen = await driver.findElement(By.id("addUserDialog")).isDisplayed();
    assert.strictEqual(isDialogOpen, true, "Der Dialog wurde nicht geöffnet.");

    const inputUsername = await driver.findElement(By.id("inputUsername"));
    const inputMail = await driver.findElement(By.id("inputEmail"));
    const inputPassword = await driver.findElement(By.id("inputPassword"));
    await inputUsername.sendKeys("Tim");
    await inputMail.sendKeys("tim@some-host.de");
    await inputPassword.sendKeys("");

    const addButton = await driver.findElement(By.id("addButton"));
    await addButton.click();

    await driver.wait(until.elementLocated(By.id("warningMessage")), 5000);
    const warningMessage = await driver.findElement(By.id("warningMessage")).isDisplayed();
    assert.strictEqual(warningMessage, true, "Die Fehlermeldung wurde nicht gefunden.");
  },10000);

  it("clean up test", async function (){
    console.log("Start afterAll");
    //Löschen von User Max
    const deleteButtonMax = await driver.findElement(By.id("deleteButton-Max"));
    await deleteButtonMax.click();

    const editButtonFlo = await driver.findElement(By.id("editButton-Florian"));
    await editButtonFlo.click();
    await driver.wait(until.elementLocated(By.id("editUserDialog")), 5000);
    const isDialogOpen = await driver.findElement(By.id("editUserDialog")).isDisplayed();
    assert.strictEqual(isDialogOpen, true, "Der Dialog wurde nicht geöffnet.");

    await driver.sleep(2000); 

    const usernameInput = await driver.findElement(By.id("inputUsername"));
    usernameInput.clear();
    await driver.sleep(2000);
    await usernameInput.sendKeys("Flo");

    const emailInput = await driver.findElement(By.id("inputEmail"));
    await emailInput.clear(); 
    await emailInput.sendKeys("flo@some-host.de")

    const editNowButton = await driver.findElement(By.id("editNow"));
    await editNowButton.click();

    await driver.wait(until.elementLocated(By.id("user-Flo")), 5000);
    const userFlorianAdmin = await driver.findElement(By.id("user-Flo")).isDisplayed();
    assert.strictEqual(userFlorianAdmin, true, "Der User Flo wurde nicht gefunden.");
  },10000);
});
