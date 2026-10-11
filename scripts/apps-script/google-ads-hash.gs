/**
 * FPI | Booked Customer Offline Conversions: hash email and phone for Google Ads.
 *
 * GHL writes plain email and phone into columns "email_plain" and "phone_plain".
 * Google Ads scheduled Sheets uploads require SHA-256 hashed values in the
 * "Email" and "Phone Number" columns. This fills them for any row that has a
 * plain value and an empty hash. Install: Extensions, Apps Script, paste,
 * run hashNewRows once to authorize, then add a time trigger (every hour).
 */
function hashNewRows() {
  const sheet = SpreadsheetApp.getActive().getSheetByName('Conversions');
  const data = sheet.getDataRange().getValues();
  const head = data[0];
  const col = name => head.indexOf(name);
  const ep = col('email_plain'), pp = col('phone_plain'), eh = col('Email'), ph = col('Phone Number');
  if ([ep, pp, eh, ph].some(i => i < 0)) throw new Error('Missing a header');
  for (let r = 1; r < data.length; r++) {
    const row = data[r];
    if (row[ep] && !row[eh]) sheet.getRange(r + 1, eh + 1).setValue(sha256(normEmail(row[ep])));
    if (row[pp] && !row[ph]) sheet.getRange(r + 1, ph + 1).setValue(sha256(normPhone(row[pp])));
  }
}

function normEmail(e) {
  e = String(e).trim().toLowerCase();
  const [user, domain] = e.split('@');
  if (domain === 'gmail.com' || domain === 'googlemail.com') return user.replace(/\./g, '') + '@' + domain;
  return e;
}

function normPhone(p) {
  const digits = String(p).replace(/\D/g, '');
  if (digits.length === 10) return '+1' + digits;
  return '+' + digits;
}

function sha256(s) {
  return Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, s, Utilities.Charset.UTF_8)
    .map(b => ('0' + (b & 0xff).toString(16)).slice(-2)).join('');
}
