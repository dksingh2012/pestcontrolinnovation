/**
 * Pest Control Innovation — website enquiry handler
 * Deploy this project as a Google Apps Script Web App.
 *
 * Required deployment:
 *   Execute as: Me
 *   Who has access: Anyone
 *
 * Sends enquiries to info@pestcontrolinnovation.in.
 * Does not store submitted personal data in a spreadsheet or database.
 */

const CONFIG = {
  recipient: 'info@pestcontrolinnovation.in',
  businessName: 'Pest Control Innovation',
  returnUrl: 'https://pestcontrolinnovation.in/contact/'
};

function doGet() {
  return HtmlService.createHtmlOutput(
    '<!doctype html><html><head><meta name="viewport" content="width=device-width,initial-scale=1"></head>' +
    '<body style="font:16px Arial,sans-serif;padding:32px;max-width:620px;margin:40px auto;color:#20242b">' +
    '<h2>PCI enquiry service</h2><p>This endpoint is ready to receive website enquiries.</p></body></html>'
  );
}

function doPost(e) {
  try {
    const p = (e && e.parameter) ? e.parameter : {};

    // Honeypot: silently accept automated submissions without emailing them.
    if (String(p.website || '').trim() !== '') {
      return page_('Thank you', 'Your enquiry has been received.', false);
    }

    const name = clean_(p.name, 120);
    const phone = clean_(p.phone, 40);
    const city = clean_(p.city, 100);
    const state = clean_(p.state, 100);
    const service = clean_(p.service, 120);
    const message = clean_(p.message, 2000);

    if (!name || !phone) {
      return page_('Missing details', 'Please go back and provide your name and phone number.', true);
    }

    const subject = 'New website enquiry — ' + (service || 'Pest Control');
    const body = [
      'New enquiry received from pestcontrolinnovation.in',
      '',
      'Name: ' + name,
      'Phone: ' + phone,
      'City: ' + (city || 'Not provided'),
      'State: ' + (state || 'Not provided'),
      'Service: ' + (service || 'Not selected'),
      '',
      'Message:',
      message || 'No message provided',
      '',
      'Source: Website contact form'
    ].join('\n');

    MailApp.sendEmail({
      to: CONFIG.recipient,
      subject: subject,
      body: body,
      name: CONFIG.businessName,
      replyTo: CONFIG.recipient
    });

    return page_('Thank you!', 'Your enquiry has been sent successfully. Our team will contact you soon.', false);
  } catch (err) {
    console.error(err);
    return page_('Enquiry not sent', 'We could not send your enquiry right now. Please call +91 79063 16517 or contact us on WhatsApp.', true);
  }
}

function clean_(value, maxLength) {
  return String(value || '').replace(/[\u0000-\u001F\u007F]/g, ' ').trim().slice(0, maxLength);
}

function page_(title, message, showRetry) {
  const retry = showRetry
    ? '<p><a href="' + CONFIG.returnUrl + '">Return to the enquiry form</a></p>'
    : '<p><a href="' + CONFIG.returnUrl + '">Return to Pest Control Innovation</a></p>';
  const html = '<!doctype html><html lang="en"><head><meta charset="utf-8">' +
    '<meta name="viewport" content="width=device-width,initial-scale=1">' +
    '<title>' + title + ' | PCI</title></head>' +
    '<body style="font:16px Arial,sans-serif;background:#f6f7f9;padding:24px;color:#20242b">' +
    '<main style="max-width:620px;margin:8vh auto;background:#fff;border-radius:16px;padding:32px;box-shadow:0 8px 30px #0001">' +
    '<h1 style="margin-top:0">' + title + '</h1><p>' + message + '</p>' + retry +
    '<p><strong>Pest Control Innovation</strong><br>+91 79063 16517</p></main></body></html>';
  return HtmlService.createHtmlOutput(html).setTitle(title);
}
