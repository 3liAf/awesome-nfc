/**
 * Simple NFC URL Tag Writer
 * Write a URL to an NFC tag using Web NFC API
 *
 * Requirements:
 * - Android phone with Chrome/Edge
 * - NTAG 215 sticker or similar
 * - NFC enabled
 */

async function writeURLToTag(url) {
  try {
    // Validate URL
    if (!url.match(/^https?:\/\//)) {
      url = "https://" + url;
    }

    console.log("Writing:", url);

    // Create NFC writer and write the URL
    const ndef = new NDEFWriter();
    await ndef.write({
      records: [{
        recordType: "url",
        data: url
      }]
    });

    console.log("✓ Successfully written to tag!");
    return { success: true, message: "Tag written successfully" };

  } catch (error) {
    console.error("✗ Write failed:", error);

    // Provide helpful error messages
    let message = error.message;
    if (error.name === "NotSupportedError") {
      message = "NFC not supported. Please use Android with Chrome/Edge.";
    } else if (error.name === "NotAllowedError") {
      message = "NFC permission denied. Make sure NFC is enabled in settings.";
    } else if (error.name === "InvalidStateError") {
      message = "Tag write failed. Try again, keeping the tag close and still.";
    }

    return { success: false, message: message };
  }
}

// Example usage
async function main() {
  // Write your portfolio URL
  const result = await writeURLToTag("https://yoursite.com");

  if (result.success) {
    console.log(result.message);
  } else {
    console.error(result.message);
  }
}

// HTML form integration example
function setupForm() {
  const form = document.getElementById("nfc-form");
  const input = document.getElementById("url-input");
  const button = document.getElementById("write-btn");

  button.addEventListener("click", async () => {
    const url = input.value.trim();

    if (!url) {
      alert("Please enter a URL");
      return;
    }

    button.disabled = true;
    button.textContent = "Writing...";

    const result = await writeURLToTag(url);

    button.disabled = false;
    button.textContent = "Write to Tag";

    if (result.success) {
      alert(result.message);
      input.value = "";
    } else {
      alert("Error: " + result.message);
    }
  });
}

// Check if Web NFC is available
if ("NDEFReader" in window) {
  console.log("✓ Web NFC supported");
} else {
  console.warn("✗ Web NFC not supported. Use Android with Chrome/Edge.");
}
