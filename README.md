# Awesome NFC [![Awesome](https://awesome.re/badge.svg)](https://awesome.re)

> Tools, libraries, hardware and guides for working with NFC tags and stickers.

NFC tags are cheap passive chips, usually under 20 cents each, that a phone can read and write by touching them. There is a lot of scattered material about them and not much that collects it in one place. This list tries to be that place, with a bias toward things that still work and are still maintained.

Every link here has been checked, and a scheduled job rechecks them weekly. Projects that are archived or dormant are labelled as such rather than quietly dropped, because some of them are still the best option available.

## Contents

- [Guides in this repository](#guides-in-this-repository)
- [Tag types](#tag-types)
- [Libraries](#libraries)
- [Mobile apps](#mobile-apps)
- [Desktop and CLI tools](#desktop-and-cli-tools)
- [Hardware](#hardware)
- [Embedded and microcontrollers](#embedded-and-microcontrollers)
- [Projects worth stealing ideas from](#projects-worth-stealing-ideas-from)
- [Security research](#security-research)
- [Specifications](#specifications)
- [Learning](#learning)
- [Community](#community)

## Guides in this repository

If you have never touched an NFC tag, start with [Getting started](docs/GETTING_STARTED.md). It takes about fifteen minutes and assumes nothing. [Writing to NFC tags](docs/WRITING_TO_NFC.md) then covers every method in more depth: phone, USB reader, Python, Node and Arduino. [NFC formats explained](docs/NFC_FORMATS.md) describes what NDEF actually is, which record types exist, and how the byte budget works out in practice.

Two platform notes sit separately, because the differences are annoying enough to deserve their own pages: the [Android guide](guides/android-guide.md) and the [iOS guide](guides/ios-guide.md), the latter covering what iOS can and cannot do and since which version.

The short version of all of it: buy a pack of NTAG215 stickers, install one of the apps below, choose "write", pick a record type, hold the phone against the sticker.

There is also a browser-based writer that needs no install: open [the hosted version](https://3liaf.github.io/awesome-nfc/web/) on an Android phone and write a tag from the browser. It uses the Web NFC API, so it only works in Chrome or Edge on Android, and it needs a secure context. To run the copy in [`web/`](web/) locally, serve it over HTTPS or from localhost:

```bash
cd web && python -m http.server 8000
```

## Tag types

Practical differences between the chips you will actually encounter. Usable bytes are lower than raw memory because NDEF has overhead.

| Chip                       | Usable NDEF | Notes                                                     |
| -------------------------- | ----------- | --------------------------------------------------------- |
| NTAG213                    | ~132 bytes  | Cheapest. Fine for short URLs.                            |
| NTAG215                    | ~492 bytes  | The sensible default. What Amiibo use.                    |
| NTAG216                    | ~872 bytes  | Buy if you are writing vCards or long payloads.           |
| MIFARE Ultralight          | ~46 bytes   | Common in transit tickets. Tight.                         |
| MIFARE Classic 1K          | ~716 bytes  | Broken crypto. iPhones cannot read it at all.             |
| MIFARE DESFire EV1/EV2/EV3 | multiple KB | Real cryptography. Used in access control.                |

Two things that catch people out: metal behind a tag kills it unless the tag is marked "on-metal", and iPhones cannot read MIFARE Classic because Apple never licensed it.

## Libraries

### Python

- [nfcpy](https://github.com/nfcpy/nfcpy) - The standard Python NFC library. Works with USB readers over PC/SC and libusb, and the documentation is genuinely good.
- [RFIDIOt](https://github.com/AdamLaurie/RFIDIOt) - Adam Laurie's long-running RFID and NFC toolkit. Older, but a lot of protocol knowledge is encoded in it.

### JavaScript and Node

- [nfc-pcsc](https://github.com/pokusew/nfc-pcsc) - The one to use for Node. Talks to ACR122U and similar readers with a sane API.
- [ndef-js](https://github.com/don/ndef-js) - Encode and decode NDEF messages in JavaScript.
- [react-NFC-sample](https://github.com/devpato/react-NFC-sample) - Small worked example of the Web NFC API in React.
- [Web NFC API](https://developer.mozilla.org/en-US/docs/Web/API/Web_NFC_API) - Browser-native reading and writing. Chrome and Edge on Android only.

### Android

- [Android NFC guide](https://developer.android.com/guide/topics/connectivity/nfc) - Official documentation, and better than it used to be.
- [ndef-tools-for-android](https://github.com/skjolber/ndef-tools-for-android) - Higher-level NDEF handling than the platform API offers.
- [external-nfc-api](https://github.com/skjolber/external-nfc-api) - Drive external USB readers from Android.
- [desfire-tools-for-android](https://github.com/skjolber/desfire-tools-for-android) - MIFARE DESFire EV1 support.
- [NFCAndroid](https://github.com/underwindfall/NFCAndroid) - Host card emulation example using Type 4 tags.

### iOS

- [Core NFC](https://developer.apple.com/documentation/corenfc) - Apple's framework. Reading since iOS 11, writing since iOS 13.
- [NFCReaderWriter](https://github.com/janlionly/NFCReaderWriter) - Swift wrapper covering both reading and writing.
- [VYNFCKit](https://github.com/vinceyuan/VYNFCKit) - Parses NDEF payloads into usable objects.

### Cross-platform

- [flutter_nfc_kit](https://github.com/nfcim/flutter_nfc_kit) - Flutter, Android and iOS, actively maintained.
- [Plugin.NFC](https://github.com/franckbour/Plugin.NFC) - .NET MAUI and Xamarin.
- [NFCReader-KMP](https://github.com/SEAbdulbasit/NFCReader-KMP) - Kotlin Multiplatform.
- [liblogicalaccess](https://github.com/liblogicalaccess/liblogicalaccess) - Large C++ RFID and NFC library for Windows, Linux, Mac and Android.
- [nfc_in_flutter](https://github.com/semlette/nfc_in_flutter) - Archived, but still referenced by a lot of older tutorials.

### C

- [libnfc](https://github.com/nfc-tools/libnfc) - The foundation almost everything else on Linux sits on.
- [libfreefare](https://github.com/nfc-tools/libfreefare) - Friendlier card manipulation on top of libnfc.

## Mobile apps

### Android

- [NFC Tools](https://play.google.com/store/apps/details?id=com.wakdev.wdnfc) - The general-purpose choice. Read, write, lock and run tasks.
- [MIFARE Classic Tool](https://github.com/ikarus23/MifareClassicTool) - For MIFARE Classic specifically, and open source.
- [NXP TagInfo](https://play.google.com/store/apps/details?id=com.nxp.taginfolite) - The best tag inspector. Tells you exactly which chip you are holding.
- [TagMo](https://github.com/HiddenRamblings/TagMo) - Writes Amiibo data to NTAG215. Sideload only.

### iOS

- [NFC Tools for iOS](https://apps.apple.com/us/app/nfc-tools/id1252962749) - Same developer as the Android version.
- [Shortcuts](https://apps.apple.com/us/app/shortcuts/id915249334) - Built in. Automations can trigger on a specific tag, which covers most personal automation with no third-party app at all.

## Desktop and CLI tools

- [NFCToolsGUI](https://github.com/GSWXXN/NFCToolsGUI) - Cross-platform GUI for PN532 readers.
- [Proxmark3GUI](https://github.com/wh201906/Proxmark3GUI) - Graphical front end for the Proxmark3 client.
- [ACR122U-reader-writer](https://github.com/mdeverdelhan/ACR122U-reader-writer) - Minimal read and write utility for the most common USB reader.
- [mfterm](https://github.com/4ZM/mfterm) - Terminal for working with MIFARE Classic tags.
- [mfdread](https://github.com/zhovner/mfdread) - Turns MIFARE dumps into something a human can read.

## Hardware

- [Proxmark3](https://github.com/RfidResearchGroup/proxmark3) - The serious research tool, roughly 70 to 300 US dollars depending on version. The Iceman fork is the firmware everyone actually runs.
- [ChameleonUltra](https://github.com/RfidResearchGroup/ChameleonUltra) - Card emulation, successor to the ChameleonMini.
- [ChameleonMini](https://github.com/emsec/ChameleonMini) - The original emulator.
- [ChameleonMini-rebooted](https://github.com/iceman1001/ChameleonMini-rebooted) - Maintained fork of the above.
- [Flipper Zero](https://github.com/flipperdevices/flipperzero-firmware) - Does NFC among many other things. Convenient, but not a replacement for a Proxmark.
- [PN532 tutorial](https://learn.adafruit.com/adafruit-pn532-rfid-nfc) - The PN532 breakout costs about five dollars and is the usual starting point for microcontroller projects.

The ACR122U is the default USB reader at around thirty dollars, supported by nearly every library listed here, and limited to 13.56 MHz Type A.

For tags themselves, buy NTAG215 unless you have a reason not to. A hundred stickers costs roughly ten to fifteen dollars. Check three things before ordering: whether it is marked "on-metal" if it is going on anything metallic, whether it is a wet inlay (has adhesive) or dry inlay (does not), and whether the listing names the actual chip. A listing that only says "NFC sticker 1K" usually means MIFARE Classic, which iPhones cannot read. Beyond stickers you can get cards, keyfobs, wristbands, discs, screws, laundry tags, epoxy tokens and implants.

## Embedded and microcontrollers

- [esp-idf-rc522](https://github.com/abobija/esp-idf-rc522) - RC522 driver for ESP-IDF.
- [NDEF for Arduino](https://github.com/don/NDEF) - Read and write NDEF from Arduino with a PN532. Dormant, but still the standard choice.
- [mifare_classic driver](https://github.com/libdriver/mifare_classic) - Portable MIFARE Classic driver.
- [FPGA-NFC](https://github.com/WangXuan95/FPGA-NFC) - An NFC reader built in Verilog without a reader chip. Unusual and worth reading.

## Projects worth stealing ideas from

Real deployments rather than concepts.

- [tagreader](https://github.com/adonno/tagreader) - A small NFC reader designed to sit on a wall and talk to Home Assistant. One of the tidiest NFC hardware projects on GitHub.
- [foqos](https://github.com/awaseem/foqos) - iOS app that locks you out of distracting apps until you tap a physical tag. A good example of a tag as a commitment device.
- [OpenSpool](https://github.com/spuder/OpenSpool) - RFID tagging for 3D printer filament so the printer knows what is loaded.
- [RFID-Tag-Guide](https://github.com/Bambu-Research-Group/RFID-Tag-Guide) - Reverse engineering of Bambu Lab's filament tags, with an excellent write-up of the process.
- [nfc2klipper](https://github.com/bofh69/nfc2klipper) - Connects spool tags to Klipper and Spoolman.
- [metrodroid](https://github.com/metrodroid/metrodroid) - Reads public transit cards and decodes the trip history stored on them.
- [TagTuner](https://github.com/luka6000/TagTuner) - Tap a tag to play an album. Physical media for streaming, done properly.
- [WiFiKeyShare](https://github.com/bparmentier/WiFiKeyShare) - Share WiFi credentials by tag or QR code. Archived, but the reference implementation for WiFi record encoding.

## Security research

Included because understanding the attacks is how you choose the right chip. For hardware you own or are authorised to test.

- [mfoc](https://github.com/nfc-tools/mfoc) - MIFARE Classic offline cracker, exploiting the nested authentication weakness.
- [mfcuk](https://github.com/nfc-tools/mfcuk) - The darkside attack, which recovers a key with no known key.
- [crypto1_bs](https://github.com/aczid/crypto1_bs) - Bitsliced Crypto-1 brute forcer.
- [miLazyCracker](https://github.com/nfc-tools/miLazyCracker) - Wraps the hardnested attack into a single command.
- [magspoof](https://github.com/samyk/magspoof) - Samy Kamkar on magnetic stripe and contactless emulation. Adjacent to NFC, and the research is worth reading.

The practical takeaway: MIFARE Classic's Crypto-1 cipher was broken in 2008 and keys can be recovered in seconds. Do not use it for anything that matters. Use DESFire EV2 or EV3 if you need real security, or accept that NTAG chips are open by design and put nothing secret on them.

## Specifications

- [NFC Forum](https://nfc-forum.org/) - The body that publishes the tag type and NDEF specifications.
- [Web NFC draft](https://w3c.github.io/web-nfc/) - The W3C specification behind the browser API.
- [Web NFC on Chrome](https://developer.chrome.com/docs/capabilities/nfc) - Implementation notes and current browser support.
- [ISO/IEC 14443](https://en.wikipedia.org/wiki/ISO/IEC_14443) - Proximity cards, the standard behind Type A and Type B tags.
- [ISO/IEC 18092](https://en.wikipedia.org/wiki/ISO/IEC_18092) - NFCIP-1, covering peer-to-peer mode.

Tag types 1 through 5 are NFC Forum categories, not chip names. NTAG213, NTAG215 and NTAG216 are all Type 2. DESFire is Type 4. Sony FeliCa is Type 3 and appears mostly in Japan.

## Learning

- [nfcpy documentation](https://nfcpy.readthedocs.io/) - Readable explanations of the protocol layers, useful even if you never write Python.
- [Adafruit PN532 guide](https://learn.adafruit.com/adafruit-pn532-rfid-nfc/overview) - The standard introduction for hardware projects.
- [NFC on Android Developers](https://developer.android.com/develop/connectivity/nfc/nfc) - Platform reference covering intents, foreground dispatch and tag technologies.

## Community

- [r/RFID](https://www.reddit.com/r/RFID/) - General RFID and NFC discussion.
- [r/flipperzero](https://www.reddit.com/r/flipperzero/) - Busy, and a lot of NFC content.
- [Proxmark forum](http://www.proxmark.org/forum/) - Where most of the deep protocol discussion happens.
- [Dangerous Things forum](https://forum.dangerousthings.com/) - Implants, but a lot of general tag knowledge too.
- [NFC on Stack Overflow](https://stackoverflow.com/questions/tagged/nfc) - For programming questions.

## Contributing

Suggestions are welcome. See [the contributing guide](CONTRIBUTING.md). The main rule is that links must be live and projects must be either maintained or explicitly labelled as not.
