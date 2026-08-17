# iPhone NFC Guide

NFC on iPhone got the green light starting with iOS 13. If you're running iOS 13 or later, you can read and write NFC tags. Here's how.

## Check Your iPhone Model

NFC writing is available on:
- iPhone XS and later (for writing in iOS 14+)
- iPhone XR and later

**Older iPhones** (iPhone X, 8, 7, 6) can read but not write. Sorry.

## Enable NFC

Good news: it's on by default on supported phones. No settings to toggle.

Bad news: there's no dedicated NFC app. You need to use the **Shortcuts** app or a third-party app.

## Option 1: Use Shortcuts (Built-in)

This is the simplest way.

### Writing a URL Tag

1. **Open Shortcuts** app
2. **"+"** to create new shortcut
3. **"Add Action"**
4. Search for **"Open URL"**
5. Paste your URL
6. Tap the **⚙️** icon at the bottom
7. **"Add NFC"**
8. Choose **"Write..."**
9. Hold phone to tag when prompted
10. Confirm
11. Done

### Writing Text

1. **Shortcuts** app → **"+"**
2. **"Add Action"**
3. Search **"Show Result"**
4. Type your text in the text field
5. **⚙️** → **"Add NFC"**
6. **"Write..."**
7. Hold phone to sticker
8. Confirm

### Writing Contact Info

Unfortunately, Shortcuts doesn't have great contact support. Use a third-party app for this.

## Option 2: Third-Party Apps

For more features, install an NFC app.

### TagWriter by NXP
- **Same reliability as Android**
- **Can write contacts, WiFi, etc.**
- **Download**: [App Store](https://apps.apple.com/us/app/tagwriter/id1246143896)

### Tagg
- **Beautiful design**
- **Great for social sharing**
- **Download**: [App Store](https://apps.apple.com/us/app/tagg-tap-to-share/id1443848185)

### NFC Tagwriter
- **Simple, focused**
- **Reliable**
- **Download**: [App Store](https://apps.apple.com/us/app/nfc-tagwriter/id1305695736)

## Writing Different Types (Third-Party Apps)

If you're using TagWriter or similar:

### URL
1. **"Write"** → **"New Tag"**
2. **"URI"**
3. Paste URL
4. **"Write"**
5. Hold phone to sticker
6. Done

### Contact/vCard
1. **"Write"** → **"New Tag"**
2. **"vCard"**
3. Fill in contact details
4. **"Write"**
5. Hold phone to sticker

### WiFi
1. **"Write"** → **"New Tag"**
2. **"WiFi"**
3. Enter network name and password
4. **"Write"**
5. Hold phone to sticker

## Why iPhone is Slower Than Android

A few reasons:

1. **iOS has restrictions** - Apple limits what can touch NFC for security
2. **Fewer apps** - Less competition means fewer feature-rich options
3. **iOS processes things differently** - Sometimes takes longer

This doesn't mean it's broken. It just means Android is faster.

## Common iPhone NFC Issues

### "NFC is not available"
- You're on iPhone 7 or older (no NFC hardware)
- Your phone isn't connected to a cell network
- Restart your phone

### "Can't write to tag"
- Your tag might be locked
- Your phone might be acting up (restart it)
- Try a different app
- Make sure you're holding phone steady

### "It says it's writing but nothing happens"
- iOS sometimes shows this false message
- Just wait a few seconds
- If nothing happens after 10 seconds, try again

### Tag Tapped But Nothing Happens
- The action might be failing (e.g., URL is broken)
- Test with a different tag
- Make sure the app that's supposed to open is installed

## Performance Tips

### Faster Writing
- Close other apps
- Keep phone steady during writing
- Don't move the phone until you see confirmation

### Faster Reading
- Angle your phone properly to the sticker
- Usually works better at the top-center or back

## Reading vs Writing

- **Reading**: All iPhones with iOS 13+ can read
- **Writing**: Only iOS 14+ on XS and newer models

If you're on iOS 13 with an XS, you can read but not write. Upgrade to iOS 14+ to write.

## Automating Tap Actions

Once you write a tag, you can create automations:

1. **Shortcuts app** → **Automation** (tab)
2. **"Create Personal Automation"**
3. **"NFC"**
4. **"Select a tag"** (tap your tag)
5. Choose your action (open URL, send message, etc.)
6. Confirm

Now when someone taps your tag, the automation runs.

## Backing Up Your Tags

Like Android, once written the data stays on the sticker.

To keep a record:
1. Use the app you wrote the tag with
2. Tap "Read" on an existing tag
3. Screenshot the details
4. You've got a backup

## Next Steps

- **[Advanced Writing](./advanced-writing.md)** - Get deeper
- **[Your First Project](./your-first-project.md)** - Build something real
- **[Automation Guide](./automation.md)** - Make tapping do cool stuff

You're now an iPhone NFC expert!
