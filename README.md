# Awesome NFC [![Awesome](https://awesome.re/badge.svg)](https://awesome.re)

A curated list of tools, libraries, hardware and guides for working with NFC tags and stickers.

NFC tags are cheap passive chips — usually under 20 cents each — that a phone can read and write by touching them. There is a lot of scattered material about them and not much that collects it in one place. This list tries to be that place, with a bias toward things that still work and are still maintained.

Every link here has been checked. Projects that are archived or clearly dormant are labelled as such rather than quietly dropped, because some of them are still the best option available.

## Contents

- [Start here](#start-here)
- [Writing tags](#writing-tags)
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

## Start here

If you have never touched an NFC tag, read [Getting started](docs/GETTING_STARTED.md). It takes about fifteen minutes and assumes nothing.

The short version: buy a pack of NTAG215 stickers, install [NFC Tools](https://play.google.com/store/apps/details?id=com.wakdev.wdnfc) on Android or [NFC Tools for iOS](https://apps.apple.com/us/app/nfc-tools/id1252962749), pick "write", choose a record type, hold the phone against the sticker. That is the whole workflow. Everything else in this list is detail on top of it.

There is also a browser-based writer in [`web/`](web/) that needs no install. It uses the Web NFC API, so it only works in Chrome or Edge on Android. See [running the web app](#running-the-web-app).

## Writing tags

- [Getting started](docs/GETTING_STARTED.md) — first tag, start to finish.
- [Writing to NFC tags](docs/WRITING_TO_NFC.md) — every method: phone, PC reader, Python, Node, Arduino.
- [NFC formats explained](docs/NFC_FORMATS.md) — what NDEF actually is, record types, byte budgets.
- [Android guide](guides/android-guide.md) — Android specifics and app walkthroughs.
- [iOS guide](guides/ios-guide.md) — what iOS can and cannot do, and since which version.

### Running the web app

```bash
cd web && python -m http.server 8000
```

Then open `http://localhost:8000` on an Android phone on the same network. Web NFC requires a secure context, so for phone testing either use `localhost` via USB port-forwarding or serve it over HTTPS.

## Tag types

Practical differences between the chips you will actually encounter. Usable bytes are lower than raw memory because NDEF has overhead.

| Chip | Usable NDEF | Notes |
|---|---|---|
| NTAG213 | ~132 bytes | Cheapest. Fine for short URLs. |
| NTAG215 | ~492 bytes | The sensible default. What Amiibo use. |
| NTAG216 | ~872 bytes | Buy if you are writing vCards or long payloads. |
| MIFARE Ultralight | ~46 bytes | Common in transit tickets. Tight. |
| MIFARE Classic 1K | ~716 bytes | Broken crypto, see [security research](#security-research). iPhones cannot read it. |
| MIFARE DESFire EV1/EV2/EV3 | multiple KB | Real cryptography. Used in access control. |

Two things that catch people out: metal behind a tag kills it unless the tag is marked "on-metal", and iPhones cannot read MIFARE Classic at all because Apple never licensed it.

## Libraries

### Python

- [nfcpy](https://github.com/nfcpy/nfcpy) — the standard Python NFC library. Works with USB readers over PC/SC and libusb. Documentation is genuinely good.
- [RFIDIOt](https://github.com/AdamLaurie/RFIDIOt) — Adam Laurie's long-running RFID/NFC toolkit. Older, but a lot of protocol knowledge is encoded in it.

### JavaScript and Node

- [nfc-pcsc](https://github.com/pokusew/nfc-pcsc) — the one to use for Node. Talks to ACR122U and similar readers, sane API.
- [ndef-js](https://github.com/don/ndef-js) — encode and decode NDEF messages in JS.
- [react-NFC-sample](https://github.com/devpato/react-NFC-sample) — small worked example of the Web NFC API in React.
- [Web NFC API](https://developer.mozilla.org/en-US/docs/Web/API/Web_NFC_API) — browser-native reading and writing. Chrome/Edge on Android only.

### Android

- [Android NFC guide](https://developer.android.com/guide/topics/connectivity/nfc) — official documentation, and better than it used to be.
- [ndef-tools-for-android](https://github.com/skjolber/ndef-tools-for-android) — higher-level NDEF handling than the platform API.
- [external-nfc-api](https://github.com/skjolber/external-nfc-api) — drive external USB readers from Android.
- [desfire-tools-for-android](https://github.com/skjolber/desfire-tools-for-android) — MIFARE DESFire EV1 support.
- [NFCAndroid](https://github.com/underwindfall/NFCAndroid) — host card emulation example using Type 4 tags.

### iOS

- [Core NFC](https://developer.apple.com/documentation/corenfc) — Apple's framework. Reading since iOS 11, writing since iOS 13.
- [NFCReaderWriter](https://github.com/janlionly/NFCReaderWriter) — Swift wrapper covering both reading and writing.
- [VYNFCKit](https://github.com/vinceyuan/VYNFCKit) — parses NDEF payloads into usable objects.

### Cross-platform

- [flutter_nfc_kit](https://github.com/nfcim/flutter_nfc_kit) — Flutter, Android and iOS, actively maintained.
- [Plugin.NFC](https://github.com/franckbour/Plugin.NFC) — .NET MAUI and Xamarin.
- [NFCReader-KMP](https://github.com/SEAbdulbasit/NFCReader-KMP) — Kotlin Multiplatform.
- [liblogicalaccess](https://github.com/liblogicalaccess/liblogicalaccess) — large C++ RFID/NFC library, Windows/Linux/Mac/Android.
- [nfc_in_flutter](https://github.com/semlette/nfc_in_flutter) — *archived*, but still referenced in a lot of older tutorials.

### C

- [libnfc](https://github.com/nfc-tools/libnfc) — the foundation almost everything else on Linux sits on.
- [libfreefare](https://github.com/nfc-tools/libfreefare) — friendlier card manipulation on top of libnfc.

## Mobile apps

### Android

- [NFC Tools](https://play.google.com/store/apps/details?id=com.wakdev.wdnfc) — the general-purpose choice. Read, write, lock, run tasks.
- [MIFARE Classic Tool](https://play.google.com/store/apps/details?id=de.syss.MifareClassicTool) — for MIFARE Classic specifically. [Source](https://github.com/ikarus23/MifareClassicTool).
- [NXP TagInfo](https://play.google.com/store/apps/details?id=com.nxp.taginfolite) — the best tag inspector. Tells you exactly what chip you are holding.
- [TagMo](https://github.com/HiddenRamblings/TagMo) — writes Amiibo data to NTAG215. Sideload only.

### iOS

- [NFC Tools for iOS](https://apps.apple.com/us/app/nfc-tools/id1252962749) — same developer as the Android version.
- Shortcuts — built in. Automations can trigger on a specific tag, which covers most personal automation without any third-party app.

## Desktop and CLI tools

- [NFCToolsGUI](https://github.com/GSWXXN/NFCToolsGUI) — cross-platform GUI for PN532 readers.
- [Proxmark3GUI](https://github.com/wh201906/Proxmark3GUI) — graphical front end for the Proxmark3 client.
- [ACR122U-reader-writer](https://github.com/mdeverdelhan/ACR122U-reader-writer) — minimal read/write utility for the most common USB reader.
- [mfterm](https://github.com/4ZM/mfterm) — terminal for working with MIFARE Classic tags.
- [mfdread](https://github.com/zhovner/mfdread) — turns MIFARE dumps into something a human can read.

## Hardware

### Readers and writers

- ACR122U — around $30. The default USB reader. Supported by nearly every library here. Note it is limited to 13.56 MHz Type A.
- PN532 breakout — around $5. For microcontroller projects. [Adafruit's tutorial](https://learn.adafruit.com/adafruit-pn532-rfid-nfc) is the usual entry point.
- [Proxmark3](https://github.com/RfidResearchGroup/proxmark3) — $70 to $300 depending on version. The serious research tool. The Iceman fork is the firmware everyone actually runs.
- [ChameleonUltra](https://github.com/RfidResearchGroup/ChameleonUltra) — card emulation, successor to the ChameleonMini.
- [ChameleonMini](https://github.com/emsec/ChameleonMini) — the original emulator. See also the [rebooted fork](https://github.com/iceman1001/ChameleonMini-rebooted).
- [Flipper Zero](https://github.com/flipperdevices/flipperzero-firmware) — does NFC among many other things. Convenient, not a replacement for a Proxmark.

### Tags

Buy NTAG215 unless you have a reason not to. A hundred stickers costs roughly $10-15 from the usual marketplaces. Things to check before ordering:

- "On-metal" or "anti-metal" if it is going on anything metallic.
- Wet inlay means it has adhesive. Dry inlay does not.
- Avoid listings that will not name the chip. "NFC sticker 1K" usually means MIFARE Classic, which iPhones cannot read.

Form factors beyond stickers: cards, keyfobs, wristbands, discs, screws, laundry tags, epoxy tokens, and implants.

## Embedded and microcontrollers

- [esp-idf-rc522](https://github.com/abobija/esp-idf-rc522) — RC522 driver for ESP-IDF.
- [NDEF for Arduino](https://github.com/don/NDEF) — read and write NDEF from Arduino with a PN532. Dormant but still the standard choice.
- [mifare_classic driver](https://github.com/libdriver/mifare_classic) — portable MIFARE Classic driver.
- [FPGA-NFC](https://github.com/WangXuan95/FPGA-NFC) — an NFC reader built in Verilog, without a reader chip. Unusual and worth reading.

## Projects worth stealing ideas from

Real deployments, not concepts.

- [tagreader](https://github.com/adonno/tagreader) — a small NFC reader designed to sit on a wall and talk to Home Assistant. One of the tidiest NFC hardware projects on GitHub.
- [foqos](https://github.com/awaseem/foqos) — iOS app that locks you out of distracting apps until you tap a physical NFC tag. Good example of a tag as a commitment device.
- [OpenSpool](https://github.com/spuder/OpenSpool) — RFID tagging for 3D printer filament so the printer knows what is loaded.
- [RFID-Tag-Guide](https://github.com/Bambu-Research-Group/RFID-Tag-Guide) — reverse engineering of Bambu Lab's filament tags. Excellent write-up of the process.
- [nfc2klipper](https://github.com/bofh69/nfc2klipper) — connects spool tags to Klipper and Spoolman.
- [metrodroid](https://github.com/metrodroid/metrodroid) — reads public transit cards and decodes the trip history on them.
- [TagTuner](https://github.com/luka6000/TagTuner) — tap a tag to play an album. The physical-media-for-streaming idea, done properly.
- [WiFiKeyShare](https://github.com/bparmentier/WiFiKeyShare) — share WiFi credentials by tag or QR. *Archived*, but the reference implementation for WiFi record encoding.

## Security research

Included because understanding the attacks is how you choose the right chip. Use on hardware you own or are authorised to test.

- [mfoc](https://github.com/nfc-tools/mfoc) — MIFARE Classic offline cracker, exploits the nested authentication weakness.
- [mfcuk](https://github.com/nfc-tools/mfcuk) — the darkside attack, recovers a key with no known key.
- [crypto1_bs](https://github.com/aczid/crypto1_bs) — bitsliced Crypto-1 brute forcer.
- [miLazyCracker](https://github.com/nfc-tools/miLazyCracker) — wraps the hardnested attack into one command.
- [magspoof](https://github.com/samyk/magspoof) — Samy Kamkar on magnetic stripe and contactless emulation. Adjacent to NFC, and the research is worth reading.

The practical takeaway: MIFARE Classic's Crypto-1 cipher was broken in 2008 and keys can be recovered in seconds. Do not use it for anything that matters. Use DESFire EV2/EV3 if you need real security, or accept that NTAG chips are open by design and put nothing secret on them.

## Specifications

- [NFC Forum](https://nfc-forum.org/) — the body that publishes the tag type and NDEF specifications.
- [Web NFC draft](https://w3c.github.io/web-nfc/) — the W3C specification behind the browser API.
- [Web NFC on Chrome](https://developer.chrome.com/docs/capabilities/nfc) — implementation notes and current browser support.
- ISO/IEC 14443 — proximity cards, the standard behind Type A and Type B tags.
- ISO/IEC 18092 — NFCIP-1, covering peer-to-peer mode.

Tag types 1 through 5 are NFC Forum categories, not chip names. NTAG213/215/216 are all Type 2. DESFire is Type 4. Sony FeliCa is Type 3 and mostly appears in Japan.

## Learning

- [Getting started](docs/GETTING_STARTED.md), [Writing to NFC tags](docs/WRITING_TO_NFC.md), and [NFC formats explained](docs/NFC_FORMATS.md) in this repo.
- [Adafruit's PN532 tutorial](https://learn.adafruit.com/adafruit-pn532-rfid-nfc) — the standard introduction for hardware projects.
- [nfcpy documentation](https://nfcpy.readthedocs.io/) — readable explanations of the protocol layers, useful even if you never write Python.

## Community

- [r/RFID](https://www.reddit.com/r/RFID/) and [r/flipperzero](https://www.reddit.com/r/flipperzero/)
- [Proxmark forum](http://www.proxmark.org/forum/) — where most of the deep protocol discussion happens.
- [Dangerous Things forum](https://forum.dangerousthings.com/) — implants, but a lot of general tag knowledge too.
- [NFC questions on Stack Overflow](https://stackoverflow.com/questions/tagged/nfc)

## Contributing

Suggestions are welcome — see [CONTRIBUTING.md](CONTRIBUTING.md). The main rule is that links must be live and projects must be either maintained or explicitly labelled as not.

## License

[MIT](LICENSE).
