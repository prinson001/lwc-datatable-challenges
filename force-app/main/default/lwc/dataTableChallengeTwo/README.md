# ✏️ Challenge 2: Inline Editing with Save (Beginner → Intermediate)

This Lightning Web Component challenge demonstrates how to implement **inline editing** inside a `lightning-datatable` and persist the updates to Salesforce using **Apex + `updateRecord()`**.

---

## 🎯 Goal

- Allow users to edit the **Phone** and **Website** fields inline.
- Show a **Save** button automatically when changes are made.
- On clicking Save, use Apex to **persist the edits**.
- Provide **user feedback** using a toast notification.

---

## 🛠️ Features Implemented

| Feature                    | Description                                       |
|---------------------------|---------------------------------------------------|
| ⚙️ Inline Editing         | `editable: true` for `Phone` and `Website`       |
| 💾 Save Handler           | Handles `onsave` event with `updateRecord()`     |
| 🚥 Loading State          | Shows spinner while saving/fetching              |
| 🔁 Refresh UI             | Uses `refreshApex()` after save                  |
| 🔔 Toast Notifications    | Success and error feedback to the user           |

---

## 🧠 Concepts Practiced

- `lightning-datatable` with editable fields
- `onsave` event and `draft-values`
- Using `updateRecord()` from `lightning/uiRecordApi`
- Toast notifications using `ShowToastEvent`
- `refreshApex()` to update wire data
- UX best practices: loading states, error handling

---

## 🧪 How to Test

1. Deploy the component and its Apex class (`DataTableChallengeHelper`) to your org.
2. Create a Lightning App Page and drop this component on it.
3. Make inline edits to **Phone** or **Website** fields.
4. Click **Save** (button appears automatically).
5. Verify changes are saved and toast confirms success.

---

## 🧩 Apex Dependency

### `DataTableChallengeHelper.cls`

```apex
public with sharing class DataTableChallengeHelper {
    @AuraEnabled(cacheable=true)
    public static List<Account> getAccountRecords(Integer recordLimit) {
        return [SELECT Id, Name, Industry, Phone, Website FROM Account LIMIT :recordLimit];
    }
}
