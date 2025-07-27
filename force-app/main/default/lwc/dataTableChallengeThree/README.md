# 📦 Challenge 3: Row Actions with Modal (Intermediate)

This Lightning Web Component challenge demonstrates how to implement **row-level actions** in a `lightning-datatable` and open a **modal dialog** to **view or edit** the selected record using `lightning-record-form`.

---

## 🎯 Goal

- Display a list of `Account` records in a `lightning-datatable`.
- Provide **row actions**: View and Edit.
- On selecting a row action, open a **modal**:
  - **Edit** → allows updating the record.
  - **View** → shows the record in read-only mode.

---

## 🛠️ Features Implemented

| Feature                     | Description                                                  |
|----------------------------|--------------------------------------------------------------|
| 📄 Data Table              | Displays Account records with key fields                     |
| ➕ Row Actions              | Actions: View, Edit                                          |
| 🔍 Modal Dialog            | Dynamically opens modal on row action                        |
| ✏️ Edit Mode               | `lightning-record-form` in Edit mode for updating records    |
| 👁️ View Mode               | `lightning-record-form` in ReadOnly mode                     |
| ✅ Toast Notifications      | On successful update                                         |
| 🔁 Refresh on Update        | Uses `refreshApex()` to update data post-edit                |

---

## 🧠 Concepts Practiced

- Handling row-level actions in `lightning-datatable`
- Opening dynamic modals using conditional rendering
- Using `lightning-record-form` for Edit and View modes
- Toast feedback using `ShowToastEvent`
- Refreshing UI with `refreshApex()`

---

## 🧪 How to Test

1. Deploy the component and Apex class (`DataTableChallengeHelper`) to your Salesforce org.
2. Add the component to a Lightning App Page.
3. Click on the **View** or **Edit** action for any Account row.
4. Modal opens in respective mode. Try editing and saving.
5. Confirm that toast shows and datatable updates on save.

---

## 🧩 Apex Dependency

### `DataTableChallengeHelper.cls`

```apex
public with sharing class DataTableChallengeHelper {
    @AuraEnabled(cacheable=true)
    public static List<Account> getAccountRecords(Integer recordLimit) {
        return [SELECT Id, Name, Industry, Phone FROM Account LIMIT :recordLimit];
    }
}
