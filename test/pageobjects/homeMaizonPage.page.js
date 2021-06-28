const Page = require("./page");

class HomePage extends Page{

    open(){
        super.open('/');
    }

    get elKaufkraftBtn() {
        return $("#button_home_kaufkraft-berechnen");
    }
    
    get elCookieBtn() {
        return $("button.Cookie__button");
    }
    
    clickCookieButton(){
        this.elCookieBtn.waitForDisplayed();  
        browser.pause(1500);
        this.elCookieBtn.click();
    } 
    
    clickCookieButtonForFunctionalTests(){
        if(this.elCookieBtn.isExisting())  
            this.elCookieBtn.click();
    }

    clickKaufkraftBerechnen(){
        this.elKaufkraftBtn.waitForDisplayed();
        this.elKaufkraftBtn.click();
    }

}
module.exports = new HomePage();