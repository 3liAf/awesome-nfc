# Android NFC Guide

NFC on Android is pretty straightforward. If you have an Android phone from the last 5 years, you probably have NFC hardware. Let's get you writing tags.

## Check if Your Phone Has NFC

1. Go to **Settings**
2. Search for "NFC" (or look under "Wireless" or "Connectivity")
3. If you see an NFC toggle, you're good
4. If nothing shows up... sorry, your phone doesn't have it

Most modern Android phones have NFC. Exceptions: some budget phones, older models (pre-2015).

## Enable NFC

1. **Settings** → Search for **NFC**
2. Toggle it **ON**
3. Done

That's literally it. Some phones add an extra toggle in the notification shade—you can use either one.

## Install an NFC App

You've got solid options:

### Option 1: TagWriter (Recommended)
- **Who made it**: NXP (the company that makes NFC chips)
- **What's good**: Super reliable, official, just works
- **What's annoying**: Slightly basic UI
- **Download**: [Play Store](https://play.google.com/store/apps/details?id=com.nxp.nfc.tagwriter)

### Option 2: NFC Tools
- **Who made it**: Wakdev
- **What's good**: More features, looks nicer
- **What's annoying**: More crowded interface
- **Download**: [Play Store](https://play.google.com/store/apps/details?id=com.wakdev.nfctools)

### Option 3: Tagg
- **Who made it**: Tagg (social-first company)
- **What's good**: Beautiful design, great for social stuff
- **What's annoying**: Tailored toward social media
- **Download**: [Play Store](https://play.google.com/store/apps/details?id=us.tagg.android)

Pick one. Honestly, they all work. TagWriter is the "safest" choice.

## Writing a Tag

### Step-by-Step (TagWriter)

1. **Open TagWriter**
2. **Tap "Write"** (big button)
3. **"New Tag"**
4. **"Add a Record"** → Choose what type:
   - **URI** - A web link
   - **Text** - Plain text
   - **vCard** - Contact info
   - **WiFi** - WiFi network credentials
   - **Email** - Quick email to someone
5. **Fill in the details**
6. **"Write"** at the top
7. **Hold your phone to the sticker** for 2-3 seconds
8. Wait for the green checkmark ✓
9. **Done!** Your tag is written

### Step-by-Step (NFC Tools)

Pretty much the same, slightly different buttons:

1. **Open NFC Tools**
2. **Write tab** (at the top)
3. **Add a record**
4. Choose your record type
5. Fill in details
6. **Write** button
7. Hold phone to sticker
8. Wait for confirmation
9. Done

## Writing Different Record Types

### URL (Web Link)

Most common. Someone taps your sticker, opens a webpage.

1. Choose **URI**
2. Paste your full URL: https://www.example.com
3. Write to tag

Tips:
- Always use https:// or http:// 
- Make sure the URL works before writing it
- Long URLs work fine (NTAG215 has room)

### WiFi Network

This is super useful. Write your guest WiFi password to a sticker.

1. Choose **WiFi**
2. Fill in:
   - **SSID**: Your WiFi network name
   - **Password**: Your WiFi password
   - **Security**: Choose your security type (WPA2 is most common)
3. Write to tag

Now when someone taps it, their phone auto-connects to your WiFi. Magic.

### Contact Info (vCard)

Great for business cards or personal sharing.

1. Choose **vCard** (or "Contact")
2. Fill in:
   - Name
   - Phone
   - Email
   - Website (optional)
   - Organization (optional)
3. Write to tag

Tapping the tag adds this contact to their phone instantly.

### Plain Text

Sometimes you just need text. Shopping list, note, WiFi password.

1. Choose **Text**
2. Type your text
3. Write to tag

It's that simple.

## Advanced Stuff

### Writing Multiple Records

You can put multiple things on one tag. Example: A URL AND text AND a vCard.

1. **"Add a Record"** multiple times
2. Each record is stored separately
3. When someone taps, they see all records

### Locking Tags

Wrote something you don't want to change? Lock it.

1. In TagWriter, after writing
2. Look for **"Lock"** option
3. This makes it read-only
4. Useful for tags you're deploying

**Warning**: Locking is permanent. You can't un-lock NTAG213/215/216 tags.

### Clearing a Tag

Want to erase everything and start fresh?

1. **"Clear Tag"** option in app
2. Confirm
3. Tag is blank, ready for new data

## Common Android NFC Settings

### Beam (Share Between Phones)

Android has "NFC Beam" - two phones touch to share data.

- Most apps support it
- It's on by default
- You can toggle it in Settings → NFC if you want

### Why My NFC Isn't Working

Checklist:
- [ ] NFC is toggled ON in Settings
- [ ] My phone has NFC (Settings search doesn't show it = no hardware)
- [ ] Screen is unlocked (NFC usually requires unlocked screen)
- [ ] I'm holding phone steady for 2+ seconds
- [ ] I'm using the right part of the phone (usually top-center or back)

### Different Phones, Different Antenna Locations

- **Samsung**: Usually top-center or back
- **Pixel**: Usually top-center
- **OnePlus**: Usually back
- **Motorola**: Usually back

If one spot doesn't work, try others.

## Backing Up Your Tags

Good news: once you write a tag, you don't need to back it up. The data is on the sticker forever.

But if you want to keep a record of what's on your tags:

1. **TagWriter**: Tap "Read" on a written tag
2. Take a screenshot
3. Done

You now have a record of what's on that tag.

## Performance Tips

### Writing Faster

- Close other apps
- Make sure NFC is fully enabled (not just toggled, fully powered)
- Hold the phone steady during writing

### Tag Won't Write

- Tag might be locked or defective (try a new one)
- Sticker might be damaged
- Your phone's NFC might be acting up (restart phone)

## Next Steps

- **[Advanced Writing](../docs/WRITING_TO_NFC.md)** - Encryption, security
- **[Your First Project](../docs/GETTING_STARTED.md)** - Build something real
- **[Android + IFTTT](../README.md#projects-worth-stealing-ideas-from)** - Automate stuff on tap

You're now an Android NFC master. Go forth and write tags!
