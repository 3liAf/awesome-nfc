# Simple URL Tag Example

The most basic NFC use case: write a URL to a tag, scan it, open in browser.

## What It Does

1. Write a URL to an NTAG 215 sticker
2. Person scans tag with their phone
3. Browser automatically opens the URL

## Use Cases

- QR code replacement (but simpler to write)
- Event information distribution
- Product documentation links
- Portfolio/resume sharing
- Door signage

## Requirements

- Android phone with NFC (or ACR122U reader)
- NTAG 215 sticker (~$0.30)
- NFC Tools app or Web NFC support

## How to Use

### Using Web NFC

```javascript
async function writePortfolioLink() {
  const ndef = new NDEFReader();
  await ndef.write({
    records: [{
      recordType: "url",
      data: "https://yourportfolio.com"
    }]
  });
  console.log("Written!");
}
```

### Using NFC Tools App

1. Install NFC Tools from Play Store
2. Go to "Write" tab
3. Add record → URL
4. Enter your link
5. Hold tag to phone back
6. Confirm

## Example URLs

**Portfolio/Resume**
```
https://yourname.dev
https://github.com/yourname
https://linkedin.com/in/yourname
```

**Business Card**
```
https://short.url/yourcard
```

**Event Information**
```
https://event.example.com/attendee?id=abc123
```

**Product Documentation**
```
https://docs.example.com/product-123
```

## Testing

1. Write the tag with NFC Tools
2. Tap it with a normal Android/iPhone
3. Browser should open immediately
4. Verify the URL is correct

## Tips

- Use short URLs (bit.ly, tinyurl) for readability
- Include tracking parameters if you want analytics
- Test on multiple phones before deploying
- Make sure the link actually works before writing

## What's Stored on Tag

```
NDEF Message:
  Record Type: URL
  Record Data: https://yourlink.com
  Total Size: ~30 bytes (of 180 available)
```

## Variations

### With Short Domain

```javascript
// Shorter is better for NFC memory
records: [{
  recordType: "url",
  data: "https://short.co/abc"
}]
```

### With Query Parameters

```javascript
records: [{
  recordType: "url",
  data: "https://example.com?source=nfc&id=tag-123"
}]
```

### With Multiple Records

```javascript
records: [
  { recordType: "text", data: "Tap to visit our site" },
  { recordType: "url", data: "https://example.com" }
]
```

## Troubleshooting

**Browser doesn't open**
- Make sure the URL starts with https:// or http://
- Check the URL actually works (test in your browser)
- Try a different URL to see if it's tag-specific

**Tag won't write**
- Keep phone still for 3 seconds
- Try a different area of the back of your phone
- Make sure NFC is enabled

**Wrong browser opens**
- That's user's default browser. You can't control it.
- If it matters, use an app to handle the tap instead

## Files in This Example

```
simple-url-tag/
├── README.md          (this file)
├── write-tag.js       (JavaScript example)
├── write-tag.py       (Python example)
└── payload.txt        (what gets written)
```

See the other files for code examples in different languages.
