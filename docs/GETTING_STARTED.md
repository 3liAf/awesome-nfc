# Getting Started with NFC

You want to work with NFC but don't know where to start? This guide will get you writing to tags in 10 minutes.

## Step 1: Understand What NFC Is (2 minutes)

NFC = **Near Field Communication**. It's just a way to store data on a tag and read it wirelessly.

**Key facts:**
- Range: 2-4 cm (you need to hold it right up to the reader)
- Speed: Data transfers in milliseconds
- One-way: Tags are passive (no battery), readers are active
- Cheap: ~$0.30 per tag in bulk
- Reliable: Used in credit cards, subway passes, hotel keys everywhere

That's genuinely it. It's not magical, just a radio protocol that works over short distances.

## Step 2: Get Hardware (Optional but Recommended)

Pick one:

**Option A: Use Your Phone** (free if you have it)
- Most Android phones 2015+ have NFC
- iPhone XS+ can read, but writing is limited
- Test if you have it: Settings → About → look for "NFC"

**Option B: Get an ACR122U Reader** (~$30)
- USB reader, works on Windows/Mac/Linux
- More reliable than phone for development
- Not necessary to start

**Option C: Both** (best for serious work)

For this guide, we'll use your phone. It's easier.

## Step 3: Get Some Tags (~$5)

NFC stickers, pack of 10. Search "NTAG 215 stickers" on Amazon or AliExpress.

**What to look for:**
- Type: NTAG 215 (most common)
- Format: Stickers (convenient)
- Quantity: 10-pack (gives you spares to play with)
- Seller: Reputable (check reviews)

You'll get little sticky labels. Put one somewhere visible.

## Step 4: Write Your First Tag (5 minutes)

### If You're on Android:

**Method 1 (Easiest): NFC Tools App**

1. Install [NFC Tools](https://play.google.com/store/apps/details?id=com.wakdev.nfctools) from Play Store
2. Open the app → "Write" tab
3. Tap "Add a record"
4. Select "URL"
5. Type: `https://google.com`
6. Tap "Write"
7. Hold your NTAG 215 sticker to the back of your phone (upper area, centered)
8. Keep it there for 2-3 seconds
9. Wait for the green checkmark ✓

Done. You've written your first NFC tag.

**Method 2 (No App): Web NFC**

If you have Chrome/Edge:

1. Open Chrome on your Android phone
2. Go to the [NFC Tag Creator](../web/) page in this repo
3. Enter: `https://google.com`
4. Tap "Write to Tag"
5. Follow the same process as above (tap tag to back of phone)

### If You're on iPhone:

iPhone writing is limited (Apple's restriction), but you can:

1. Download [NFC Tools](https://apps.apple.com/us/app/nfc-tools/id1252070271) from App Store
2. Same process as Android
3. Or use an Android phone to write the tag first, then test reading it

### If You're on Desktop (No Mobile):

You need an ACR122U reader:

1. Plug it in via USB
2. Download [NFC TagWriter by NXP](https://www.nxp.com/products/rfid-nfc/nfc-tools/nfc-tagwriter-by-nxp/)
3. Create a record, place tag on reader, click write

## Step 5: Test What You Wrote

**Android:** Just tap the tag with your phone. Browser should open Google.

**iOS:** Tap the tag. It should recognize the URL.

If it works → congrats, you understand NFC. If it doesn't → see troubleshooting below.

## Step 6: Write Something More Useful

Now try:

**A link to something you actually use:**
```
https://your-website.com
https://docs.google.com/spreadsheets/d/YOUR-SHEET-ID
https://github.com/your-repo
```

**Your contact info (vCard):**

In NFC Tools, add a "Contact" record with your name, phone, email.

**A WiFi network** (Android only):

In NFC Tools, add "WiFi" record with your network name and password. Anyone can scan it to join.

## Common Problems

### "NFC is not supported on this device"

Your phone doesn't have NFC hardware. You'll need a reader (ACR122U).

### "NFC is disabled"

Settings → NFC → Turn it on. Some phones hide this deeper (look for "Connectivity" or "Wireless").

### "Nothing happens when I tap the tag"

1. Keep it still on the back of your phone for a full 3 seconds
2. Make sure NFC is on
3. If the tag is brand new, it might be empty - try writing again
4. Try a different area of your phone (usually upper back)

### "The write kept failing"

- Your phone might have moved during write - keep it completely still
- The tag might be defective (try another one)
- The tag might already be locked (from factory) - try a different tag

### "I wrote something but it's not reading correctly"

In NFC Tools, tap "Read" to see exactly what's on the tag. You'll see the raw NDEF data, which helps debug.

## What You Actually Did

Congratulations, you:

1. ✓ Wrote data to a wireless tag
2. ✓ Demonstrated NFC communication
3. ✓ Created something that will work in 5+ years without power
4. ✓ Used the same tech in credit cards and office key fobs

That's the core of NFC. Everything else is variations on this.

## Next: What You Can Build

Now that you understand the basics:

### Simple Projects (Today)
- QR code replacement: Link to your resume / portfolio
- Automation trigger: Tap tag to launch a routine on your phone
- Sharing: Easy contact exchange at events
- WiFi access: Guests tap to join your network

### Medium Projects (This Week)
- Home automation entry point
- Game mechanic (tap to unlock achievement)
- Inventory tracking
- Door access logging

### Advanced (If You Get Serious)
- Encrypted authentication (more secure than it sounds)
- Sensor integration (NTAG I²C Plus has GPIO)
- Game modding (custom tag data)
- Hardware reader for your own app

## Learning Resources

**If you want more technical depth:**

- [NFC Formats Explained](./NFC_FORMATS.md) - NDEF records, standards, technical stuff
- [Writing to NFC Complete Guide](./WRITING_TO_NFC.md) - Everything about writing data
- [NFC Tag Types](../README.md#tag-types) - Different chip types and when to use each

**If you want to code:**

- [Web NFC API](https://w3c.github.io/web-nfc/) - JavaScript API
- [Android NFC Framework](https://developer.android.com/guide/topics/connectivity/nfc) - Official docs
- [nfcpy Library](https://nfcpy.readthedocs.io/) - Python for desktop/research

**If you want real examples:**

Check [../examples/](../examples/) folder for working code.

## Your Next Step

1. Write a tag with your GitHub profile URL
2. Try the Web NFC app if you have Android
3. Share a tag with someone (they'll think it's magic)
4. Then decide what you actually want to build

You've got this.
