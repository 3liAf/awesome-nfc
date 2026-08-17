#!/usr/bin/env python3
"""
Simple NFC URL Tag Writer
Write a URL to an NFC tag using nfcpy library

Requirements:
    pip install nfcpy

Usage:
    python write-tag.py "https://example.com"

Works with:
    - ACR122U USB NFC reader (~$30)
    - Android phone via ADB/NDK
"""

import sys
import nfc
from nfc.ndef import UriRecord, Message


def write_url_to_tag(clf, url):
    """
    Write a URL to an NFC tag

    Args:
        clf: NFC ContactlessFrontend object
        url: URL string to write (e.g., "https://example.com")
    """

    # Ensure URL has protocol
    if not url.startswith(("http://", "https://")):
        url = "https://" + url

    print(f"Writing: {url}")
    print("Place tag on reader...")

    def on_connect(tag):
        """Callback when tag is detected"""
        print(f"✓ Tag detected: {tag.type}")

        try:
            # Create URI record
            record = UriRecord(url)

            # Create NDEF message
            message = Message(record)

            # Write to tag
            tag.ndef.message = message

            print(f"✓ Successfully written!")
            print(f"  Tag type: {tag.type}")
            print(f"  Data size: {len(message.to_bytes())} bytes")

            return True  # Exit scan loop

        except Exception as e:
            print(f"✗ Write failed: {e}")
            return True  # Exit scan loop

    try:
        # Connect to tag and write
        clf.connect(rdwr={"on-connect": on_connect})

    except nfc.clf.TargetLost:
        print("✗ Tag lost contact. Try again.")
    except nfc.clf.BrokenLink:
        print("✗ Connection broken. Try again.")
    except Exception as e:
        print(f"✗ Error: {e}")


def main():
    """Main entry point"""
    if len(sys.argv) < 2:
        print("Usage: python write-tag.py <URL>")
        print("Example: python write-tag.py 'https://example.com'")
        sys.exit(1)

    url = sys.argv[1]

    # Find NFC reader
    clf = nfc.ContactlessFrontend()

    if clf is None:
        print("✗ No NFC reader found")
        print("  Install nfcpy: pip install nfcpy")
        print("  Get ACR122U: ~$30 on Amazon")
        sys.exit(1)

    try:
        write_url_to_tag(clf, url)
    finally:
        clf.close()


if __name__ == "__main__":
    main()
