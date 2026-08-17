# Writing to NFC Tags - Complete Guide

This is the real stuff. Everything you need to actually write data to an NFC sticker and have it work.

## The Short Version

1. Get a tag (NTAG 215, most common)
2. Get a reader (your Android phone or ACR122U reader)
3. Write your data (using Web NFC, a mobile app, or a desktop tool)
4. Tap the tag to the reader
5. Done

If that's not enough detail, keep reading.

## Prerequisites

### Hardware

You need **either** of these:

- **Android Phone** (most 2015+ phones have NFC)
  - Check: Settings → About phone → NFC support
  - Some brands disable it (looking at you, Samsung A series)
  
- **ACR122U NFC Reader** (~$30 on Amazon)
  - USB, works on Windows/Mac/Linux
  - More reliable than phone NFC for development
  - Plug and play with most tools

### Tags

NTAG 215 stickers, 10-pack for $5-8 online.

**Why NTAG 215?**
- 180 bytes of usable memory
- ~$0.30 each in bulk
- Write protection available
- Works with everything
- Stickers are convenient

Other options:
- **NTAG 216**: 888 bytes, if you need more space
- **Mifare Classic**: Older, smaller, cheaper but deprecated
- **NTAG I²C Plus**: Has I²C for sensors, overkill unless you need it

Don't buy counterfeit chips. Get from reputable sellers (NXP official distributors or Amazon with good reviews).

## Writing Methods

### Method 1: Web App (Easiest)

If you're on Android with Chrome/Edge:

1. Go to [/web](../web/) folder in this repo or visit the hosted version
2. Choose what to write (URL, text, custom data)
3. Click "Write to Tag"
4. Tap your tag to the back of your phone
5. Wait for confirmation

**Limitations:**
- Android only
- Chrome/Edge only (Safari/Firefox don't support Web NFC yet)
- Your phone needs NFC enabled

**Advantages:**
- No app installation
- No technical knowledge needed
- Works offline

### Method 2: NFC Tools Mobile App (Most Reliable)

Available on [Android](https://play.google.com/store/apps/details?id=com.wakdev.nfctools) and [iOS](https://apps.apple.com/us/app/nfc-tools/id1252070271).

**Android:**
1. Install NFC Tools
2. Open → "Write" tab
3. Add record (Text, URL, Contact, etc.)
4. Tap "Write"
5. Hold tag to back of phone
6. Done

**iOS:**
1. Same process
2. Works with iPhone XS and newer
3. More limited than Android (Apple restrictions)

This method is bulletproof. Use this if Web NFC doesn't work.

### Method 3: Desktop with Reader

Using ACR122U or similar reader:

**Windows:**
1. Plug in ACR122U
2. Download [NFC TagWriter](https://www.nxp.com/products/rfid-nfc/nfc-tools/nfc-tagwriter-by-nxp/)
3. Create your record
4. Place tag on reader
5. Click write

**Mac/Linux:**
```bash
# Install nfcpy
pip install nfcpy

# Write a simple URL
python -m nfc write -u "https://example.com"

# Follow prompts, place tag on reader
```

**With Python (most control):**

```python
import nfc
import ndef

def write_to_tag(clf, tag_data):
    def on_connect(tag):
        print("Tag detected!")
        
        # Create NDEF message
        if tag_data['type'] == 'url':
            record = ndef.UriRecord(tag_data['value'])
        elif tag_data['type'] == 'text':
            record = ndef.TextRecord(tag_data['value'], language='en')
        
        records = [record]
        
        # Write to tag
        tag.ndef.records = records
        print("Written successfully")
        return True
    
    clf.connect(rdwr={'on-connect': on_connect})

# Usage
with nfc.ContactlessFrontend('usb') as clf:
    write_to_tag(clf, {'type': 'url', 'value': 'https://example.com'})
```

### Method 4: Android Dev Kit

If you're building an Android app:

```kotlin
// In your MainActivity
val nfcAdapter = NfcAdapter.getDefaultAdapter(this)

fun writeToTag(tag: Tag, message: NdefMessage) {
    val ndef = Ndef.get(tag)
    ndef?.apply {
        makeReadOnly()
        writeNdefMessage(message)
    }
}

// Create message
fun createUriMessage(uri: String): NdefMessage {
    val record = NdefRecord.createUri(uri)
    return NdefMessage(arrayOf(record))
}
```

## What Can You Write?

### Simple Types (Easiest)

**URL**
```
https://example.com
```
When someone scans: opens in browser immediately.

**Text**
```
Hello World
```
Plain text, displayed as-is.

**Phone Number**
```
tel:+1234567890
```
Tapping prompts to call.

**Email**
```
mailto:person@example.com
```
Opens compose window.

**WiFi** (Android only, requires special handling)
```
WIFI:T:WPA;S:NetworkName;P:Password;;
```

### Structured Data (Slightly Harder)

**vCard (Contact)**
```
BEGIN:VCARD
VERSION:3.0
FN:John Doe
TEL:+1234567890
EMAIL:john@example.com
END:VCARD
```

**iCal (Event)**
```
BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
DTSTART:20240115T100000Z
DTEND:20240115T110000Z
SUMMARY:Meeting
END:VEVENT
END:VCALENDAR
```

### Custom Data

If you want to store your own format:

```python
import ndef

# Create custom record
record = ndef.Record()
record.type = b'application/x-custom'
record.data = b'your_data_here'

records = [record]
```

**Use case examples:**
- Game state data
- Product serial numbers
- Custom app parameters
- Encrypted credentials (more secure than it sounds)

## Actually Writing Step-by-Step

### Scenario: Write a URL to a NTAG 215

**What you'll need:**
- Tag (NTAG 215 sticker)
- Reader (phone or ACR122U)
- URL you want to store

**Android Phone:**

1. Open NFC Tools app → Write
2. Tap "Add a record"
3. Select "URL"
4. Enter: `https://your-link.com`
5. Tap "Write"
6. Hold tag to back of phone (upper part, centered)
7. Keep still for 2-3 seconds
8. Green confirmation = success
9. Red = try again, tag might be too far or moving

**Desktop (Python):**

```bash
pip install nfcpy
python3 << 'EOF'
import nfc
import ndef

clf = nfc.ContactlessFrontend('usb')
print("Place tag on reader...")

def on_connect(tag):
    record = ndef.UriRecord("https://your-link.com")
    tag.ndef.records = [record]
    print("✓ Written!")
    return True

clf.connect(rdwr={'on-connect': on_connect})
EOF
```

**Via Web NFC:**

```javascript
const writeToTag = async (url) => {
  try {
    const ndef = new NDEFReader();
    await ndef.write({
      records: [{ recordType: "url", data: url }]
    });
    console.log("✓ Wrote to tag");
  } catch (error) {
    console.error("Failed:", error);
  }
};

// Use it
await writeToTag("https://your-link.com");
```

## Common Problems & Fixes

### "Tag is empty / can't write"

Usually means:
- Tag memory is full
- Tag is read-only
- You have a cheap counterfeit tag

**Fix:**
- Use a fresh tag from a reputable seller
- Check if tag has lock bits enabled
- Try formatting first: `nfc format`

### "Write failed silently"

- Tag moved during write
- Too far from reader
- Phone NFC is in read-only mode

**Fix:**
- Keep tag completely still
- Center tag on reader (for ACR122U)
- Close other NFC apps
- Restart NFC: Settings → NFC → toggle off/on

### "Android shows 'Tag is locked'"

The tag's memory is protected. Either:
- Previous owner locked it (data loss unless they wrote it)
- Tag is defective

**Fix:**
- Get a new tag
- Use nfcpy to force-format (if you have ACR122U)

### "iPhone can't write"

iOS limitation. Apple only allows reading with CoreNFC until iOS 16, and writing requires special app configuration.

**Workaround:**
- Use Android if possible
- Use web NFC on another Android device, then iPhone reads it
- Get an app from App Store that supports writing

### "Data doesn't appear when someone scans"

Common causes:
- Wrong NDEF format
- Too much data (over 180 bytes for NTAG 215)
- Encoding issue (special characters)

**Fix:**
- Test with NFC Tools to see what's actually on the tag
- Keep it simple: just a URL or text
- Check character encoding (UTF-8 is standard)

## Memory & Sizing

### NTAG 215 Layout

```
Block 0-1:   Serial + UID (7 bytes)
Block 2:     OTP (locked)
Block 3-4:   CC (Capability Container)
Block 5-45:  NDEF Data (180 bytes usable)
Block 46-48: Lock bits
Block 49-63: Config & factory data
```

**Usable space: 180 bytes**

Examples of how much that is:
- URL "https://example.com/path?param=value": ~45 bytes ✓ fits easily
- Full vCard with photo URL: ~150 bytes ✓ still room
- 500-character plain text: way over, needs NTAG 216 or compression

**NTAG 216**: 888 bytes usable
- Only use if you genuinely need it
- Same size physically, not much different cost
- Overkill for most use cases

## Advanced: Write Protection

Once data is on a tag, you can lock it so it can't be changed.

**Android NFC Tools:**
1. Write your data
2. Tap "Other actions" → "Format tag"
3. Restart the write process
4. After writing, tap "Lock tag"

**Python:**

```python
def write_and_lock(clf, data):
    def on_connect(tag):
        # Write data
        record = ndef.UriRecord(data['url'])
        tag.ndef.records = [record]
        
        # Lock it
        tag.ndef.records[0].flags = 0xF0
        
        print("✓ Written and locked")
        return True
    
    clf.connect(rdwr={'on-connect': on_connect})
```

**Important:** Once locked, you cannot change the data on that tag. Make sure it's correct first.

## Testing Your Tags

Before deploying to users:

1. **Read-test on multiple devices:**
   - iPhone/Android phone
   - NFC reader if you have one
   - Different apps (NFC Tools, Google Chrome, your custom app)

2. **Tap-test from different angles:**
   - Dead center
   - Off to the side
   - Back of case vs bare phone
   - While moving slightly

3. **Verify the data:**
   - Use NFC Spy app to see exactly what's stored
   - Check that URLs actually open
   - Confirm character encoding is correct

4. **Test in your app:**
   - Does your app properly handle the NDEF record?
   - Do edge cases work (empty data, unusual characters)?
   - What happens if someone scans it with another app?

## Real Examples

### Example 1: Smart Home Entry Point

Write to tag and place by front door:

```
URL: https://home.local/unlock?token=abc123
```

Phone scans tag → browser opens → home automation page loads
Can trigger actions without app installation.

### Example 2: Game Mechanic

Custom data:

```json
{
  "type": "achievement",
  "id": "level-5-complete",
  "player": "optional-id"
}
```

Game app reads tag → unlocks achievement → scores calculated.

### Example 3: Conference Badge

vCard:
```
BEGIN:VCARD
VERSION:3.0
FN:Jane Smith
TITLE:Software Engineer
ORG:Tech Corp
EMAIL:jane@techcorp.com
URL:https://jane.dev
TEL:+1234567890
END:VCARD
```

Attendee scans badge → contact saved automatically.

### Example 4: Playlist Trigger

Custom data for Spotify:
```
{"action": "play_playlist", "id": "37i9dQZF1DZ52sDvG2PcWm"}
```

App scans tag → loads playlist → starts playing.

## Next Steps

1. **Get a tag and reader** if you haven't
2. **Try Method 1** (Web app) - takes 5 minutes
3. **Write a simple URL** first - test the flow
4. **Expand** to your use case

Check out the [/web](../web/) folder for the interactive tag creator, or look at [examples/](../examples/) for real projects.
