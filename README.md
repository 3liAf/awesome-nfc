# Awesome NFC [![Awesome](https://awesome.re/badge.svg)](https://awesome.re)

> The most comprehensive resource for NFC (Near Field Communication) stickers, tags, and everything you need to get started.

Welcome to the ultimate NFC playground. Whether you're building your first smart sticker collection, automating your home, or just experimenting with contactless tech, you've come to the right place. This repo has everything—from beginner guides to advanced projects, tools, and resources that'll make you an NFC ninja.

## Table of Contents

- [Getting Started](#getting-started)
- [How to Write to NFC Stickers](#how-to-write-to-nfc-stickers)
- [NFC Tag Types](#nfc-tag-types)
- [Libraries & Frameworks](#libraries--frameworks)
- [Web & Mobile Apps](#web--mobile-apps)
- [Tools & Utilities](#tools--utilities)
- [Hardware](#hardware)
- [Projects & Use Cases](#projects--use-cases)
- [Learning Resources](#learning-resources)
- [Standards & Specifications](#standards--specifications)
- [Community & Discussions](#community--discussions)
- [Contributing](#contributing)

## Getting Started

### What is NFC?

NFC is short for Near Field Communication—basically your phone's superpower for talking to tiny chips in stickers and cards without any batteries. It's all about convenience: one tap and your phone does something. Open a URL, connect to WiFi, launch an app, share contact info—you name it.

### What Can You Do With NFC?

- **Automation**: Tap a sticker when you leave work to turn off lights, silence notifications, start navigation
- **Smart Home**: Control devices with a single tap instead of digging through apps
- **Quick Actions**: Open apps, send messages, or trigger routines with one tap
- **Business Cards**: Share your contact details instantly—no typing needed
- **Tracking & Inventory**: Manage assets, track shipments, organize your life
- **Gaming & Collectibles**: Create interactive experiences with physical objects
- **Event Management**: Check-ins, digital badges, instant notifications

### Quick Start in 5 Minutes

1. **Get an NFC sticker** - Order NTAG213, NTAG215, or NTAG216 from Amazon or AliExpress (cheap!)
2. **Download an app** - Grab one from the Web & Mobile Apps section
3. **Write your first tag** - Use our web app
4. **Tap it** - Hold your phone near the sticker and watch it happen
5. **Celebrate** - You just wrote your first NFC tag!

## How to Write to NFC Stickers

### TL;DR - Android (Easiest)
1. Download an NFC app (TagWriter, NFC Tools, Tagg)
2. Tap "Write New Tag"
3. Add your URL, text, or custom action
4. Hold your phone to the sticker for 2-3 seconds
5. Done!

### iPhone
1. iOS 13.1+ has built-in NFC support in Shortcuts
2. Use TagWriter for more features
3. Works exactly like Android

### Via Our Web App
1. Go to the web app
2. Choose what goes on your tag (URL, WiFi, text, vCard)
3. Click "Write to Tag"
4. Hold phone to sticker
5. Get instant confirmation

## NFC Tag Types

| Type | Memory | Best For |
|------|--------|----------|
| **NTAG213** | 180 bytes | URLs, simple actions |
| **NTAG215** | 504 bytes | WiFi configs, flexibility |
| **NTAG216** | 924 bytes | Complex data |
| **MIFARE Classic** | 1024 bytes | Legacy uses |

**Pro tip**: Start with NTAG215 or NTAG216. Affordable, plenty of space, work everywhere.

## Libraries & Frameworks

### JavaScript/Node.js
- **[nfc-js](https://github.com/makimenko/nfc-js)** - Cross-platform library
- **[react-nfc](https://github.com/xkrivzooh/react-nfc)** - React wrapper
- **[ndef.js](https://github.com/don/ndef.js)** - NDEF parsing

### Python
- **[nfcpy](https://github.com/schollz/nfcpy)** - Standard Python library
- **[pymifare](https://github.com/Trevol/pymifare)** - MIFARE Classic

### Java/Android
- **[Android NFC API](https://developer.android.com/guide/topics/connectivity/nfc)** - Official docs
- **[ndef-nfc](https://github.com/akinaro/ndef-nfc)** - Wrapper

### Swift/iOS
- **[CoreNFC](https://developer.apple.com/documentation/corenfc)** - Apple framework
- **[NFCKit](https://github.com/josephlord/NFCKit)** - Swift wrapper

### C/C++
- **[libnfc](http://nfc.org/)** - Most reliable library
- **[libfreefare](https://github.com/nfc-tools/libfreefare)** - Higher-level abstraction

## Web & Mobile Apps

### Web-Based
- **NFC Creator** - Write tags from your browser (works offline!)
- **[TagWriter by NXP](https://www.nxp.com/products/wireless/nfc/tagwriter/)** - Official tool
- **[Tagg](https://tagg.us)** - Social profiles
- **[NFCTools](https://www.wakdev.com/en/nfctools.html)** - Simple UI

### Android
- **[TagWriter by NXP](https://play.google.com/store/apps/details?id=com.nxp.nfc.tagwriter)** - Gold standard
- **[NFC Tools](https://play.google.com/store/apps/details?id=com.wakdev.nfctools)** - Swiss army knife
- **[Trigger](https://www.trigger.io/)** - Automation

### iOS
- **[TagWriter by NXP](https://apps.apple.com/us/app/tagwriter/id1246143896)** - Reliable
- **[Shortcuts](https://apps.apple.com/us/app/shortcuts/id915249334)** - Apple automation

## Tools & Utilities

- **[proxmark3](https://github.com/rfidresearchgroup/proxmark3)** - NFC analysis
- **[mfoc](https://github.com/nfc-tools/mfoc)** - Key cracking
- **[ACR122U](https://www.acs.com.hk/en/products/3/acr122u---nfc-usb-reader/)** - USB reader/writer

## Projects & Use Cases

- **Smart Home** - One tap to control lights, music, temperature
- **Business Cards** - Share resume and social links instantly
- **Event Check-in** - Tap for instant registration
- **Product Authentication** - Verify genuine products
- **Custom Amiibo Cards** - Create Nintendo cards at home
- **Medication Reminders** - Tap to log intake
- **Escape Rooms** - NFC puzzles
- **Equipment Tracking** - Know where things are

## Learning Resources

### Tutorials
- NFC Basics - Start here
- NDEF Explained - Understanding NFC data
- Your First Project - Build in 30 minutes

### Video Tutorials
- **[Computerphile - NFC Security](https://www.youtube.com/watch?v=Yd5UH_5jxfc)**
- **[Andreas Spiess - NFC Projects](https://www.youtube.com/playlist?list=PL3XBzmZj5DuGIzJ5VoYxD1AeaZwL0wDV4)**
- **[Linus Tech Tips - NFC Explained](https://www.youtube.com/watch?v=w-MM6Xm-Zqo)**

## Standards & Specifications

- **Type 1** - Simple tags
- **Type 2** - Rewritable (NTAG series)
- **Type 3** - FeliCa (Japan)
- **Type 4** - ISO 14443 Type B

## Community & Discussions

- **[Reddit r/nfc](https://www.reddit.com/r/nfc/)** - Active community
- **[Stack Overflow - NFC](https://stackoverflow.com/questions/tagged/nfc)** - Q&A

## Contributing

Love NFC? Help us build the best resource:

1. **Fork** this repo
2. **Create a branch**
3. **Make your changes**
4. **Open a Pull Request**

We want:
- ✅ NFC libraries & frameworks
- ✅ Real-world projects
- ✅ Guides & tutorials
- ✅ Tools & utilities
- ❌ Abandoned projects

## License

MIT License - see [LICENSE](./LICENSE)

---

**Built with ❤️ by the NFC community**

Have an awesome NFC project? [Tell us!](https://github.com/awesome-nfc/awesome-nfc/issues/new)
