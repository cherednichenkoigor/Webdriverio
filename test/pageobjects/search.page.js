const Page = require("./page");

class SearchPage extends Page{

    open(){
        super.open('/search');
    }
    
}
module.exports = new SearchPage();