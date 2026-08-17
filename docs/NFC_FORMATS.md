# NFC Formats Explained

When you write to an NFC tag, your data gets packaged into a specific format. Understanding these formats helps you build reliable NFC applications.

## NDEF: The Standard Format

**NDEF** = **NFC Data Exchange Format**

It's the standard way NFC tags store information. Think of it like a container that wraps your data so different devices can read it consistently.

### NDEF Structure

```
[Type Length] [Payload Length] [Record Type] [Payload]
```

A tag contains one or more **NDEF records**, each with:
- **Type**: What kind of data (e.g., "U" for URL, "T" for text)
- **Payload**: Your actual data
- **Flags**: How to handle the record (first, last, etc.)

### Record Types (Most Common)

#### URL Record (Type: "U")

Stores a web address.

```
Type: U (0x55)
Payload: https://example.com
```

When someone scans: Opens in browser immediately.

**Byte format:**
```
0xD1 0x01 <length> 0x55 
<data>
```

Example (https://example.com):
```
D1 01 13 55 02 65 78 61 6D 70 6C 65 2E 63 6F 6D
```

#### Text Record (Type: "T")

Plain text with language tag.

```
Type: T (0x54)
Language: "en"
Payload: Hello World
```

When someone scans: Shows as text notification.

**Byte format:**
```
0xD1 0x01 <length> 0x54 
<language> <data>
```

#### Absolute URI Record (Type: "U")

Any URI (mailto, tel, ftp, custom schemes).

```
Type: U (0x55)
Payload: tel:+1234567890
```

When someone scans: Calls the number (tel), sends email (mailto), etc.

#### MIME Record

Custom binary data with media type.

```
Type: application/json
Payload: {"game": "level5"}
```

When someone scans: Your app handles it (or browser downloads it).

#### External Type Record

Custom application-specific data.

```
Type: application/x-myapp
Payload: [your binary data]
```

Most flexible for app-specific use cases.

### Record Composition

A single NDEF message can contain multiple records:

```
[URL Record: https://example.com]
[Text Record: "Learn more here"]
[Absolute URI: tel:+1234567890]
```

Devices read and handle them based on the type.

## Common Data Types

### Simple Types (Easy to Write)

**URL**
```
https://example.com
https://github.com/user/repo
https://en.wikipedia.org/wiki/NFC
```

**Email**
```
mailto:person@example.com
mailto:person@example.com?subject=Hi
```

**Phone**
```
tel:+1-555-0100
```

**SMS**
```
smsto:+1-555-0100
```

**Geographic**
```
geo:37.7749,-122.4194
```

### Structured Types (More Complex)

#### vCard (Contact)

Standardized contact format, works everywhere.

```
BEGIN:VCARD
VERSION:3.0
FN:John Doe
N:Doe;John;;;
TEL:+1234567890
EMAIL:john@example.com
URL:https://johndoe.com
ORG:Acme Corp
TITLE:Engineer
END:VCARD
```

**Size:** ~200-300 bytes with full info.

**Mime type:** `text/vcard` or `text/x-vcard`

#### iCalendar (Event)

Calendar event format.

```
BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Example//NFC//EN
BEGIN:VEVENT
UID:nfc-event-123
DTSTAMP:20240115T100000Z
DTSTART:20240120T143000Z
DTEND:20240120T153000Z
SUMMARY:Team Meeting
LOCATION:Room 202
DESCRIPTION:Weekly sync
END:VEVENT
END:VCALENDAR
```

**Size:** ~300-500 bytes depending on detail.

**Mime type:** `text/calendar` or `application/ics`

#### WiFi Configuration

NFC-specific WiFi format.

```
WIFI:T:WPA;S:NetworkName;P:Password;;
```

**Parts:**
- `T`: Security type (WPA, WEP, nopass)
- `S`: SSID (network name)
- `P`: Password

**Example:**
```
WIFI:T:WPA;S:MyNetwork;P:SecurePassword123;;
```

**Size:** ~50-100 bytes

**Note:** Android only, doesn't work on iOS (shows error instead).

#### JSON (Custom)

Store JSON as custom record type.

```json
{
  "gameId": "level-5",
  "playerId": "user-123",
  "timestamp": 1705334400,
  "action": "unlockAchievement"
}
```

**Size:** Depends on your data

**Mime type:** `application/json`

**Advantages:**
- Human-readable
- Easy to parse
- Works with any app

## Memory & Sizing

### NTAG 215 Memory Layout

```
0-2:    UID (7 bytes)                  [Read-only, burned in]
3-4:    OTP area                       [One-time programmable]
5-6:    Capability Container (CC)      [Defines NFC structure]
7-63:   User data area (180 bytes)     [Your NDEF data here]
64-65:  Dynamic lock bytes
66-67:  Config
```

**Usable space for NDEF: 180 bytes**

### Practical Examples

**URL "https://example.com"**
- Raw: 19 bytes
- With NDEF overhead: ~25 bytes
- % of NTAG 215: 14%
- ✓ Plenty of room

**Full vCard**
```
BEGIN:VCARD
VERSION:3.0
FN:John Smith
TEL:+1-555-123-4567
EMAIL:john@example.com
URL:https://johnsmith.dev
ORG:Tech Company
TITLE:Senior Engineer
END:VCARD
```
- Raw: ~180 bytes
- With NDEF overhead: ~200 bytes
- % of NTAG 215: 111%
- ✗ Doesn't fit!

**Compact vCard (fits!)**
```
BEGIN:VCARD
VERSION:3.0
FN:John Smith
TEL:+1-555-1234
EMAIL:john@co.com
END:VCARD
```
- Raw: ~90 bytes
- With NDEF overhead: ~100 bytes
- % of NTAG 215: 56%
- ✓ Fits comfortably

**Pro tip:** Store URLs instead of full data. Use short URLs (bit.ly, tinyurl) or your domain shortener.

### NTAG 216 (If You Need More)

```
0-63:   Same as NTAG 215
64-955: Extra user data (888 total usable bytes)
```

**Usable space: 888 bytes**

Only use if:
- You genuinely need more than 180 bytes
- You can afford the slightly higher cost (~$0.40 vs $0.30)
- Your reader supports it (most do)

## Encoding & Character Sets

### UTF-8 (Standard)

Most data is encoded as UTF-8. Works with:
- English and European characters
- Chinese, Arabic, Emoji (4 bytes each)
- Special characters

**Size impact:**
- "Hello" = 5 bytes
- "你好" (Chinese) = 6 bytes (2 chars × 3 bytes)
- "👋" (Emoji) = 4 bytes

### ASCII (Legacy)

Simple 7-bit encoding, rarely used now.

- "Hello" = 5 bytes
- Can't represent non-ASCII

### Language Tags

Text records can specify language:

```
Language: "en" (English)
Language: "es" (Spanish)
Language: "zh" (Chinese)
```

Helpful for multilingual tags.

## Creating NDEF Records Manually

### JavaScript

```javascript
// Simple URL
const record = {
  recordType: "url",
  data: "https://example.com"
};

// Text with language
const textRecord = {
  recordType: "text",
  language: "en",
  data: "Hello World"
};

// MIME type (custom)
const customRecord = {
  recordType: "application/json",
  data: JSON.stringify({
    key: "value",
    number: 42
  })
};

// Multiple records in one tag
const message = {
  records: [
    { recordType: "text", data: "Scan this QR code" },
    { recordType: "url", data: "https://example.com" }
  ]
};

// Write to tag
const writer = new NDEFReader();
await writer.write(message);
```

### Python

```python
import ndef

# URL record
url_record = ndef.UriRecord("https://example.com")

# Text record
text_record = ndef.TextRecord("Hello World", language="en")

# Create message
records = [url_record, text_record]

# Write via nfc library
import nfc
clf = nfc.ContactlessFrontend('usb')   # 'usb' scans the USB bus for a reader
clf.connect(rdwr={'on-connect': lambda tag: setattr(tag.ndef, 'records', records)})
```

### Raw Hex

If you really need to understand the bytes:

**URL "https://example.com"**

```
D1              # Record header (first, short, type length 1)
01              # Record type length: 1 byte
13              # Payload length: 19 bytes
55              # Record type: 'U' (0x55)
02              # URI prefix: "https://"
65786164706C65  # "example"
2E636F6D        # ".com"
```

Complete hex (with NDEF message wrapper):

```
00              # NDEF message header
D1 01 13 55 02 65 78 61 6D 70 6C 65 2E 63 6F 6D
```

## Advanced: Custom Record Types

For your own application:

```javascript
// Define custom type
const customRecord = {
  recordType: "application/x-myapp",
  data: JSON.stringify({
    action: "unlock",
    level: 5,
    token: "abc123xyz"
  })
};

// Write it
const writer = new NDEFReader();
await writer.write({ records: [customRecord] });

// Your app reads it back
const reader = new NDEFReader();
reader.scan().then(event => {
  event.message.records.forEach(record => {
    if (record.recordType === "application/x-myapp") {
      const data = JSON.parse(record.data);
      console.log("Unlock level", data.level);
    }
  });
});
```

## Best Practices

1. **Keep it simple** - Use standard types when possible
2. **Compress data** - Use short URLs instead of full text
3. **Test on multiple devices** - Not all readers handle edge cases the same
4. **Leave room** - Don't fill 100% of tag memory (some readers fail at capacity)
5. **Document your format** - If using custom types, write it down
6. **Use UTF-8** - It's the standard, works everywhere
7. **Plan for change** - Store URLs that can redirect, not hard-coded data

---

For more details, see the official [NDEF Specification](https://nfcpy.readthedocs.io/en/latest/ndef.html) (technical but thorough).
