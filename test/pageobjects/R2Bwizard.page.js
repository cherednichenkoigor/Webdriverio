const Page = require("./page");
const AppHelper = require('../utilities/helper');

class WizardPage extends Page{

    open(){
        super.open('/calculator');
    }

    getFinancingStepErrorMessage(){
        return $(".v-stepper .error-msg span").getText();
    }

    get personalInfoErrorMessagesList(){
        return $$(".v-messages__message");
    }

    get phoneErrorMessage(){
        return $('[name="Phone number"]').$('..').$('.error-msg').getText();
    }
    
    get codeVerificationErrorMessage(){
        return $(".pl-0.error-msg").getText();
    }

    get getFinancingStepPrice(){
        this.waitProgressbar();
        return $(".v-stepper .h-75").getText().match(/\d/g).join("");
    }

    get elMessengerButton(){
        return $("[title='Messenger button']");
    }

    get elMessageBubble(){
        return $("[title='Message bubble']");
    }

    get elIncomeInput(){
        $("input[name=Income]").waitForExist();
        return $$("input[name=Income]")[0];
    }

    get elAssetsInput(){
        return $$("input[name=Assets]")[0];
    }

    get elPhoneInput(){
        return $("input[placeholder='z.B. +41 79 123 45 67']");
    }

    get elWeiterBtnList(){
        return $$("//span[contains(text(),'Weiter')]");
    }

    get elFirstNameInput(){
        return $("input[name='First name']");
    }

    get elLastNameInput(){
        return $("input[name='Last name']");
    }

    get elEmailInput(){
        return $("input[name='Email']");
    }

    fillFinancialData(financialData){
        AppHelper.fillField(this.elIncomeInput, financialData.householdIncome);
        browser.pause(500);
        this.closeMessagePopUp();
        AppHelper.fillField(this.elAssetsInput, financialData.applicableResources);
        //browser.pause(500);
    }

    fillFinancialDataDesctop(financialData){
        AppHelper.fillField(this.elIncomeInput, financialData.householdIncome);
        browser.pause(500);
        AppHelper.fillField(this.elAssetsInput, financialData.applicableResources);
        //browser.pause(500);
    }

    waitBtnLoader(){
        $("button .v-btn__loader").waitForExist({ reverse: true });             
    }

    waitProgressbar(){
        $("[role='progressbar']").waitForExist({ reverse: true });             
    }
    clickConfirmFinancingStep(){
        this.waitBtnLoader();
        this.waitProgressbar();
        //this.closeMessagePopUp();
        $("//span[contains(text(),'Weiter')]").click();
    }

    clickConfirmEconomicModelStep(){
        this.waitBtnLoader();
        this.elWeiterBtnList[1].click();
    }

    clickKaufkraftBerechnen(){
            $("#button_home_kaufkraft-berechnen").click();
    }

    fillPersonalData(personalData){
        browser.pause(500);
        $$("strong.primary--text").filter(function (element) { return element.textContent === personalData.greeting; })[0].click();
        this.elFirstNameInput.clearValue();
        AppHelper.fillField(this.elFirstNameInput, personalData.firstName);
        AppHelper.fillField(this.elLastNameInput, personalData.lastName);
        AppHelper.fillField(this.elEmailInput, personalData.email);
        this.clickAcceptPrivacyPolicy();
    }

    clickAcceptPrivacyPolicy(){
        $("[role='checkbox']").$("..").click();
    }

    clickConfirmPersonalDataStep(){
        //this.closeMessagePopUp();
        $("//span[contains(text(),'Zur persönlichen Übersicht')]").click();
    }

    fillPhoneNumber(personalData){
        AppHelper.fillField(this.elPhoneInput, personalData.phone);
        //browser.pause(500);            
    }

    clickSendPhoneCode(){
        $("//span[contains(text(),'Code senden')]").click();
    }
    fillVerificationCode(v){
        $(".react-code-input input").waitForDisplayed();
        var code = $$(".react-code-input input");
        var split = v.split('');
        for (var i = 0; i < split.length; i++)
        {
            code[i].setValue(split[i]);
        }
    }

    clickOutsideVerificationCode(){
        $(".verification-input").$("..").$("..").click();
    }

    clickVerifyCode(){
        $("//span[contains(text(),'Überprüfen')]").click();
    }

    clickAnpassen(){
        this.waitBtnLoader();
        $$("button span.v-btn__content").filter(function (element) { return element.getText() === "Anpassen"; })[0].click();
    }

    clickFertig(){
        this.waitBtnLoader();
        $$("button span.v-btn__content").filter(function (element) { return element.getText() === "Fertig"; })[0].click();
    }

    resultsPageTitle(){
        this.waitBtnLoader();
        return $("div.primary--text .text-h2").getText();
    }

    closeMessagePopUp() {
        // this.elMessageBubble.waitForDisplayed({timeout: 20000});
        // browser.execute(() => {
        //     const elemToRemove = document.querySelector("[title='Message bubble']");
        //     elemToRemove.remove();
        // });         
        this.elMessengerButton.waitForDisplayed();
        browser.execute(() => {
            const elemToRemove = document.querySelector("[title='Messenger button']").parentNode.parentNode;
            elemToRemove.remove();
        });
    }
}
module.exports = new WizardPage();