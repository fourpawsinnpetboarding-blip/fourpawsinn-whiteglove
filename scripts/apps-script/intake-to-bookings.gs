/**
 * Four Paws Inn: guest intake form -> Bookings sheet.
 *
 * Install in the INTAKE responses spreadsheet ("Updated Client Intake Form (Responses)"):
 *   Extensions -> Apps Script -> paste this file -> Save.
 *   Run setup() once and approve access. That adds the on-submit trigger.
 *   Run backfillPhones() once. It starts in DRY RUN and only logs. Set DRY_RUN = false and run again to write.
 *
 * What it does:
 *   1. Every new intake form submission adds a row to Bookings in the Daily Tracker:
 *      dog name, check in, check out, phone, owner, email, source, booking key.
 *      Amanda only adds the daily rate and deposit.
 *   2. backfillPhones() fills Phone, Owner Name and Email on existing Bookings rows that are missing them,
 *      by matching the dog name (and check in date when possible) against every client tab.
 * It never deletes, never overwrites a filled cell, and never touches the GHL sync columns.
 */

const TRACKER_ID = '1l865ufGEWsI9BjV2cLdZo-WuhHfM8vWnBUMnr01Zl9E'; // (Extensions) Daily Tracker_Money
const BOOKINGS_TAB = 'Bookings';
const FIRST_DATA_ROW = 3; // row 1 headers, row 2 blank
const INTAKE_TAB = 'NEW ENGLISH FORMS';
const DRY_RUN = true;

// Client tabs searched by backfillPhones(), with the header text of each column.
const CLIENT_SOURCES = [
  { tab: 'NEW ENGLISH FORMS', pet: "Pet´s Name", owner: 'Owners First & Last Name', email: 'Email', phone: 'Phone Number', checkin: 'Check In Date', ts: 'Timestamp' },
  { tab: 'GHL Import', pet: 'Pet Name', owner: 'Full Name', email: 'Email', phone: 'Phone', checkin: 'Check In Date', ts: null },
  { tab: 'OG 2 English Clients', pet: "Pet´s Name", owner: 'Owners First & Last Name', email: 'Email', phone: 'Phone Number', checkin: 'Check In Date', ts: 'Timestamp' },
  { tab: ' Original Clients', pet: 'DOG NAME', owner: 'CIENT NAME', email: 'EMAIL', phone: 'PHONE #', checkin: null, ts: null },
];

function setup() {
  const ss = SpreadsheetApp.getActive();
  ScriptApp.getProjectTriggers()
    .filter(t => t.getHandlerFunction() === 'onIntakeSubmit')
    .forEach(t => ScriptApp.deleteTrigger(t));
  ScriptApp.newTrigger('onIntakeSubmit').forSpreadsheet(ss).onFormSubmit().create();
  Logger.log('Trigger installed.');
}

function onIntakeSubmit(e) {
  const sheet = e.range.getSheet();
  if (sheet.getName() !== INTAKE_TAB) return;
  const col = headerFinder_(sheet);
  const row = sheet.getRange(e.range.getRow(), 1, 1, sheet.getLastColumn()).getValues()[0];
  const get = name => { const i = col(name); return i < 0 ? '' : row[i]; };

  const pet = String(get("Pet´s Name")).trim();
  const checkin = get('Check In Date');
  if (!pet || !checkin) return;

  const ts = get('Timestamp');
  const key = 'intake-' + Utilities.formatDate(new Date(ts), 'America/New_York', "yyyyMMdd-HHmmss") + '-' + pet.toLowerCase();
  addBooking_({
    dog: pet,
    checkin: checkin,
    checkout: get('Check out Date'),
    phone: formatPhone_(get('Phone Number')),
    owner: String(get('Owners First & Last Name')).trim(),
    email: String(get('Email')).trim(),
    source: 'Intake form' + (get('How did you hear') ? ': ' + get('How did you hear') : ''),
    key: key,
  });
}

function addBooking_(b) {
  const sh = SpreadsheetApp.openById(TRACKER_ID).getSheetByName(BOOKINGS_TAB);
  const col = headerFinder_(sh);
  const keyCol = col('Booking Key');
  const last = sh.getLastRow();
  const keys = sh.getRange(FIRST_DATA_ROW, keyCol + 1, last - FIRST_DATA_ROW + 1, 1).getValues().flat();
  if (keys.includes(b.key)) return; // already added

  // First row with an empty dog name, so formula columns already filled down are kept.
  const dogs = sh.getRange(FIRST_DATA_ROW, col('Dogs Names') + 1, last - FIRST_DATA_ROW + 1, 1).getValues().flat();
  let r = dogs.findIndex(v => String(v).trim() === '');
  r = r < 0 ? last + 1 : FIRST_DATA_ROW + r;

  const set = (header, value) => { const i = col(header); if (i >= 0 && value !== '' && value != null) sh.getRange(r, i + 1).setValue(value); };
  set('Dogs Names', b.dog);
  set('Check-in', b.checkin);
  set('Check-Out', b.checkout);
  set('Phone', b.phone);
  set('Owner Name', b.owner);
  set('Email', b.email);
  set('Source', b.source);
  set('Booking Key', b.key);
}

function backfillPhones() {
  const intake = SpreadsheetApp.getActive();
  const clients = [];
  CLIENT_SOURCES.forEach(src => {
    const sh = intake.getSheetByName(src.tab);
    if (!sh || sh.getLastRow() < 2) return;
    const col = headerFinder_(sh);
    const rows = sh.getRange(2, 1, sh.getLastRow() - 1, sh.getLastColumn()).getValues();
    const at = (row, h) => { if (!h) return ''; const i = col(h); return i < 0 ? '' : row[i]; };
    rows.forEach(row => {
      const pet = String(at(row, src.pet)).trim();
      const phone = formatPhone_(at(row, src.phone));
      if (!pet || !phone) return;
      clients.push({ pet: pet.toLowerCase(), phone, owner: String(at(row, src.owner)).trim(), email: String(at(row, src.email)).trim(),
        checkin: dayKey_(at(row, src.checkin)), ts: at(row, src.ts) ? new Date(at(row, src.ts)).getTime() : 0, tab: src.tab });
    });
  });

  const sh = SpreadsheetApp.openById(TRACKER_ID).getSheetByName(BOOKINGS_TAB);
  const col = headerFinder_(sh);
  const n = sh.getLastRow() - FIRST_DATA_ROW + 1;
  const data = sh.getRange(FIRST_DATA_ROW, 1, n, sh.getLastColumn()).getValues();
  let filled = 0, nameOnly = 0, missing = [];

  data.forEach((row, k) => {
    const dog = String(row[col('Dogs Names')]).trim();
    if (!dog || String(row[col('Phone')]).trim()) return;
    const word = dog.toLowerCase().split(/[\s&,]+/)[0];
    const hits = clients.filter(c => c.pet.split(/[\s&,]+/)[0] === word);
    if (!hits.length) { missing.push(dog); return; }
    const day = dayKey_(row[col('Check-in')]);
    const exact = hits.filter(c => day && c.checkin === day);
    const pool = exact.length ? exact : hits;
    const owners = new Set(pool.map(c => c.phone));
    const best = pool.sort((a, b) => b.ts - a.ts)[0];
    const sure = exact.length > 0 || owners.size === 1;
    const r = FIRST_DATA_ROW + k;
    Logger.log((sure ? 'MATCH ' : 'CHECK ') + dog + ' -> ' + best.owner + ' ' + best.phone + ' (' + best.tab + ')');
    if (!DRY_RUN) {
      sh.getRange(r, col('Phone') + 1).setValue(best.phone);
      if (!String(row[col('Owner Name')]).trim()) sh.getRange(r, col('Owner Name') + 1).setValue(best.owner);
      if (!String(row[col('Email')]).trim()) sh.getRange(r, col('Email') + 1).setValue(best.email);
      if (!sure && !String(row[col('Source')]).trim()) sh.getRange(r, col('Source') + 1).setValue('CHECK: matched by dog name only');
    }
    sure ? filled++ : nameOnly++;
  });
  Logger.log((DRY_RUN ? 'DRY RUN. ' : '') + 'Sure matches: ' + filled + '. Name only (check): ' + nameOnly + '. Not found: ' + missing.length + ' ' + JSON.stringify(missing.slice(0, 50)));
}

function headerFinder_(sheet) {
  const h = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0].map(x => String(x).toLowerCase().trim());
  return name => {
    const n = name.toLowerCase().trim();
    const exact = h.indexOf(n);
    return exact >= 0 ? exact : h.findIndex(x => x.includes(n));
  };
}

function formatPhone_(v) {
  const d = String(v || '').replace(/\D/g, '').slice(-10);
  return d.length === 10 ? '(' + d.slice(0, 3) + ') ' + d.slice(3, 6) + '-' + d.slice(6) : '';
}

function dayKey_(v) {
  if (!v) return '';
  const d = v instanceof Date ? v : new Date(v);
  return isNaN(d) ? '' : Utilities.formatDate(d, 'America/New_York', 'yyyy-MM-dd');
}
