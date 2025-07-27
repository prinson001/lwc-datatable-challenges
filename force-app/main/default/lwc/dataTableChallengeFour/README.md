# 📦 Challenge 4: Add Button in Cell (Intermediate)

This Lightning Web Component challenge demonstrates how to add a **custom button inside a lightning-datatable cell** that performs a server-side action (send email) and displays a **toast notification** based on the response.

---

## 🎯 Goal

- Display a list of `Account` records in a `lightning-datatable`.
- Add a **button inside a column** for each row labeled “Send Mail”.
- Clicking the button should:
  - Call an Apex method to send a dummy welcome email to a related Contact.
  - Show a **toast message** indicating success or failure.

---

## 🛠️ Features Implemented

| Feature                     | Description                                                  |
|----------------------------|--------------------------------------------------------------|
| 📄 Data Table              | Displays Account records with key fields                     |
| 🔘 Button in Cell           | `type: 'button'` column to show "Send Mail" in each row      |
| 📤 Server-Side Action       | Calls Apex method to send email via `@AuraEnabled`           |
| ✅ Toast Notifications      | Shows success or error message based on result               |
| 📛 Error Handling           | Gracefully handles missing email or other exceptions         |

---

## 🧠 Concepts Practiced

- Using `type: 'button'` column in `lightning-datatable`
- Defining and handling `onrowaction` event
- Calling Apex from LWC using imperative Apex
- Showing toast messages with `ShowToastEvent`
- Minimal conditional rendering and loading state

---

## 🧪 How to Test

1. Deploy the LWC component and the `DataTableChallengeHelper` Apex class to your Salesforce org.
2. Add the component to a Lightning App Page or Home Page.
3. The component will load up to 10 Account records.
4. Click the “Send Mail” button for any record.
5. If the account has at least one related Contact with an email, a dummy welcome email will be sent.
6. A toast will indicate if the email was sent successfully or if an error occurred.

---

## 🧩 Apex Dependency

### `DataTableChallengeHelper.cls`

```apex
public with sharing class DataTableChallengeHelper {

    @AuraEnabled(cacheable = true)
    public static List<Account> getAccountRecords(Integer recordLimit) {
        try {
            String query = 'SELECT Id, Name, Industry, Website, Phone FROM Account';
            if (recordLimit != null && recordLimit > 0) {
                query += ' LIMIT ' + recordLimit;
            }
            return Database.query(query);
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    @AuraEnabled
    public static Boolean sendWelcomeEmail(String AccountId) {
        try {
            Contact contact = [SELECT Id, Name, Email, Phone FROM Contact WHERE AccountId = :AccountId LIMIT 1];
            if (String.isBlank(contact.Email)) {
                return false;
            }
            return dispatchEmail(contact);
        } catch (Exception e) {
            throw new AuraHandledException('Error sending email: ' + e.getMessage());
        }
    }

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
