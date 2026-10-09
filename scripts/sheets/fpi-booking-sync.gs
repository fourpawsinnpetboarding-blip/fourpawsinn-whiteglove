// =====================================================
// FOUR PAWS INN: BOOKINGS -> GOHIGHLEVEL  (v2.1, Oct 9 2026)
// Paste this BELOW your existing lines 1 to 6 (the header and the
// FPI_GHL_WEBHOOK_URL_ constant). The webhook URL is a secret: it stays
// only in the live script, never in this repo.
//
// What v2 does:
// 1. Amanda marks DEPOSIT = YES on the intake form sheet (she already does).
//    The booking row appears on the Bookings tab by itself: pet, check in,
//    check out, owner, phone, email, source, all copied from that form.
// 2. Amanda types the daily rate in column D. That is her only typing.
//    The sheet's own formulas do the money math. The script never writes
//    to the money columns (D to G). Then the booking goes to GHL as Won.
// Columns are found by their header names (Phone, Owner Name, Email,
// Source, GHL Sync Status), so moving a column does not break anything.
// 3. Rows that are not ready show WAITING and list what is missing.
// 4. A SYNCED row is never sent again by an edit (no duplicate Won in GHL).
// One time setup: menu GoHighLevel Sync > Install automatic sync.
// =====================================================

const FPI_BOOKINGS_SHEET_ = "Bookings";
const FPI_INTAKE_SHEET_ID_ = "1XcK5fcBq2-jPJSDwbagVDhrpt-nhnsiEDzsYhPB8GBI";
const FPI_INTAKE_TAB_ = "NEW ENGLISH FORMS";
const FPI_MONEY_SHEET_ID_ = "1l865ufGEWsI9BjV2cLdZo-WuhHfM8vWnBUMnr01Zl9E";
const FPI_NO_SOURCE_ = "Not given";

function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu("GoHighLevel Sync")
    .addItem("Install automatic sync", "installFpiBookingSyncTrigger")
    .addItem("Sync selected booking now", "syncSelectedBookingToGhl")
    .addItem("Preview owner lookup (sends nothing)", "fpiPreviewLookupSelectedRow")
    .addToUi();
}

function installFpiBookingSyncTrigger() {
  const triggers = ScriptApp.getProjectTriggers();
  const has = function(handler) {
    return triggers.some(function(trigger) {
      return trigger.getHandlerFunction() === handler;
    });
  };

  if (!has("fpiBookingSyncOnEdit")) {
    ScriptApp.newTrigger("fpiBookingSyncOnEdit")
      .forSpreadsheet(FPI_MONEY_SHEET_ID_)
      .onEdit()
      .create();
  }

  if (!has("fpiIntakeOnEdit")) {
    ScriptApp.newTrigger("fpiIntakeOnEdit")
      .forSpreadsheet(FPI_INTAKE_SHEET_ID_)
      .onEdit()
      .create();
  }

  SpreadsheetApp.getActive().toast(
    "Automatic sync is on: intake YES creates the booking row, the rate sends it to GoHighLevel.",
    "Four Paws Inn",
    8
  );
}

// Intake sheet: DEPOSIT changed to YES -> booking row on the Bookings tab.
function fpiIntakeOnEdit(e) {
  if (!e || !e.range) return;

  const sheet = e.range.getSheet();
  if (sheet.getName() !== FPI_INTAKE_TAB_) return;
  if (e.range.getRow() < 2) return;

  const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0]
    .map(function(h) { return String(h).trim().toLowerCase(); });
  const depositCol = headers.indexOf("deposit") + 1;
  if (depositCol < 1) return;
  if (depositCol < e.range.getColumn() || depositCol > e.range.getLastColumn()) return;

  for (let row = e.range.getRow(); row <= e.range.getLastRow(); row++) {
    const flag = String(sheet.getRange(row, depositCol).getValue()).trim().toUpperCase();
    if (flag === "YES") fpiCreateBookingFromIntake_(sheet, headers, row);
  }
}

function fpiCreateBookingFromIntake_(intakeSheet, headers, row) {
  const values = intakeSheet.getRange(row, 1, 1, headers.length).getValues()[0];
  const col = function(pattern) {
    return headers.findIndex(function(h) { return pattern.test(h); });
  };
  const get = function(pattern) {
    const i = col(pattern);
    return i < 0 ? "" : values[i];
  };

  const phone = String(get(/phone/) || "").trim();
  const stamp = get(/timestamp/);
  const doneKey = "intake:" + (stamp instanceof Date ? stamp.getTime() : String(stamp)) +
    ":" + fpiPhoneKey_(phone);

  // Never create the same booking row twice (YES typed again, undo, etc).
  const props = PropertiesService.getScriptProperties();
  if (props.getProperty(doneKey)) return;

  const lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    if (props.getProperty(doneKey)) return;

    const bookings = SpreadsheetApp.openById(FPI_MONEY_SHEET_ID_)
      .getSheetByName(FPI_BOOKINGS_SHEET_);
    const target = fpiFirstEmptyBookingRow_(bookings);

    const source = String(get(/hear about/) || "").trim() || FPI_NO_SOURCE_;
    bookings.getRange(target, 1, 1, 3).setValues([[
      String(get(/pet.s name/) || "").trim(),
      fpiAsDate_(get(/check in/)),
      fpiAsDate_(get(/check out/))
    ]]);
    const c = fpiBookingCols_(bookings);
    bookings.getRange(target, c.owner).setValue(String(get(/owner/) || "").trim());
    bookings.getRange(target, c.phone).setValue(phone);
    bookings.getRange(target, c.email).setValue(String(get(/email/) || "").trim().toLowerCase());
    bookings.getRange(target, c.source).setValue(source);
    bookings.getRange(target, c.status).setValue("WAITING");
    bookings.getRange(target, c.error).setValue(
      "Type the daily rate in D. Fix the dates here if they changed on the phone.");

    props.setProperty(doneKey, String(target));
  } finally {
    lock.releaseLock();
  }
}

// First row from 2 down where pet name (A) is empty.
function fpiFirstEmptyBookingRow_(sheet) {
  const last = Math.max(sheet.getLastRow(), 2);
  const pets = sheet.getRange(2, 1, last - 1, 1).getValues();
  for (let i = 0; i < pets.length; i++) {
    if (String(pets[i][0]).trim() === "") return i + 2;
  }
  return last + 1;
}

function fpiAsDate_(value) {
  if (value instanceof Date && !isNaN(value)) return value;
  const text = String(value || "").trim();
  // "10/23" typed without a year: use this year.
  const short = text.match(/^(\d{1,2})\/(\d{1,2})$/);
  if (short) {
    return new Date(new Date().getFullYear(), Number(short[1]) - 1, Number(short[2]));
  }
  const parsed = new Date(text);
  return text && !isNaN(parsed) ? parsed : "";
}

// Finds the Bookings columns by header name. Falls back to the old positions.
function fpiBookingCols_(sheet) {
  const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0]
    .map(function(h) { return String(h).trim().toLowerCase(); });
  const find = function(pattern, fallback) {
    const i = headers.findIndex(function(h) { return pattern.test(h); });
    return i < 0 ? fallback : i + 1;
  };
  return {
    phone: find(/phone/, 10),
    owner: find(/owner/, 9),
    email: find(/email/, 11),
    source: find(/source/, 12),
    status: find(/sync status/, 13),
    lastSynced: find(/last sync/, 16),
    error: find(/error/, 17),
    key: find(/key/, 18)
  };
}

function fpiBookingSyncOnEdit(e) {
  if (!e || !e.range) return;

  const sheet = e.range.getSheet();
  if (sheet.getName() !== FPI_BOOKINGS_SHEET_) return;
  if (e.range.getRow() < 2) return;

  const firstRow = e.range.getRow();
  const lastRow = e.range.getLastRow();

  for (let row = firstRow; row <= lastRow; row++) {
    fpiSyncBookingRow_(sheet, row, false);
  }
}

function syncSelectedBookingToGhl() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const row = sheet.getActiveRange().getRow();

  if (sheet.getName() !== FPI_BOOKINGS_SHEET_ || row < 2) {
    throw new Error('Select a booking row on the "Bookings" tab first.');
  }

  fpiSyncBookingRow_(sheet, row, true);
}

// Safe test: shows what the intake lookup finds for the selected row.
// Writes nothing and sends nothing to GoHighLevel.
function fpiPreviewLookupSelectedRow() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const row = sheet.getActiveRange().getRow();
  const phone = String(sheet.getRange(row, fpiBookingCols_(sheet).phone).getValue() || "");
  const match = fpiFindIntakeByPhone_(phone);

  SpreadsheetApp.getUi().alert(
    match ?
      "Found: " + match.owner + " | " + (match.email || "no email") +
        " | source: " + (match.source || FPI_NO_SOURCE_) :
      "No intake form found for phone " + phone
  );
}

function fpiSyncBookingRow_(sheet, row, force) {
  const c = fpiBookingCols_(sheet);
  const width = Math.max(c.phone, c.owner, c.email, c.source, c.status,
    c.lastSynced, c.error, c.key, 8);
  const values = sheet.getRange(row, 1, 1, width).getValues()[0];
  const v = function(column) { return values[column - 1]; };

  const petName = String(values[0] || "").trim();
  const phone = String(v(c.phone) || "").trim();
  if (!petName && !phone) return;

  const previousStatus = String(v(c.status) || "").trim();
  const statusCell = sheet.getRange(row, c.status);
  const lastSyncedCell = sheet.getRange(row, c.lastSynced);
  const errorCell = sheet.getRange(row, c.error);
  const keyCell = sheet.getRange(row, c.key);

  // Already in GHL: an edit never creates a second Won.
  if (!force && previousStatus === "SYNCED") {
    errorCell.setValue("Already in GHL. Edits here are not resent. Fix it in GHL.");
    return;
  }

  // Auto fill owner, email and source from the intake form by phone.
  // Only blank cells are filled. What Amanda types always wins.
  let ownerName = String(v(c.owner) || "").trim();
  let email = String(v(c.email) || "").trim().toLowerCase();
  let source = String(v(c.source) || "").trim();

  if (phone && (!ownerName || !email || !source)) {
    const match = fpiFindIntakeByPhone_(phone);
    if (match) {
      if (!ownerName && match.owner) {
        ownerName = match.owner;
        sheet.getRange(row, c.owner).setValue(ownerName);
      }
      if (!email && match.email) {
        email = match.email;
        sheet.getRange(row, c.email).setValue(email);
      }
      if (!source) {
        source = match.source || FPI_NO_SOURCE_;
        sheet.getRange(row, c.source).setValue(source);
      }
    }
  }

  const checkIn = fpiAsDate_(values[1]);
  const checkOut = fpiAsDate_(values[2]);
  const dailyRate = fpiMoney_(values[3]);
  const totalRevenue = fpiMoney_(values[4]);
  const deposit = fpiMoney_(values[5]);
  const balance = fpiMoney_(values[6]);
  const notes = String(values[7] || "").trim();

  const checks = [
    ["pet name", petName],
    ["check in", checkIn instanceof Date && !isNaN(checkIn)],
    ["check out", checkOut instanceof Date && !isNaN(checkOut)],
    ["daily rate", dailyRate > 0],
    ["total", totalRevenue > 0],
    ["phone", phone || email],
    ["owner name (no intake form for this phone, type it in Owner Name)", ownerName]
  ];
  const missing = checks
    .filter(function(check) { return !check[1]; })
    .map(function(check) { return check[0]; });

  if (missing.length) {
    statusCell.setValue("WAITING");
    errorCell.setValue("Missing: " + missing.join(", "));
    return;
  }

  const name = fpiSplitName_(ownerName);
  const payload = {
    event: "paid_booking",
    owner_name: ownerName,
    first_name: name.first,
    last_name: name.last,
    phone: phone,
    email: email,
    pet_name: petName,
    check_in: fpiIsoDate_(checkIn),
    check_out: fpiIsoDate_(checkOut),
    daily_rate: dailyRate,
    total_revenue: totalRevenue,
    deposit: deposit,
    balance: balance,
    source: source,
    notes: notes,
    pipeline: "Four Paws Inn",
    pipeline_stage: "Booked",
    opportunity_status: "won",
    sheet_row: row
  };

  payload.booking_key = fpiBookingKey_(payload);

  statusCell.setValue("SENDING");
  errorCell.clearContent();
  SpreadsheetApp.flush();

  try {
    const response = UrlFetchApp.fetch(FPI_GHL_WEBHOOK_URL_, {
      method: "post",
      contentType: "application/json",
      payload: JSON.stringify(payload),
      muteHttpExceptions: true
    });

    const responseCode = response.getResponseCode();
    if (responseCode < 200 || responseCode >= 300) {
      throw new Error(
        "GoHighLevel returned HTTP " + responseCode + ": " +
        response.getContentText().slice(0, 500)
      );
    }

    statusCell.setValue("SYNCED");
    lastSyncedCell.setValue(new Date());
    errorCell.clearContent();
    keyCell.setValue(payload.booking_key);
  } catch (error) {
    statusCell.setValue("ERROR");
    errorCell.setValue(String(error && error.message ? error.message : error));
    throw error;
  }
}

// Newest intake form whose phone matches (last 10 digits), or null.
function fpiFindIntakeByPhone_(phone) {
  const target = fpiPhoneKey_(phone);
  if (!target) return null;

  const data = SpreadsheetApp.openById(FPI_INTAKE_SHEET_ID_)
    .getSheetByName(FPI_INTAKE_TAB_)
    .getDataRange()
    .getValues();
  const headers = data[0].map(function(h) { return String(h).toLowerCase(); });
  const col = function(pattern) {
    return headers.findIndex(function(h) { return pattern.test(h); });
  };

  const ownerCol = col(/owner/);
  const emailCol = col(/email/);
  const phoneCol = col(/phone/);
  const sourceCol = col(/hear about/);
  if (phoneCol < 0) return null;

  for (let i = data.length - 1; i >= 1; i--) {
    if (fpiPhoneKey_(data[i][phoneCol]) !== target) continue;
    return {
      owner: ownerCol < 0 ? "" : String(data[i][ownerCol] || "").trim(),
      email: emailCol < 0 ? "" : String(data[i][emailCol] || "").trim().toLowerCase(),
      source: sourceCol < 0 ? "" : String(data[i][sourceCol] || "").trim()
    };
  }
  return null;
}

function fpiPhoneKey_(value) {
  const digits = String(value || "").replace(/\D/g, "");
  return digits.length >= 10 ? digits.slice(-10) : "";
}

function fpiMoney_(value) {
  if (typeof value === "number") return value;
  const parsed = Number(String(value || "").replace(/[$,]/g, "").trim());
  return isNaN(parsed) ? 0 : parsed;
}

function fpiIsoDate_(date) {
  return Utilities.formatDate(
    date,
    SpreadsheetApp.getActive().getSpreadsheetTimeZone(),
    "yyyy-MM-dd"
  );
}

function fpiSplitName_(fullName) {
  const parts = String(fullName || "").trim().split(/\s+/);
  return {
    first: parts.shift() || "",
    last: parts.join(" ")
  };
}

function fpiBookingKey_(payload) {
  const signature = [
    payload.owner_name,
    payload.phone,
    payload.email,
    payload.pet_name,
    payload.check_in,
    payload.check_out,
    payload.daily_rate,
    payload.total_revenue,
    payload.deposit,
    payload.source
  ].join("|").toLowerCase();

  const digest = Utilities.computeDigest(
    Utilities.DigestAlgorithm.SHA_256,
    signature,
    Utilities.Charset.UTF_8
  );

  return Utilities.base64EncodeWebSafe(digest)
    .replace(/=+$/, "")
    .substring(0, 24);
}
// END OF SCRIPT v2.1 (if you see this line in Apps Script, the paste is complete)
