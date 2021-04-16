({
    openModal : function(component, event, helper) {
        component.find('overlay').showCustomModal({
            header: "Test Modal Header",
            body: 'This is test modal',
            footer: 'Test footer',
            showCloseButton: true,
            closeCallback: function() {
                alert('You closed the alert!');
            }
        })
    },
    navigateAccount: function(component, event, helper)
    {
        var navService=component.find('navigateAccount');
        var url={
            type: 'standard__objectPage',
            attributes: {
                objectApiName: 'Account',
                actionName: 'list'
            },
            state: {
                filterName: '00B5g00000ArLg8EAF'    
            }
        };
        component.set('v.pageReference',url);
        navService.navigate(url);
        //filterName=00B5g00000ArLg8EAF
    },
    navigateBeerExplorer: function(component, event, helper)
    {
        debugger;
        var navService=component.find('navaigateExplorer');
        var beerexplorer={
            type: 'standard__component',
            attributes: {
                componentName: "c__BeerExplorer"    
            },
            state: {
                filterName: '00B5g00000ArLg8EAF'    
            }
        };
        component.set('v.pageReference',beerexplorer);
        navService.navigate(beerexplorer);
        
    },
    dynamicButton: function(component, event, helper)
    {
        debugger;
        $A.createComponent('lightning:button',
                           {
                               'aura:id':'newButton',
                               'label':'This is runtime button',
                               'type':'submit',
                               'onclick':component.getReference('c.handleClick')
                           },function(createdButton, status, errorMsg){
                               alert(status);
                               if(status=='SUCCESS'){
                                   var body=component.get('v.body');
                                   body.push(createdButton);
                                   component.set('v.body',body);
                                   alert('Dynamic button is created');
                               } 
                               else
                               {
                                   alert(status);
                               }
                           });
        
    
        
    },
    handleClick: function(component, event, helper){
      alert('dynamic button is clicked');
    }
})