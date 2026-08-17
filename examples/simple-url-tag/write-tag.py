#!/usr/bin/env python3
"""
Write a URL to an NFC tag using a USB reader.

Requirements:
    pip install nfcpy ndeflib

Usage:
    python write-tag.py https://example.com

Tested with an ACR122U. Any reader nfcpy supports should work.

Note on versions: nfcpy 0.x had its own `nfc.ndef` module. It was removed in
1.0 and record handling moved to the separate `ndeflib` package, which is what
this script uses. Examples you find elsewhere that do `from nfc.ndef import
UriRecord` are written against the old API and will fail on a current install.
"""

import sys

import nfc
import ndef


def make_on_connect(url):
    """Build the callback nfcpy invokes once a tag is in the field."""

    def on_connect(tag):
        print(f"Tag detected: {tag}")

        if not tag.ndef:
            print("  This tag is not NDEF formatted. Format it first, then retry.")
            return False

        if not tag.ndef.is_writeable:
            print("  This tag is locked and cannot be written.")
            return False

        record = ndef.UriRecord(url)

        # nfcpy encodes the message when the list is assigned, so a payload
        # that is too large raises here rather than half-writing the tag.
        try:
            tag.ndef.records = [record]
        except ValueError as exc:
            print(f"  Write rejected: {exc}")
            print(f"  Tag capacity is {tag.ndef.capacity} bytes.")
            return False

        print(f"  Written. Using {tag.ndef.length} of {tag.ndef.capacity} bytes.")

        # Returning False makes connect() return immediately. Return True
        # instead if you want it to block until the tag is pulled away.
        return False

    return on_connect


def main():
    if len(sys.argv) < 2:
        print("Usage: python write-tag.py <URL>")
        return 1

    url = sys.argv[1]
    if not url.startswith(("http://", "https://")):
        url = "https://" + url

    # 'usb' scans the USB bus. Pass something like 'tty:USB0:pn532' for a
    # serial reader. This raises IOError if no reader is present.
    try:
        clf = nfc.ContactlessFrontend("usb")
    except IOError:
        print("No NFC reader found.")
        print("Check the reader is plugged in and that you have permission to")
        print("access it (on Linux this usually means a udev rule or sudo).")
        return 1

    print(f"Writing: {url}")
    print("Place a tag on the reader...")

    try:
        clf.connect(rdwr={"on-connect": make_on_connect(url)})
    except KeyboardInterrupt:
        print("\nCancelled.")
    finally:
        clf.close()

    return 0


if __name__ == "__main__":
    sys.exit(main())
