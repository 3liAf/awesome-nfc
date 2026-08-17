/**
 * Write a URL to an NFC tag from the browser, using the Web NFC API.
 *
 * Requirements:
 *   - Android, Chrome or Edge. Web NFC is not available on iOS, desktop, or
 *     Firefox, and there is no polyfill because it needs platform NFC access.
 *   - A secure context: https:// or localhost. It will not run over plain http.
 *   - The call must happen inside a user gesture (a click), otherwise the
 *     permission prompt is suppressed.
 *
 * A note on the API name: early drafts had a separate NDEFWriter class. It was
 * removed before Web NFC shipped. Reading and writing both go through
 * NDEFReader now. Older tutorials still show `new NDEFWriter()`, which throws
 * a ReferenceError in current Chrome.
 */

function isWebNfcAvailable() {
  return typeof window !== "undefined" && "NDEFReader" in window;
}

async function writeUrlToTag(url) {
  if (!isWebNfcAvailable()) {
    return { ok: false, message: "Web NFC is unavailable. Use Chrome or Edge on Android." };
  }

  if (!/^https?:\/\//i.test(url)) {
    url = "https://" + url;
  }

  try {
    const ndef = new NDEFReader();
    await ndef.write({ records: [{ recordType: "url", data: url }] });
    return { ok: true, message: `Wrote ${url}` };
  } catch (error) {
    return { ok: false, message: describeError(error) };
  }
}

function describeError(error) {
  switch (error.name) {
    case "NotAllowedError":
      // Also fires when the user dismisses the permission sheet.
      return "Permission denied, or NFC is switched off in system settings.";
    case "NotSupportedError":
      return "No NFC hardware available on this device.";
    case "NotReadableError":
      return "NFC is enabled but the tag could not be accessed. Try again.";
    case "NetworkError":
      // This is what Chrome throws for a tag that is full, locked, or pulled
      // away mid-write, which makes it the one you will actually hit.
      return "Transfer failed. The tag may be locked, too small, or moved too soon.";
    case "AbortError":
      return "Cancelled.";
    default:
      return error.message || String(error);
  }
}

/**
 * Wire the function to a form. Note the click handler: the write has to be
 * triggered by a real user gesture.
 */
function setupForm() {
  const input = document.getElementById("url-input");
  const button = document.getElementById("write-btn");
  const status = document.getElementById("status");

  if (!isWebNfcAvailable()) {
    button.disabled = true;
    status.textContent = "Web NFC is unavailable in this browser.";
    return;
  }

  button.addEventListener("click", async () => {
    const url = input.value.trim();
    if (!url) {
      status.textContent = "Enter a URL first.";
      return;
    }

    button.disabled = true;
    status.textContent = "Hold a tag against the back of the phone...";

    const result = await writeUrlToTag(url);

    button.disabled = false;
    status.textContent = result.message;
    if (result.ok) input.value = "";
  });
}

if (typeof module !== "undefined") {
  module.exports = { writeUrlToTag, isWebNfcAvailable };
}
