public class BeerSearch {
    @AuraEnabled
    public static List<sObject> searchBeer(String serchkeyword)
    {
        List<sobject> lst;
        String str='%'+serchkeyword+'%';
        if(serchkeyword!=null)
        {   
            String query='select id,name,Alco__c,brewery_id__c,brewery_Name__c,Id__c,Image__c,Price__c,Remaining_Quantity__c,Tags__c,Total_Quantity__c from Beer__c where name like:str limit 15';
            lst=Database.query(query);
            
        }else{
            String query='select id,name,Alco__c,brewery_id__c,brewery_Name__c,Id__c,Image__c,Price__c,Remaining_Quantity__c,Tags__c,Total_Quantity__c from Beer__c limit 15';
            lst=Database.query(query);
        }
          return lst;  

    }
    
}