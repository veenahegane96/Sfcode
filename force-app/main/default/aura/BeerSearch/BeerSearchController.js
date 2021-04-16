({
	onchange : function(component, event, helper) {
        debugger;
		var textTosearch= component.get('v.searchkeys');
        console.log('textTosearch',textTosearch);
        var getSearchEvent=component.getEvent('searchBeer'); 
        getSearchEvent.setParams({
            'searchtext':textTosearch
        });
        getSearchEvent.fire();
	}
})