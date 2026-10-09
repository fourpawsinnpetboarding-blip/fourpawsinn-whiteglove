// =====================================================
// FOUR PAWS INN: BOOKINGS -> GOHIGHLEVEL  (v2, Oct 9 2026)
// Paste this BELOW your existing lines 1 to 6 (the header and the
// FPI_GHL_WEBHOOK_URL_ constant). The webhook URL is a secret: it stays
// only in the live script, never in this repo.
//
// What v2 changes:
// 1. Amanda types only: pet, check in, check out, daily rate, deposit, phone.
//    Owner name, email and source fill themselves from the intake form,
//    matched by phone number (most recent form wins).
// 2. Rows that are not ready show WAITING and list what is missing.
// 3. A SYNCED row is never sent again by an edit (no duplicate Won in GHL).
// =====================================================

const FPI_BOOKINGS_SHEET_ = "Bookings";
const FPI_INTAKE_SHEET_ID_ = "1XcK5fcBq2-jPJSDwbagVDhrpt-nhnsiEDzsYhPB8GBI";
const FPI_INTAKE_TAB_ = "NEW ENGLISH FORMS";
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
  const exists = ScriptApp.getProjectTriggers().some(function(trigger) {
    return trigger.getHandlerFunction() === "fpiBookingSyncOnEdit";
  });

  if (!exists) {
    ScriptApp.newTrigger("fpiBookingSyncOnEdit")
      .forSpreadsheet(SpreadsheetApp.getActive())
      .onEdit()
      .create();
  }

  SpreadsheetApp.getActive().toast(
    exists ? "Automatic GoHighLevel sync was already installed." :
      "Automatic GoHighLevel sync is now installed.",
    "Four Paws Inn",
    5
  );
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
