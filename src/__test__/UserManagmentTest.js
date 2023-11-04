const { Builder, By, until } = require("selenium-webdriver");
const assert = require("assert");

async function login(email, password) {
  const driver = new Builder().forBrowser("chrome").build();

  try {
    await driver.get("http://localhost:3000");
    await driver.manage().window().maximize();

    await driver.findElement(By.className("loginButton")).click();
    await driver.wait(until.elementLocated(By.className("loginDialog")), 5000);

    const isDialogOpen = await driver
      .findElement(By.className("loginDialog"))
      .isDisplayed();
    assert.strictEqual(isDialogOpen, true, "Der Dialog wurde nicht geöffnet.");

    const emailInput = await driver.findElement(By.className("inputEmail"));
    const passwordInput = await driver.findElement(
      By.className("inputPassword")
    );

    await emailInput.sendKeys(email);
    await passwordInput.sendKeys(password);

    await driver.findElement(By.className("okButton")).click();
    console.log("Login erfolgreich");  
    return driver;
  } catch (error) {
    console.error("Fehler beim Anmelden:", error);
    return null;
  }
}

async function listUsers() {
  let driver = null;
  try {
    //Login
    driver = await login("john@some-host.de", "12abcAB!");
    await driver.wait(until.elementLocated(By.className("logoutButton")), 5000);
    const isLogoutButtonOpen = await driver.findElement(By.className("logoutButton")).isDisplayed();
    assert.strictEqual(isLogoutButtonOpen, true, "Der Logout Button wird nicht angezeigt.");

    //Test UserManagment
    driver.findElement(By.linkText("UserManagment")).click();
    await driver.wait(until.elementLocated(By.className("listUsers")), 5000);
    const listUsers = await driver.findElement(By.className("listUsers")).isDisplayed();
    assert.strictEqual(listUsers, true, "Der Dialog wurde nicht geöffnet.");

    const userJohn = await driver.findElement(By.className("user-John")).isDisplayed();
    assert.strictEqual(userJohn, true, "Der User John wurde nicht gefunden.");
    const userFlo = await driver.findElement(By.className("user-Flo")).isDisplayed();
    assert.strictEqual(userFlo, true, "Der User Flo wurde nicht gefunden.");

    console.log("Test listUsers erfolgreich abgeschlossen!");
  } catch (err) {
    console.log("Test listUsers error! " + err);
  } finally {
    await driver.quit();
  }
}

//User erstllen
async function createUser(){
  let driver = null;
  try{
    //Login
    driver = await login("john@some-host.de", "12abcAB!");
    await driver.wait(until.elementLocated(By.className("logoutButton")), 5000);
    const isLogoutButtonOpen = await driver.findElement(By.className("logoutButton")).isDisplayed();
    assert.strictEqual(isLogoutButtonOpen, true, "Der Logout Button wird nicht angezeigt.");

    driver.findElement(By.linkText("UserManagment")).click();
    await driver.wait(until.elementLocated(By.className("listUsers")), 5000);
    const listUsers = await driver.findElement(By.className("listUsers")).isDisplayed();
    assert.strictEqual(listUsers, true, "Der Dialog wurde nicht geöffnet.");

    driver.findElement(By.className("addUserButton ms-3 mb-3")).click();
    await driver.wait(until.elementLocated(By.className("addUserDialog")), 5000);

    const isDialogOpen = await driver.findElement(By.className("addUserDialog")).isDisplayed();
    assert.strictEqual(isDialogOpen, true, "Der Dialog wurde nicht geöffnet.");

    await driver.findElement(By.className("inputUsername")).sendKeys("Max");
    await driver.findElement(By.className("inputEmail")).sendKeys("max@some-host.de");
    await driver.findElement(By.className("inputPassword")).sendKeys("12abcAB!");

    await driver.findElement(By.className("addButton")).click();

    await driver.wait(until.elementLocated(By.className("user-Max")), 5000);
    const userMax = await driver.findElement(By.className("user-Max")).isDisplayed();
    assert.strictEqual(userMax, true, "Der User Max wurde nicht gefunden.");

    console.log("Test createUser erfolgreich abgeschlossen!");
  }catch(err){
    console.log("Test createUser error! " + err);
  }finally{
    await driver.quit();
  }
}

//Admin erstllen
async function createAdmin(){
  let driver = null;
  try{
    //Login
    driver = await login("john@some-host.de", "12abcAB!");
    await driver.wait(until.elementLocated(By.className("logoutButton")), 5000);
    const isLogoutButtonOpen = await driver.findElement(By.className("logoutButton")).isDisplayed();
    assert.strictEqual(isLogoutButtonOpen, true, "Der Logout Button wird nicht angezeigt.");

    driver.findElement(By.linkText("UserManagment")).click();
    await driver.wait(until.elementLocated(By.className("listUsers")), 5000);
    const listUsers = await driver.findElement(By.className("listUsers")).isDisplayed();
    assert.strictEqual(listUsers, true, "Der Dialog wurde nicht geöffnet.");

    driver.findElement(By.className("addUserButton ms-3 mb-3")).click();
    await driver.wait(until.elementLocated(By.className("addUserDialog")), 5000);

    const isDialogOpen = await driver.findElement(By.className("addUserDialog")).isDisplayed();
    assert.strictEqual(isDialogOpen, true, "Der Dialog wurde nicht geöffnet.");

    await driver.findElement(By.className("inputUsername")).sendKeys("MaxAdmin");
    await driver.findElement(By.className("inputEmail")).sendKeys("maxAdmin@some-host.de");
    await driver.findElement(By.className("inputPassword")).sendKeys("12abcAB!");
    await driver.findElement(By.id("formAdminCheckbox")).click();

    await driver.findElement(By.className("addButton")).click();

    await driver.wait(until.elementLocated(By.className("user-MaxAdmin")), 5000);
    const userMaxAdmin = await driver.findElement(By.className("user-MaxAdmin")).isDisplayed();
    assert.strictEqual(userMaxAdmin, true, "Der User Max wurde nicht gefunden.");

    console.log("Test createUser erfolgreich abgeschlossen!");
  }catch(err){
    console.log("Test createUser error! " + err);
  }finally{
    await driver.quit();
  }
}

async function editUser(){
  let driver = null;
  try{
    //Login
    driver = await login("john@some-host.de", "12abcAB!");
    await driver.wait(until.elementLocated(By.className("logoutButton")), 5000);
    const isLogoutButtonOpen = await driver.findElement(By.className("logoutButton")).isDisplayed();
    assert.strictEqual(isLogoutButtonOpen, true, "Der Logout Button wird nicht angezeigt.");

    driver.findElement(By.linkText("UserManagment")).click();
    await driver.wait(until.elementLocated(By.className("listUsers")), 5000);
    const listUsers = await driver.findElement(By.className("listUsers")).isDisplayed();
    assert.strictEqual(listUsers, true, "Der Dialog wurde nicht geöffnet.");

    driver.findElement(By.className("editButton-Flo")).click();
    await driver.wait(until.elementLocated(By.className("editUserDialog")), 5000);
    const isDialogOpen = await driver.findElement(By.className("editUserDialog")).isDisplayed();
    assert.strictEqual(isDialogOpen, true, "Der Dialog wurde nicht geöffnet.");

    const usernameInput = await driver.findElement(By.className("inputUsername"));
    await usernameInput.clear(); 
    await usernameInput.sendKeys("Florian");
    const usernameEmail = await driver.findElement(By.className("inputEmail"));
    await usernameEmail.clear(); 
    await usernameEmail.sendKeys("florian@some-host.de")

    await driver.findElement(By.className("editNow")).click();

    await driver.wait(until.elementLocated(By.className("user-Florian")), 5000);
    const userFlorianAdmin = await driver.findElement(By.className("user-Florian")).isDisplayed();
    assert.strictEqual(userFlorianAdmin, true, "Der User Florian wurde nicht gefunden.");

    console.log("Test editUser erfolgreich abgeschlossen!");
  }catch(err){
    console.log("Test editUser error! " + err);
  }finally{
    await driver.quit();
  }
}

async function deleteUser(){
  let driver = null;
  try{
    //Login
    driver = await login("john@some-host.de", "12abcAB!");
    await driver.wait(until.elementLocated(By.className("logoutButton")), 5000);
    const isLogoutButtonOpen = await driver.findElement(By.className("logoutButton")).isDisplayed();
    assert.strictEqual(isLogoutButtonOpen, true, "Der Logout Button wird nicht angezeigt.");

    driver.findElement(By.linkText("UserManagment")).click();
    await driver.wait(until.elementLocated(By.className("listUsers")), 5000);
    const listUsers = await driver.findElement(By.className("listUsers")).isDisplayed();
    assert.strictEqual(listUsers, true, "Die Liste wurde nicht geöffnet.");

    await driver.findElement(By.className("deleteButton-Flo")).click();
    await driver.sleep(500);

    // Überprüfen das "Flo" nicht mehr in der Benutzerliste vorhanden ist
    const isFloDeleted = await driver.findElement(By.className("user-Flo")).isDisplayed().then(
      () => false,
      (error) => error.toString().includes("no such element"),
    );
    assert.strictEqual(isFloDeleted, true, "Der Benutzer 'Flo' wurde nicht gelöscht.");

    console.log("Test deleteUser erfolgreich abgeschlossen!");
  }catch(err){
    console.log("Test deleteUser error! " + err);
  }finally{
    await driver.quit();
  }
}

async function loginWithNewAcc(){
  let driver = null;
  try{
    //1. Login
    driver = await login("john@some-host.de", "12abcAB!");
    await driver.wait(until.elementLocated(By.className("logoutButton")), 5000);
    const isLogoutButtonOpenJohn = await driver.findElement(By.className("logoutButton")).isDisplayed();
    assert.strictEqual(isLogoutButtonOpenJohn, true, "Der Logout Button John wird nicht angezeigt.");

    //User Liste finden
    driver.findElement(By.linkText("UserManagment")).click();
    await driver.wait(until.elementLocated(By.className("listUsers")), 5000);
    const listUsers = await driver.findElement(By.className("listUsers")).isDisplayed();
    assert.strictEqual(listUsers, true, "Der Dialog wurde nicht geöffnet.");

    //add User
    driver.findElement(By.className("addUserButton ms-3 mb-3")).click();
    await driver.wait(until.elementLocated(By.className("addUserDialog")), 5000);

    const isAddDialogOpen = await driver.findElement(By.className("addUserDialog")).isDisplayed();
    assert.strictEqual(isAddDialogOpen, true, "Der Dialog wurde nicht geöffnet.");
    //Informationen in Dialog eintragen
    await driver.findElement(By.className("inputUsername")).sendKeys("Max");
    await driver.findElement(By.className("inputEmail")).sendKeys("max@some-host.de");
    await driver.findElement(By.className("inputPassword")).sendKeys("12abcAB!");

    await driver.findElement(By.className("addButton")).click();

    //Check ob User erstellt
    await driver.wait(until.elementLocated(By.className("user-Max")), 5000);
    const userMax = await driver.findElement(By.className("user-Max")).isDisplayed();
    assert.strictEqual(userMax, true, "Der User Max wurde nicht gefunden.");

    //Ausloggen
    await driver.findElement(By.className("logoutButton")).click();
    console.log("Logout erfolgreich");
    await driver.sleep(500);

    //Login mit neuen User
    await driver.findElement(By.className("loginButton")).click();
    await driver.wait(until.elementLocated(By.className("loginDialog")), 5000);
    const isLoginDialogOpen = await driver.findElement(By.className("loginDialog")).isDisplayed();
    assert.strictEqual(isLoginDialogOpen, true, "Der Dialog wurde nicht geöffnet.");

    const emailInput = await driver.findElement(By.className("inputEmail"));
    const passwordInput = await driver.findElement(By.className("inputPassword"));
    await emailInput.sendKeys("max@some-host.de");
    await passwordInput.sendKeys("12abcAB!");
    await driver.findElement(By.className("okButton")).click();

    //Check ob eingeloggt
    await driver.wait(until.elementLocated(By.className("logoutButton")), 5000);
    const isLogoutButtonOpenMax = await driver.findElement(By.className("logoutButton")).isDisplayed();
    assert.strictEqual(isLogoutButtonOpenMax, true, "Der Logout Button Max wird nicht angezeigt.");

    console.log("Test loginWithNewAcc erfolgreich abgeschlossen!");
  }catch(err){
    console.log("Test loginWithNewAcc error! " + err);
  }finally{
    await driver.quit();
  }
}

async function createUserWithoutPassword(){
  let driver = null;
  try{
    driver = await login("john@some-host.de", "12abcAB!");
    await driver.wait(until.elementLocated(By.className("logoutButton")), 5000);
    const isLogoutButtonOpen = await driver.findElement(By.className("logoutButton")).isDisplayed();
    assert.strictEqual(isLogoutButtonOpen, true, "Der Logout Button wird nicht angezeigt.");

    driver.findElement(By.linkText("UserManagment")).click();
    await driver.wait(until.elementLocated(By.className("listUsers")), 5000);
    const listUsers = await driver.findElement(By.className("listUsers")).isDisplayed();
    assert.strictEqual(listUsers, true, "Der Dialog wurde nicht geöffnet.");

    driver.findElement(By.className("addUserButton ms-3 mb-3")).click();
    await driver.wait(until.elementLocated(By.className("addUserDialog")), 5000);

    const isDialogOpen = await driver.findElement(By.className("addUserDialog")).isDisplayed();
    assert.strictEqual(isDialogOpen, true, "Der Dialog wurde nicht geöffnet.");

    await driver.findElement(By.className("inputUsername")).sendKeys("Max");
    await driver.findElement(By.className("inputEmail")).sendKeys("max@some-host.de");
    await driver.findElement(By.className("inputPassword")).sendKeys("");

    await driver.findElement(By.className("addButton")).click();

    await driver.wait(until.elementLocated(By.className("warningMessage")), 5000);
    const warningMessage = await driver.findElement(By.className("warningMessage")).isDisplayed();
    assert.strictEqual(warningMessage, true, "Die Fehlermeldung wurde nicht gefunden.");

    console.log("Test createUserWithoutPassword erfolgreich abgeschlossen!");
  }catch(err){
    console.log("Test createUserWithoutPassword error! " + err);
  }finally{
    await driver.quit();
  }
}

async function createUserWhichAlreadyExists(){
  let driver = null;
  try{
    driver = await login("john@some-host.de", "12abcAB!");
    await driver.wait(until.elementLocated(By.className("logoutButton")), 5000);
    const isLogoutButtonOpen = await driver.findElement(By.className("logoutButton")).isDisplayed();
    assert.strictEqual(isLogoutButtonOpen, true, "Der Logout Button wird nicht angezeigt.");

    driver.findElement(By.linkText("UserManagment")).click();
    await driver.wait(until.elementLocated(By.className("listUsers")), 5000);
    const listUsers = await driver.findElement(By.className("listUsers")).isDisplayed();
    assert.strictEqual(listUsers, true, "Der Dialog wurde nicht geöffnet.");

    driver.findElement(By.className("addUserButton ms-3 mb-3")).click();
    await driver.wait(until.elementLocated(By.className("addUserDialog")), 5000);

    const isDialogOpen = await driver.findElement(By.className("addUserDialog")).isDisplayed();
    assert.strictEqual(isDialogOpen, true, "Der Dialog wurde nicht geöffnet.");

    await driver.findElement(By.className("inputUsername")).sendKeys("John");
    await driver.findElement(By.className("inputEmail")).sendKeys("max@some-host.de");
    await driver.findElement(By.className("inputPassword")).sendKeys("12abcAB!");

    await driver.findElement(By.className("addButton")).click();

    await driver.wait(until.elementLocated(By.className("warningMessage")), 5000);
    const warningMessage = await driver.findElement(By.className("warningMessage")).isDisplayed();
    assert.strictEqual(warningMessage, true, "Die Fehlermeldung wurde nicht gefunden.");

    const warningMessageElement = await driver.findElement(By.className("warningMessage"));
    const warningMessageText = await warningMessageElement.getText();

    assert.strictEqual(warningMessageText, "Name already exists! (body name, value John)", "Falsche Fehlermeldung angezeigt.");

    console.log("Test createUserWhichAlreadyExists erfolgreich abgeschlossen!");
  }catch(err){
    console.log("Test createUserWhichAlreadyExists error! " + err);
  }finally{
    await driver.quit();
  }
}

async function userCantSeeUserManagment(){
  let driver = null;
  try{
    //Login
    driver = await login("flo@some-host.de", "12abcAB!");
    await driver.wait(until.elementLocated(By.className("logoutButton")), 5000);
    const isLogoutButtonOpen = await driver.findElement(By.className("logoutButton")).isDisplayed();
    assert.strictEqual(isLogoutButtonOpen, true, "Der Logout Button wird nicht angezeigt.");

    const userManagmentLink = await driver.findElements(By.linkText("UserManagment"));
    assert.strictEqual(userManagmentLink.length, 0, "Der Link zu UserManagment sollte nicht sichtbar sein.");

    console.log("Test userCantSeeUserManagment erfolgreich abgeschlossen!");
  }catch(err){
    console.log("Test userCantSeeUserManagment error! " + err);
  }finally{
    await driver.quit();
  }
}

//listUsers();
//createUser();
//createAdmin();
//editUser();
//deleteUser();
//loginWithNewAcc();
//createUserWithoutPassword();
//createUserWhichAlreadyExists();
userCantSeeUserManagment();
