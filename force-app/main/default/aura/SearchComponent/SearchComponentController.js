({
	handleSearch : function(component, event, helper) {
        debugger;
        console.log('searched string',component.get('v.searchText'));
        var searchString=component.get('v.searchText');
        if(searchString!=undefined)
        {
            searchString=searchString.trim();
            var searchEvent=component.getEvent('searchAccount');
            searchEvent.setParams({
                'searchtext':searchString
            })
            searchEvent.fire();    
        }
        else
        {
            console.log('Nothing is provided');
        }
	}
})