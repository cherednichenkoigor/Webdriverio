const { assert } = require('chai');
import chai from 'chai';
const HomePage = require('../pageobjects/homeMaizonPage.page');
const WizardPage = require('../pageobjects/R2Bwizard.page');
import { FinancialDada } from "../model/R2Bwizard/financialData";
import { PersonalData } from "../model/R2Bwizard/personalData";
const fs = require('fs')
const appRoot = require('app-root-path');
const { ImapFlow } = require('imapflow');


describe('Functional R2B wizard tests', () => {

  beforeEach(() => {
    HomePage.open();
  });

  afterEach(() => {
  });
  
        
  it('TC 8433 Check Purchasing Power wizard results', () => {   

    var message;

    const client = new ImapFlow({
      host: 'imap.gmail.com',
      port: 993,
      secure: true,
      auth: {
          user: 'test.acc0732@gmail.com',
          pass: 'Qa-testing007!'
      }
    });

    var financialData = new FinancialDada({
      householdIncome: "160000",
      applicableResources: "250000"
    });

    var personalData = new PersonalData({
      greating: "Herr",
      firstName: "Testfirstname",
      lastName: "Testlastname",
      email: 'test.acc0732@gmail.com',
      phone: "+41 79 111 11 11"
    });

    HomePage.clickCookieButton();
    HomePage.clickKaufkraftBerechnen();
    WizardPage.fillFinancialData(financialData);
    WizardPage.clickConfirmFinancingStep();
    WizardPage.fillPersonalData(personalData);
    WizardPage.clickConfirmPersonalDataStep();
    WizardPage.fillPhoneNumber(personalData);
    WizardPage.clickSendPhoneCode();
    WizardPage.fillVerificationCode("000000");
    browser.pause(1000);
    WizardPage.clickVerifyCode();
    WizardPage.clickConfirmEconomicModelStep();
    browser.pause(2000);
    assert.equal(WizardPage.resultsPageTitle(), personalData.firstName  + ", hier ist Deine Übersicht!");
    WizardPage.clickAnpassen();
    WizardPage.clickFertig();

    const email = async () => {
      await client.connect();  
      let lock = await client.getMailboxLock('INBOX');
      try {
        message = await client.fetchOne('*', {unseen: true, subject: "STAGING: Vielen Dank für Dein Interesse an Maizon", source: true, envelope: true });
        await client.messageDelete('1:*');            
      } finally {
        lock.release();
      }
        await client.logout();
    };  
    
    browser.pause(10000);
    email().catch(err => console.error(err));    
    browser.pause(40000);
    chai.expect(message.source.toString()).to.contain('Hypothek anfragen');
      
  }); 

  const TC_8470_Data = JSON.parse(fs.readFileSync(appRoot + '/test/data/R2Bwizard/TC_8470.json'));
  TC_8470_Data.forEach(function(data){
    it(`8470 Restrictions at the Financing step "${data.householdIncome}" "${data.applicableResources}"` , () => { 

      HomePage.clickCookieButton();
      HomePage.clickKaufkraftBerechnen();  
      WizardPage.fillFinancialData(data);
     
      if(data.errorMessage){
        chai.expect(WizardPage.getFinancingStepErrorMessage()).to.contain(data.errorMessage);
      }
      else{
        chai.expect(WizardPage.elIncomeInput.getValue()).to.contain('500’000 CHF');
        chai.expect(WizardPage.elAssetsInput.getValue()).to.contain('500’000 CHF');            
      }
             
    });
  });

  const TC_8472_Data = JSON.parse(fs.readFileSync(appRoot + '/test/data/R2Bwizard/TC_8472.json'));
  TC_8472_Data.forEach(function(data){
    it(`8472 Restrictions at the Personal info` , () => { 
    
      HomePage.clickCookieButton();
      HomePage.clickKaufkraftBerechnen();  
      WizardPage.clickConfirmFinancingStep();
      WizardPage.fillPersonalData(data);

      var errorMessages = "";
      WizardPage.personalInfoErrorMessagesList.forEach(function (item) {
        errorMessages += " " + item.getText();
      });

      chai.expect(errorMessages).to.contain(data.errorMessages);    
             
    });
  });

  it(`8473 Phone number and verification restrictions` , () => { 

    var personalData = new PersonalData({
      greating: "Herr",
      firstName: "Testfirstname",
      lastName: "Testlastname",
      email: 'test.acc0732@gmail.com',
      phone: "+41 79 111 11 11"
    });

    var personalData1 = new PersonalData({
      phone: "+412121121214545"
    });

    var personalData2 = new PersonalData({
      phone: "+414545"
    });

    HomePage.clickCookieButton();
    HomePage.clickKaufkraftBerechnen();
    WizardPage.clickConfirmFinancingStep();
    WizardPage.fillPersonalData(personalData);
    WizardPage.clickConfirmPersonalDataStep();
    WizardPage.fillPhoneNumber(personalData1);
    chai.expect(WizardPage.phoneErrorMessage).to.contain('Telefonnummer ist ungültig.');

    WizardPage.fillPhoneNumber(personalData2);
    chai.expect(WizardPage.phoneErrorMessage).to.contain('Telefonnummer ist ungültig.');

    WizardPage.fillPhoneNumber(personalData);
    WizardPage.clickSendPhoneCode();
    WizardPage.fillVerificationCode("123456");
    browser.pause(500);
    WizardPage.clickVerifyCode();
    browser.pause(1000);
    chai.expect(WizardPage.codeVerificationErrorMessage).to.contain('Ungültiger Überprüfungscode');    
           
  });

  it(`8471 Recalculation of the price if Financial data is changed` , () => { 

    var financialData = new FinancialDada({
      householdIncome: "150000",
      applicableResources: "50000"
    });

    var financialData1 = new FinancialDada({
      householdIncome: "220000",
      applicableResources: "280000"
      });        

    HomePage.clickCookieButton();
    HomePage.clickKaufkraftBerechnen();  
    WizardPage.fillFinancialData(financialData);
    var price1 = WizardPage.getFinancingStepPrice;

    WizardPage.fillFinancialData(financialData1);
    var price2 = WizardPage.getFinancingStepPrice;

    assert.isTrue(parseInt(price2, 10) > parseInt(price1, 10));
      
    });

  
    
});