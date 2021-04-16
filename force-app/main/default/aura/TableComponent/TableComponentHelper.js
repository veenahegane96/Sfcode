({
    showTableData: function(component,event,helper,getSearchstring)
    {
      var action=component.get('c.getAccounts');
        if(getSearchstring!=''&&getSearchstring!=null&&getSearchstring!=undefined){
            //set the page no to 1 as after search pages should set from 1 onwards with data
            component.set('v.currentPageNo',1);
            action.setParams({
                'searchkey':getSearchstring
            });
        }else
        {
            action.setParams({});
        }
        action.setCallback(this,function(response){
            var state=response.getState();
            console.log(state);
            if(state==='SUCCESS')
            {
                component.set('v.allAccountlist',response.getReturnValue());
                component.set('v.filterAccountlist',component.get('v.allAccountlist'))
                console.log('Accounts',response.getReturnValue());
                
                var listToShow=component.get('v.filterAccountlist');

                var totalRecordcount=listToShow.length;
                console.log('length of list-->',listToShow.length);
                var tablelist=[];
                var currentpageNo=component.get('v.currentPageNo');
                var eachpagerecords=component.get('v.pageSize');
                
                if(totalRecordcount!=0)
                {
                    var pageCount=component.get('v.currentPageNo');
                    var getlist=component.get('v.filterAccountlist');
                    this.pagination(component,getlist,pageCount);      
                }
                else
                {
                    console.log('fetched count is'+ totalRecordcount);
                    component.set('v.tablelist',listToShow);
                    component.set('v.PreviousbuttonDisable',true);
                    component.set('v.NextbuttonDisable',true);
                }
            }
            else
            {
                var toastEvent = $A.get('e.force:showToast');
                toastEvent.setParams({
                    'type':'error',
                    'title': 'Failure!',
                    'message': 'Unable to fetch records'
                });
                toastEvent.fire();
            }
        });
        $A.enqueueAction(action);         
    },
    
	sortData : function(component,fieldName,sortDirection){
        var data = component.get('v.filterAccountlist');
        //function to return the value stored in the field
        var key = function(a) { return a[fieldName]; }
        var reverse = sortDirection == 'asc' ? 1: -1;
        
        // to handel number/currency type fields 
        if(fieldName == 'Phone'){ 
            data.sort(function(a,b){
                var a = key(a) ? key(a) : '';
                var b = key(b) ? key(b) : '';
                return reverse * ((a>b) - (b>a));
            }); 
        }
        else{// to handel text type fields 
            data.sort(function(a,b){ 
                var a = key(a) ? key(a).toLowerCase() : '';//To handle null values , uppercase records during sorting
                var b = key(b) ? key(b).toLowerCase() : '';
                return reverse * ((a>b) - (b>a));
            });    
        }
        //set sorted data to accountData attribute
        component.set('v.filterAccountlist',data);
        this.pagination(component,data,component.get('v.currentPageNo'));
    },
    
    pagination :function(component, listofRecords, pageCount){
        
        var countTotalPage = Math.ceil(listofRecords.length/component.get('v.pageSize'));
        var pagesize=component.get('v.pageSize');
        var fetchRecordtill=pageCount*pagesize;
        var start=(pageCount-1)*pagesize;
 
        var fetchNextrecords=[];
        for(start;start<fetchRecordtill;start++)
        {
            if(listofRecords[start])
            {
                fetchNextrecords.push(listofRecords[start]);
            }
        }
        component.set('v.tablelist',fetchNextrecords);
        component.set('v.currentPageNo',pageCount);
        if(pageCount==1)
        {
            component.set('v.PreviousbuttonDisable',true);
            if(countTotalPage>1){
              component.set('v.NextbuttonDisable',false);
            }
            else
            {
              component.set('v.NextbuttonDisable',true);
            }

        }
        else if(pageCount==countTotalPage)
        {
            component.set('v.PreviousbuttonDisable',false);
            component.set('v.NextbuttonDisable',true);
        }
        else
        {
           component.set('v.PreviousbuttonDisable',false);
           component.set('v.NextbuttonDisable',false);

        }
},
    
    showDetails:function(component,event){
        
        $A.createComponent('c:ShowForm',{
            'aura:id':'newForm',
            'recordId':component.get('v.rowId'),
            'objectName':'Account'
             },
            function(newForm,status,errorMsg){
                if(status==='SUCCESS')
                {
                    var overlay=component.find('overlayLib');
                    overlay.showCustomModal({
                       header: 'Account Details',
                       body: newForm,
                       showCloseButton: true,
                       closeCallback: function() {}
                   });
                }
                else if (status === 'ERROR')
                {
                    console.log('error is',errorMessage);
                }
                else{
                    console.log('something is wrong',errorMessage);
                }
            
        });
    },
    
    edit:function(component,event){
        $A.createComponent('c:EditForm',{
            'aura:id':'editForm',
            'recordId':component.get('v.rowId'),
            'objectName':'Account' 
        },function(editform,status,errorMessage){
             if(status==='SUCCESS'){
                    var overlay=component.find('overlayLib');
                    overlay.showCustomModal({
                       header: 'Edit Account',
                       body: editform,
                       showCloseButton: true,
                       closeCallback: function() {}
                   });
                }
            else if (status === 'ERROR'){
                console.log('error is',errorMessage);
            }
           else{
               console.log('something wrong',errorMessage);        
           }    
        });
    },
    
    deleteRecord :function(component,event){
        var action=component.get('c.deleteAccount');
        action.setParams({
            'accId':component.get('v.rowId')
        });
        action.setCallback(this,function(response){
            var state=response.getState();
            if(state==='SUCCESS'){
                var str=response.getReturnValue();
                if(str=='SUCCESS')
                {
                    var toastEvent = $A.get('e.force:showToast');
                    toastEvent.setParams({
                        'type':'success',
                        'title': 'Success!',
                        'message': 'Record deleted successfully'
                    });
                    toastEvent.fire();    
                    this.showTableData(component,event);
                }
                else
                {
                    var toastEvent = $A.get('e.force:showToast');
                    toastEvent.setParams({
                        'type':'error',
                        'title': 'Error!',
                        'message': 'Unable to delete record'
                    });
                    toastEvent.fire();
                    
                }            
            }else if(state==='ERROR'){
                var toastEvent = $A.get('e.force:showToast');
                toastEvent.setParams({
                    'type':'error',
                    'title': 'Error!',
                    'message': 'Unable to delete record'
                });
                toastEvent.fire();
                
            }else{
                console.log('Something wrong');
            }
        });
        $A.enqueueAction(action);
    }
})