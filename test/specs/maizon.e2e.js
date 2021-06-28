import chai from 'chai';
const HomePage = require('../pageobjects/homeMaizonPage.page');
const WizardPage = require('../pageobjects/R2Bwizard.page');


describe('Compare R2B wizard steps screenshots', () => {

    function check(step) {
        browser.pause(500); 
        expect(browser.checkFullPageScreen(step, {
            hideElements: [
                WizardPage.elMessengerButton,
                WizardPage.elMessageBubble],
            removeElements: [
                WizardPage.elMessengerButton,
                WizardPage.elMessageBubble]               
        })).toEqual(0);       
    }    
  
    var personalData = {
        greating: "Herr",
        firstName: "Testfirstname",
        lastName: "Testlastname",
        email: 'test-smth@testmail.testcom',
        phone: "+41 79 111 11 11"
    };
    
    beforeEach(() => {
    });

    afterEach(() => {
    });

    it('R2B Home page step', () => {          
        HomePage.open();
        HomePage.clickCookieButton();  
    });

    it('Compare R2B Financing step', () => {
        browser.pause(2000);          
        HomePage.clickKaufkraftBerechnen();
        WizardPage.waitProgressbar();
        browser.pause(500);
        WizardPage.closeMessagePopUp();
        check('R2B_FinancingStep');      
    });

    it('Compare R2B Personal Data step', () => {                
        WizardPage.clickConfirmFinancingStep();
        WizardPage.fillPersonalData(personalData);
        check('R2B_PersonalDataStep');       
    });

    it('Compare R2B Phone number step', () => {          
        WizardPage.clickConfirmPersonalDataStep();
        check('R2B_PhoneNumberStep');
    });

    it('Compare R2B Phone verification step', () => {          
        WizardPage.fillPhoneNumber(personalData);    
        WizardPage.clickSendPhoneCode();
        WizardPage.fillVerificationCode("000000");
        WizardPage.clickOutsideVerificationCode();
        check('R2B_ConfirmPhoneNumberStep');  
    });

    it('Compare R2B Economic Model step', () => {                 
        WizardPage.clickVerifyCode();
        browser.pause(500);
        check('R2B_EconomicModelStep');
    });

    it('Compare R2B Wizard results', () => {             
        WizardPage.clickConfirmEconomicModelStep();
        browser.pause(500);
        check('R2B_Results');      
    });
    
});