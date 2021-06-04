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
        this.elCookieBtn.click();
    }    

    clickKaufkraftBerechnen(){
        this.elKaufkraftBtn.waitForDisplayed();
        this.elKaufkraftBtn.click();
    }

}
module.exports = new HomePage();