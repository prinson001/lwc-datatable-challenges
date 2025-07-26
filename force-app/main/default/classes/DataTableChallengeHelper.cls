public with sharing class DataTableChallengeHelper {
    
    @AuraEnabled(cacheable = true)
    public static List<Account> getAccountRecords(Integer recordLimit)
    {
        try{
            String query = 'SELECT Id , Name , Industry , Website , Phone from Account';
            if(recordLimit != null && recordLimit > 0)
            {
                query += ' LIMIT '+recordLimit;
            }
            return Database.query(query);
        }
        catch(Exception e)
        {
            throw new AuraHandledException(e.getMessage());
        }
    }
}