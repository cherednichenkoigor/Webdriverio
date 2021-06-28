const Page = require("./page");

class SearchPage extends Page{

    open(){        
        super.open('/search');       
    }
    
    clickNextBtn(){
        $("//span[contains(text(), 'Weiter')]").click();
    }

    clickSearchBtn(){
        $("//span[contains(text(), 'Ergebnisse')]").click();
    }

    selectPropertyType(propertyType){
        switch (propertyType) {
            case 'House':
                $(".icon-single-house").click();
                break;
            case 'Apartment':
                $(".icon-flat").click();
                break;
            case 'Townhouse':
                $(".icon-multi-house").click();
                break;
            default:
                break;
        }
    }

    waitSearchResults(){
        $(".search-result-item").waitForEnabled();
    }

    openFirstSearchResult(){
        this.waitSearchResults();
        $$(".search-result-item")[1].click();
    }

    getAdDetails(){
        var adDetails = {
            propertyType: $(".icon-single-house").$("..").$(".text-center").getText()
        };

        return adDetails;
    }

    setSearchFinancialData(){
        $$(".vue-slider-rail")[0].dragAndDrop({ x: -102, y: 0 });
        $$(".vue-slider-rail")[1].dragAndDrop({ x: -160, y: 0 });
    }

    getPreviewSearchResultsList(){
        $(".search-result-item").waitForDisplayed();
        var resultsList = [];

        $$(".search-result-item").forEach(item => {
            var listItem = {
                price: parseInt(item.$('.text-h2').getText().match(/\d/g).join("")),
                address: item.$('.text-subtitle').getText(),
                // rooms: item.$$('span[notranslate]')[0].getText(),
                // livingArea: item.$$('span[notranslate]')[1].getText()
            }
            resultsList.push(listItem);
        });

        return resultsList;
    }
}
module.exports = new SearchPage();