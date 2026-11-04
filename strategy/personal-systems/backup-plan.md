# Backup plan: everything on the external hard drive (Nov 4, 2026)

Goal: if Google, an email account or a laptop goes down, a full copy sits on the external drive at home. Claude runs in the cloud and cannot reach the drive. Codex on the Mac, or Alex in 10 minutes, does the copy.

## What gets backed up
| # | What | How it is exported |
|---|---|---|
| 1 | hello@fourpawsinn.co (Gmail, Drive, Calendar, Contacts) | Google Takeout, signed in as hello@ |
| 2 | fourpawsinnpetboarding@gmail.com (Gmail, Drive incl. "Alex Personal Systems (private)", Photos) | Google Takeout, signed in as that account |
| 3 | Personal Gmail and iCloud photos | Google Takeout / iCloud "Download my data" |
| 4 | This repo (the whole operating system) | `git clone` or `git pull` of fourpawsinnpetboarding-blip/fourpawsinn-whiteglove |
| 5 | GHL contacts and opportunities | GHL > Contacts > Export CSV, Opportunities > Export |
| 6 | Wix orders and contacts | Wix > Contacts > Export, Orders > Export |
| 7 | Meta and Google Ads reports | Monthly CSV from Ads Manager (or Windsor export) |

## One time setup (Alex, 5 minutes per Google account)
1. Go to takeout.google.com signed in as hello@fourpawsinn.co.
2. Keep everything selected. Click Next.
3. Destination: "Add to Drive" (or "Send download link via email").
4. Frequency: **Export every 2 months for 1 year**. File type .zip, size 50 GB.
5. Create export. Repeat signed in as fourpawsinnpetboarding@gmail.com.
Google then builds a fresh copy every 2 months with no extra work.

## Monthly copy to the drive (1st of the month, calendar reminder is set)
1. Plug in the external drive. Make the folder `FPI-BACKUP/YYYY-MM/`.
2. Download the newest Takeout zips into it.
3. Copy the repo: run Codex prompt below, or `git -C ~/dev/fourpawsinn-whiteglove pull` then copy the folder.
4. Drop in the GHL and Wix CSV exports.
5. Keep the last 6 months. Delete older folders.
6. Unplug the drive and store it away from the computer (fire box or a second location). A drive that is always plugged in dies with the laptop.

## Codex prompt (paste into Codex on the Mac with the drive plugged in)
> Back up Four Paws Inn to the external drive. 1) Find the mounted external drive under /Volumes (ask me if there are two). 2) Create /Volumes/<drive>/FPI-BACKUP/<YYYY-MM>/. 3) git pull ~/dev/fourpawsinn-whiteglove and copy it there with rsync -a, excluding .env and node_modules. 4) Copy every file in ~/Downloads that starts with "takeout-" and was made in the last 45 days. 5) Copy ~/Downloads GHL and Wix CSV exports from the last 45 days. 6) Print a list of what was copied with sizes, and total free space left on the drive. 7) Delete FPI-BACKUP month folders older than 6 months only after showing me the list. Never copy .env or any file with passwords.

## If email goes down
- Claude and Codex keep working: Claude logs in with another account and reads the repo and Drive.
- Recovery steps per account: Drive sheet "1. Account Recovery Map".
