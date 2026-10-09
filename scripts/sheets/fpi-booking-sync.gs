// =====================================================
// FOUR PAWS INN: BOOKINGS -> GOHIGHLEVEL  (v2, Oct 9 2026)
// Paste this BELOW your existing lines 1 to 6 (the header and the
// FPI_GHL_WEBHOOK_URL_ constant). The webhook URL is a secret: it stays
// only in the live script, never in this repo.
//
// What v2 does:
// 1. Amanda marks DEPOSIT = YES on the intake form sheet (she already does).
//    The booking row appears on the Bookings tab by itself: pet, check in,
//    check out, owner, phone, email, source, all copied from that form.
// 2. Amanda types the daily rate in column D. That is her only typing.
//    Total, deposit (25%) and balance fill in if they are blank, then the
//    booking goes to GoHighLevel as Won.
// 3. Rows that are not ready show WAITING and list what is missing.
// 4. A SYNCED row is never sent again by an edit (no duplicate Won in GHL).
// One time setup: menu GoHighLevel Sync > Install automatic sync.
// =====================================================

const FPI_BOOKINGS_SHEET_ = "Bookings";
const FPI_INTAKE_SHEET_ID_ = "1XcK5fcBq2-jPJSDwbagVDhrpt-nhnsiEDzsYhPB8GBI";
const FPI_INTAKE_TAB_ = "NEW ENGLISH FORMS";
const FPI_MONEY_SHEET_ID_ = "1l865ufGEWsI9BjV2cLdZo-WuhHfM8vWnBUMnr01Zl9E";
const FPI_DEPOSIT_SHARE_ = 0.25;
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
    bookings.getRange(target, 9, 1, 4).setValues([[
      String(get(/owner/) || "").trim(),
      phone,
      String(get(/email/) || "").trim().toLowerCase(),
      source
    ]]);
    bookings.getRange(target, 13).setValue("WAITING");
    bookings.getRange(target, 17).setValue(
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
  const parsed = new Date(String(value || "").trim());
  return isNaN(parsed) ? "" : parsed;
}

function fpiBookingSyncOnEdit(e) {
  if (!e || !e.range) return;

  const sheet = e.range.getSheet();
  if (sheet.getName() !== FPI_BOOKINGS_SHEET_) return;
  if (e.range.getRow() < 2) return;
  if (e.range.getColumn() > 18 || e.range.getLastColumn() < 1) return;

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
  const phone = String(sheet.getRange(row, 10).getValue() || "");
  const match = fpiFindIntakeByPhone_(phone);

  SpreadsheetApp.getUi().alert(
    match ?
      "Found: " + match.owner + " | " + (match.email || "no email") +
        " | source: " + (match.source || FPI_NO_SOURCE_) :
      "No intake form found for phone " + phone
  );
}

function fpiSyncBookingRow_(sheet, row, force) {
  const range = sheet.getRange(row, 1, 1, 18);
  const values = range.getValues()[0];

  const petName = String(values[0] || "").trim();
  const phone = String(values[9] || "").trim();
  if (!petName && !phone) return;

  const previousStatus = String(values[12] || "").trim();
  const statusCell = sheet.getRange(row, 13);
  const lastSyncedCell = sheet.getRange(row, 16);
  const errorCell = sheet.getRange(row, 17);
  const keyCell = sheet.getRange(row, 18);

  // Already in GHL: an edit never creates a second Won.
  if (!force && previousStatus === "SYNCED") {
    errorCell.setValue("Already in GHL. Edits here are not resent. Fix it in GHL.");
    return;
  }

  // Auto fill owner, email and source from the intake form by phone.
  // Only blank cells are filled. What Amanda types always wins.
  let ownerName = String(values[8] || "").trim();
  let email = String(values[10] || "").trim().toLowerCase();
  let source = String(values[11] || "").trim();

  if (phone && (!ownerName || !email || !source)) {
    const match = fpiFindIntakeByPhone_(phone);
    if (match) {
      if (!ownerName && match.owner) {
        ownerName = match.owner;
        sheet.getRange(row, 9).setValue(ownerName);
      }
      if (!email && match.email) {
        email = match.email;
        sheet.getRange(row, 11).setValue(email);
      }
      if (!source) {
        source = match.source || FPI_NO_SOURCE_;
        sheet.getRange(row, 12).setValue(source);
      }
    }
  }

  const checkIn = values[1];
  const checkOut = values[2];
  const dailyRate = fpiMoney_(values[3]);
  let totalRevenue = fpiMoney_(values[4]);
  let deposit = fpiMoney_(values[5]);
  let balance = fpiMoney_(values[6]);

  // Fill the money columns only when they are blank and not formulas.
  const formulas = range.getFormulas()[0];
  const datesOk = checkIn instanceof Date && checkOut instanceof Date &&
    !isNaN(checkIn) && !isNaN(checkOut);
  if (dailyRate > 0 && datesOk) {
    if (!totalRevenue && !formulas[4]) {
      // Days are counted on both ends: Oct 10 to Oct 11 = 2 days.
      const days = Math.round((checkOut - checkIn) / 86400000) + 1;
      totalRevenue = Math.max(days, 1) * dailyRate;
      sheet.getRange(row, 5).setValue(totalRevenue);
    }
    if (!deposit && !formulas[5] && totalRevenue > 0) {
      deposit = Math.round(totalRevenue * FPI_DEPOSIT_SHARE_ * 100) / 100;
      sheet.getRange(row, 6).setValue(deposit);
    }
    if (!balance && !formulas[6] && totalRevenue > 0) {
      balance = totalRevenue - deposit;
      sheet.getRange(row, 7).setValue(balance);
    }
  }
  const notes = String(values[7] || "").trim();

  const checks = [
    ["pet name", petName],
    ["check in", checkIn instanceof Date && !isNaN(checkIn)],
    ["check out", checkOut instanceof Date && !isNaN(checkOut)],
    ["daily rate", dailyRate > 0],
    ["total", totalRevenue > 0],
    ["deposit", deposit > 0],
    ["phone", phone || email],
    ["owner name (no intake form for this phone, type it in I)", ownerName]
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
