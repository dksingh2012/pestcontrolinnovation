# PCI Google Apps Script enquiry handler

This is the email backend for the static website at https://pestcontrolinnovation.in/.

## What it does
- Accepts the website enquiry form fields (name, phone, city, state, service, message).
- Emails the enquiry to info@pestcontrolinnovation.in.
- Validates required name and phone fields and includes a hidden honeypot field for basic bot filtering.
- Does not save enquiry details to a spreadsheet or database.
- Displays a clear success or failure page after submission.

## Deploy once in the business Google account
1. Open https://script.google.com/ and create a **New project**.
2. Replace the starter code in Code.gs with the contents of this folder's Code.gs.
3. Save the project as **PCI Website Enquiry Handler**.
4. Select **Deploy → New deployment**.
5. Click the gear icon and select **Web app**.
6. Set **Execute as: Me** and **Who has access: Anyone**.
7. Click **Deploy** and complete Google's authorization prompts for the account that should send enquiry emails.
8. Copy the Web app URL ending in `/exec` and provide it so the website form can be connected.

## Important
- The first deployment requires the account owner to authorize email sending. ChatGPT cannot approve Google's account permission prompts.
- Keep the deployment URL private from public posts; it will be placed in the website form action.
- Test with a genuine internal test enquiry after deployment and verify the email reaches the intended inbox.
- If the recipient mailbox is unavailable, change CONFIG.recipient in Code.gs to a mailbox the business controls, then redeploy a new version.
