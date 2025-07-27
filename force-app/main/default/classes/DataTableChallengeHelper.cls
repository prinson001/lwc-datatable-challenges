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

    @AuraEnabled
    public static Boolean sendWelcomeEmail(String AccountId) {
        try {
            Contact contact = [SELECT Id, Name, Email, Phone FROM Contact WHERE AccountId =:AccountId LIMIT 1];
            System.debug(contact);
            if (String.isBlank(contact.Email)) {
                return false;
            }

            return dispatchEmail(contact);
        } catch (Exception e) {
            throw new AuraHandledException('Error sending email: ' + e.getMessage());
        }
    }

    // HELPER METHOD
    private static Boolean dispatchEmail(Contact contact) {
        Messaging.SingleEmailMessage mail = new Messaging.SingleEmailMessage();

        mail.setToAddresses(new String[] { contact.Email });
        mail.setSubject('Welcome to Our Platform');
        mail.setPlainTextBody(
            'Hi ' + contact.Name + ',\n\nThank you for joining us!\n\nBest regards,\nYour Company'
        );

        try {
            Messaging.sendEmail(new Messaging.SingleEmailMessage[] { mail });
            return true;
        } catch (Exception e) {
            System.debug('Email failed: ' + e.getMessage());
            return false;
        }
    }


}