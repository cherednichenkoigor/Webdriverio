import chai from 'chai';
import { assert } from 'console';
import HomePage from '../pageobjects/homeMaizonPage.page';
const SearchPage = require('../pageobjects/search.page');
const fs = require('fs')
const appRoot = require('app-root-path');


describe('Functional Search tests', () => {

  beforeEach(() => {
    SearchPage.open();
  });

  afterEach(() => {
    browser.execute('window.sessionStorage.clear()');
  });
  

  const TC_8476_Data = JSON.parse(fs.readFileSync(appRoot + '/test/data/search/TC_8476.json'));
  TC_8476_Data.forEach(function(data){
    it(`TC 8476 Search by property types` , () => { 

      HomePage.clickCookieButtonForFunctionalTests();
      SearchPage.clickNextBtn();
      SearchPage.selectPropertyType(data.propertyType);
      SearchPage.clickSearchBtn();
      SearchPage.openFirstSearchResult();
      var adDetails = SearchPage.getAdDetails();

      chai.expect(data.propertyTypeGerman).to.contain(adDetails.propertyType);
    });
  });

  it(`TC 8478 Search by Financial situation` , () => { 

    HomePage.clickCookieButtonForFunctionalTests();
    SearchPage.clickNextBtn();
    SearchPage.clickNextBtn();
    SearchPage.clickNextBtn();
    SearchPage.clickNextBtn();
    SearchPage.setSearchFinancialData();
    SearchPage.clickSearchBtn();

    var results = SearchPage.getPreviewSearchResultsList();
    
    results.forEach(item => {
      if(item.price < 100000)
        chai.expect(item.price <= 1700, `${item.price} !<= 1840`).to.equal(true);
      else
        chai.expect(item.price <= 728000, `${item.price} !<= 788700`).to.equal(true);
    });
  });

});