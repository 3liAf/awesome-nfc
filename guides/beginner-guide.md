# Beginner's Guide to NFC - Your First Sticker

So you want to get started with NFC? Great! This guide will take you from zero to writing your first tag in about 15 minutes.

## What You'll Need

- **A smartphone** - Android (any recent model) or iPhone 12+
- **An NFC sticker** - Grab some NTAG215 stickers from Amazon (~.20 each in bulk)
- **An NFC app** - Free, takes 30 seconds to install
- **Something to put on the tag** - A URL, WiFi password, or just plain text

That's it. Seriously, that's all you need.

## Step 1: Get Your NFC Stickers

First things first—you need some actual stickers.

### Where to Buy

- **Amazon**: Search "NTAG215 stickers" - Usually 100-pack for \-20. Fast shipping, no hassle.
- **AliExpress**: Cheapest option, shipping takes 2-3 weeks. Still worth it.
- **DealExtreme**: Good middle ground on price and shipping.

### Why NTAG215?

We recommend NTAG215 for beginners because:
- 504 bytes of memory (plenty for most things)
- Works on every NFC phone
- Super cheap
- Rewritable—mess up? Just write again

Other options exist (NTAG213, NTAG216) but NTAG215 is the Goldilocks choice.

## Step 2: Install an NFC App

Pick one app from this list. They're all free and all do basically the same thing.

### For Android

1. **TagWriter by NXP** (Recommended)
   - Made by the company that makes NFC chips
   - Super reliable
   - Download: [Play Store](https://play.google.com/store/apps/details?id=com.nxp.nfc.tagwriter)

2. **NFC Tools**
   - More features than TagWriter
   - Slightly busier interface
   - Download: [Play Store](https://play.google.com/store/apps/details?id=com.wakdev.nfctools)

3. **Tagg**
   - Beautiful design
   - Great for social stuff
   - Download: [Play Store](https://play.google.com/store/apps/details?id=us.tagg.android)

### For iPhone

1. **Shortcuts** (Built-in, iOS 13+)
   - It's already on your phone
   - Limited but works fine for basics
   - No separate app needed

2. **TagWriter by NXP**
   - Same reliability as Android
   - Download: [App Store](https://apps.apple.com/us/app/tagwriter/id1246143896)

3. **Tagg**
   - Beautiful interface
   - Download: [App Store](https://apps.apple.com/us/app/tagg-tap-to-share/id1443848185)

## Step 3: Write Your First Tag

Let's actually do this.

### The Simplest Thing: A URL

This is the easiest first tag. You'll write "when someone taps this sticker, open google.com."

#### On Android (TagWriter)

1. Open TagWriter
2. Tap the **"Write"** button (usually big and obvious)
3. Choose **"New Tag"**
4. Tap **"Add a Record"** → **"URI"**
5. Enter your URL: https://www.google.com
6. Tap **"Write"** at the top
7. **Hold your phone to the sticker** for 2-3 seconds
8. Wait for the confirmation message
9. Done! Your tag is written.

#### On iPhone (Shortcuts App)

1. Open **Shortcuts** app
2. Tap **"+"** to create new shortcut
3. Add action: **"Open URL"**
4. Enter your URL
5. Tap the **⚙️** icon → **"Add NFC"**
6. Follow the prompts
7. **Hold your phone to the sticker** when prompted
8. Confirm and you're set

### Second Tag: Plain Text

Maybe you want to write your WiFi password to a tag. Or a shopping list. Or just "Hello World."

1. Open your NFC app
2. Choose **"Add Record"** → **"Text"**
3. Type whatever you want
4. Write to tag (hold phone to sticker)
5. Done

### Third Tag: Your Contact Info

This is useful. When people tap your tag, they get your contact details.

1. Open NFC app
2. Choose **"Add Record"** → **"vCard"** (or "Contact")
3. Fill in:
   - Name
   - Phone number
   - Email
   - Website (optional)
4. Write to tag
5. Now when someone taps it, your contact info auto-adds to their phone

## Step 4: Actually Tap It

Now the fun part. After you write a tag, test it.

1. **Unlock your phone** (important!)
2. Hold the sticker to the back of your phone (usually near the top)
3. Keep it there for 2-3 seconds
4. Look for a notification or dialog
5. Watch what happens

If it doesn't work:
- Make sure NFC is enabled (Settings → NFC)
- Check that the sticker isn't damaged
- Try a different part of your phone (the NFC chip location varies)
- Try a different app

## Tips for Success

### 1. Format Matters
Not all URLs work the same. Use full URLs:
- ✅ https://www.google.com
- ✅ http://google.com
- ❌ google.com (might not work)

### 2. NFC Must Be Enabled
Go to Settings → check NFC is on. Android hides this in different places depending on your phone.

### 3. Phone Position
NFC antennas are in different spots:
- Most phones: top-center or back
- Try moving the sticker around
- If one spot doesn't work, try another

### 4. Test Before You Deploy
Before you stick your tag somewhere, make sure it works. Write it, tap it, confirm it does what you want.

### 5. Rewritable Stickers
NTAG215 stickers are rewritable. Wrote the wrong thing? Just open the app again and write over it. No biggie.

## Common Beginner Mistakes

### Mistake #1: Buying Cheap Blank Stickers
Some super-cheap stickers don't work well. Spend  on a proper 100-pack from Amazon. Worth it.

### Mistake #2: Not Testing
Write a tag, immediately test it. Don't apply it to your desk and assume it works.

### Mistake #3: Forgetting to Enable NFC
This is embarrassing but happens to everyone. Check Settings if nothing happens.

### Mistake #4: URLs Without Protocol
google.com ≠ https://www.google.com
Always include the https:// part.

### Mistake #5: Blocking the Antenna
Some stickers have a metallic side. That blocks the signal. Stick them on non-metallic surfaces.

## What to Do With Your First Tags

Here are some fun first projects:

1. **Link to your social media** - Put your Instagram link on a sticker, put it on your desk
2. **WiFi sharing** - Create a tag with your guest WiFi, stick it on your router
3. **Automation trigger** - Create a tag that opens your music app or starts a workout
4. **Easter eggs** - Hide tags around your house that link to funny videos
5. **Business card alternative** - Stick a vCard tag to your laptop

## Troubleshooting

**"Nothing happens when I tap"**
- Is NFC enabled? Check Settings
- Is the sticker damaged? Try a new one
- Try different spots on your phone
- Try a different app

**"The tag writes but tapping does nothing"**
- The tag wrote successfully but the action can't complete
- Example: You wrote a URL but don't have internet
- Example: You wrote an automation but didn't set up the app
- Try writing a simple URL tag to test

**"App keeps crashing"**
- Reinstall the app
- Clear the app's cache (Settings → Apps → [AppName] → Storage)
- Try a different app

**"I can read but can't write"**
- Some stickers come locked. Try a different sticker.
- Your app might not have write permission. Check Settings → Permissions.

## Next Steps

Once you've written a few tags and gotten comfortable, check out:

- **[Advanced Writing Guide](./advanced-writing.md)** - Encryption, security, custom records
- **[Your First Project](./your-first-project.md)** - Build something actually useful
- **[NDEF Explained](./ndef-explained.md)** - Understand how NFC data works

## Questions?

Join the community:
- **[Reddit r/nfc](https://www.reddit.com/r/nfc/)** - Super friendly, great answers
- **[GitHub Issues](https://github.com/awesome-nfc/awesome-nfc/issues)** - Ask here

Good luck, and welcome to the NFC club! 🎉
