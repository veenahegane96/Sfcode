({
    orderBeer : function(component, event, helper) {
       
        var navService=component.find('navigateBeerOrder');
        var navorderBeerForm={
            type: 'standard__component',
            attributes: {
                componentName: "c__OrderBeerForm"    
            },
            state: {
                'beerId__c' : component.get('v.beerRecordId')    
            }
        };
        component.set('v.pageReference',navorderBeerForm);
        navService.navigate(navorderBeerForm);
    }
})