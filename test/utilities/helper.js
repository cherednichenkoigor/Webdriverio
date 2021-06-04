const { keys } = require("lodash");

class AppHelper{

    fillField(element, text){
        if (text !== null)
        {
            //element.clearValue();
            element.click();
            browser.keys(['Control', 'a']);
            browser.keys('Back space');
            element.setValue(text);                
        }
    }        

    waitForValue(element, value, timeout) {
        browser.waitUntil(
            function () {
                return element.getAttribute('value') === value;
            },
            {timeout}
        )
    }    
}

module.exports = new AppHelper();
