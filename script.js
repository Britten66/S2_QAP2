// // Programming With JavaScript - QAP2

// //=====================================
// //========Christopher Britten SD 15=====
// //=====================================

// //=====================================================
// //======Date: 10/10/2025 -- Submission Date 18/10/2025====
// //======================================================

// //  * Problem 1: replace all internal whitespace in a string value with underscore
// //  * ('_'), and makes it lowercase.

// //   The snake() function should work like this:

// //  * snake('abc') --> returns 'abc'
// //  * snake(' ABC ') --> returns 'abc'
// //  * snake('ABC') --> returns 'abc'
// //  * snake('A BC') --> returns 'a_bc'
// //  * snake(' A bC  ') --> returns 'a_bc'
// //  * snake('A   BC') --> returns 'a_bc'
// //  * snake('A.BC') --> returns 'a_bc'
// //  * snake(' A..  B   C ') --> returns 'a_b_c'

function greetUser() {
  alert("Welcome To Chris's QAP2 for Semester 2");
}
// ==============================================================================================

//Snake switch function starts here
function snake(value) {
  let trimmed = value.trim();
  // /s/. replaces spaces tabs and dots to meet task 1 requirments
  let replaced = trimmed.replace(/[\s\.]+/g, "_");
  //[in array format]
  let lowering = replaced.toLowerCase();
  return lowering;
}

function convertSnake() {
  let text = document.querySelector("#userInput").value;
  let result = snake(text);
  document.querySelector("#output").textContent = "Snake Version: " + result;
}

// ==============================================================================================
// ================= Problem 2: create an HTML <video> element for the given url.================
//  *============================================================================================

function createVideo(src, width, controls) {
  //just cleaning the src so its consistent. using trim
  const cleanSrc = src.trim();
  const video = document.createElement("video");
  video.src = cleanSrc;
  //default width was required
  video.width = width || 480;

  video.controls = controls !== false;

  video.textContent = "not supported here";

  return video;
}
function generateVideo() {
  const url = document.querySelector("#VideoURL").value;
  const width = document.querySelector("#VideoWidth").value;
  const container = document.querySelector("#videoContainer");

  // controls here
  const controlBox = document.querySelector("#controlCheckbox");
  let controls = true;

  if (controlBox) {
    controls = controlBox.checked;
  }

  container.innerHTML = "";

  if (url.trim() === "" || width.trim() === "") {
    container.textContent = "Please enter both a URL and a width.";
    return;
  }

  const videoElement = createVideo(url, width, controls);
  container.appendChild(videoElement);
}

// ==============================================================================================
// ================ Problem 3: Write a function, parseDateString() that accepts a date string ===
//  *============================================================================================

//  *
//  * Write a function, parseDateString() that accepts a date string of the format
//  * specified above, and returns a JavaScript Date object, set to the correct day.
//  * In your solution, you are encouraged to use the following Date methods:
//  *
//  * - setFullYear()
//  * - setMonth()
//  * - setDate()

function parseDateString(value) {
  if (typeof value !== "string" || !value.trim()) {
    throw new Error(" Wrong Input CANNOT BE EMPTY ");
  }

  const match = value.trim().match(/^(\d{4})-(\d{2})-(\d{2})$/);

  if (!match) {
    throw new Error(" Format much Be YYYY-MM-DD ");
  }

  const year = parseInt(match[1], 10);
  const month = parseInt(match[2], 10);
  const day = parseInt(match[3], 10);

  if (month < 1 || month > 12) throw new Error(" Must Be 01-12");
  if (day < 1 || day > 31) throw new Error(" Must Be 01-31");

  const d = new Date();
  d.setFullYear(year);
  // as index will matter I will -1 so as not to be an indexing issue
  d.setMonth(month - 1);
  d.setDate(day);
  return d;
}

function parseDateClick() {
  const input = document.querySelector("#dateinput");
  const output = document.querySelector("#dateoutput");

  try {
    const dateObj = parseDateString(input.value);

    if (isNaN(dateObj.getTime())) {
      throw new Error(" Incorrect Date Format");
    }

    //formatting here
    const formatted = dateObj.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    output.textContent = `Here Is Your Date Parsed: ${formatted}`;
    output.style.color = "green";
  } catch (err) {
    output.textContent = `Err: ${err.message}`;
    output.style.color = "red";
  }
}

// ==============================================================================================
// ================ Problem 4: convert Date to date string with specified format ===
//  *============================================================================================

// /*******************************************************************************
//  * Write a function, toDateString() that accepts a Date object, and returns a
//  * date string formatted according to the specification above. Make sure your
//  * day and month values are padded with a leading '0' if necessary (e.g., 03 vs. 3).

function formatDateString(dateObj) {
  if (!(dateObj instanceof Date) || Number.isNaN(dateObj.getTime())) {
    throw new Error("Invalid Date Style");
  }

  //taking away year and month/day here
  const year = dateObj.getFullYear();

  const month = String(dateObj.getMonth() + 1).padStart(2, "0");
  const day = String(dateObj.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

// this is causing errors that was deemed to be scope issues
//try here

//here wo;; get tje selected date from data and will convert it using
// toDateString()
function convertSelection() {
  const picker = document.querySelector("#datePicker");
  const output = document.querySelector("#dateStringOutput");
  try {
    const selectedDate = new Date(picker.value);

    // The next line was done the sae as above .. causing an error
    const formatted = formatDateString(selectedDate);

    output.textContent = `Converted Date: ${formatted}`;
    output.style.color = "green";
    //catch here
  } catch (err) {
    output.textContent = `err: ${err.message}`;
    output.style.color = "red";
  }
}

// ==============================================================================================
// ================ Problem 5: convert coordinates to simplified format =========================
// ============================================================================================

//  * Coordinates are defined as numeric, decimal values of Longitude and Latitude.
//  * A example, let's suppose the Keyin College St.John's campus is located at:
//  *
//  * Longitude: -77.4369 (negative number means West)
//  * Latitude: 42.9755 (positive number means North)
//
//  * Valid Longitude values are decimal numbers between -180 and 180.
//  *
//  * Valid Latitude values are decimal numbers between -90 and 90.
//  *
//  * Parse the value and reformat it into the form: "(lat, lng)"

function normalizeCoord(value) {
  if (typeof value !== "string" || !value.trim()) {
    throw Error("CANNOT BE EMPTY");
  }

  const orig = value.trim();

  // will use regx to select what I need to target

  const nums = orig.match(/-?\d+(?:\.\d+)?/g);
  if (!nums || nums.length !== 2) {
    throw new Error(" TWO NUMBER VALUE REQUIRED ");
  }

  let a = parseFloat(nums[0]);
  let b = parseFloat(nums[1]);

  if (Number.isNaN(a) || Number.isNaN(b)) {
    throw new Error("Invalid number");
  }

  const startWithBracket = orig.startsWith("[");
  let lat, lng;

  if (startWithBracket) {
    lng = a;
    lat = b;
  } else {
    lat = a;
    lng = b;
  }

  //validation here
  if (lat < -90 || lat > 90) throw new Error("Lat must be -90 to 90");
  if (lng < -180 || lng > 180) throw new Error("Long must be -180 to 180");
  return `(${lat.toString()},${lng.toString()})`;
}

const sampleTest = {
  baseLat: 42.9755,
  baseLng: -77.436,
  i: 0,
  next() {
    const lat = this.baseLat + 0.01 * this.i;
    const lng = this.baseLng + 0.01 * this.i;

    this.i = (this.i + 1) % 50;

    if (this.i % 2 === 0) {
      return `${lat.toFixed(4)},${lng.toFixed(4)}`;
    } else {
      return `[${lng.toFixed(4)},${lat.toFixed(4)}]`;
    }
  },
};

// coord output casuing major errors. behind so found this on stack

function normalizeCoordClick() {
  const inputEl = document.querySelector("#coordinates");
  const outputEl = document.querySelector("#coorOutput");

  if (!inputEl || !outputEl) {
    console.error("No INPUT / OUTPUT in DOM");
    return;
  }

  // user leaving it empty this must fill sample incase clicked.
  //error casused if left blank

  if (!inputEl.value.trim()) {
    inputEl.value = sampleTest.next();
  }
  try {
    const standardized = normalizeCoord(inputEl.value);
    outputEl.textContent = `Standardized: ${standardized}`;
    outputEl.style.color = "green";
  } catch (err) {
    outputEl.textContent = `Err: ${err.message}`;
    outputEl.style.color = "red";
  }
}
// ==============================================================================================
// ================ Problem 6:  format any number of coordinates as a list in a string =========================
// ============================================================================================

//  * You are asked to format geographic lat, lng coordinates in a list using your
//  * normalizeCoord() function from problem 5.
//  *
//
//  * formatCoords("42.9755,-77.4369", "[-62.1234, 42.9755]", "300,-9000") should return
//  * "((42.9755, -77.4369), (42.9755, -62.1234))" and skip the invalid coordinate.
//  *

function formatCoords(...coordString) {
  const formattedList = [];

  for (const coord of coordString) {
    if (typeof coord !== "string") continue; // string only
    try {
      const normalized = normalizeCoord(coord);
      formattedList.push(normalized);
    } catch {
      continue;
    }
  }

  //extremely hard to wrap my head around this next part

  return formattedList.length > 0 ? `(${formattedList.join(", ")})` : "()";
}

function formatCoordsClick() {
  const area = document.getElementById("formatList");
  const out = document.getElementById("formatOutput");

  if (!area || !out) {
    console.error("Missing #formatList or #formatOutput");
    return;
  }

  const parts = (area.value || "")
    .split(/\r?\n|,(?=\s*[\[\(])/g)
    .map((s) => s.trim())
    .filter(Boolean);

  try {
    const formatted = formatCoords(...parts);
    out.textContent = `Formatted Coordinates: ${formatted}`;
    out.style.color = "inherit";
  } catch (err) {
    out.textContent = `Error: ${err.message}`;
    out.style.color = "red";
  }
}

// ==============================================================================================
// ================ Problem 7: determine MIME type from filename extension =========================
// ============================================================================================

//  * Web browsers and servers exchange streams of bytes, which must be interpreted
//  * by the receiver based on their type.  For example, an HTML web page is
//  * plain text, while a JPG image is a binary sequence.
//  *
//  * The Content-Type header contains information about a resource's MIME type, see:
//  * https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Type
//  *
//  * The MIME type is made-up of a `type` and a `subtype` separated by a `/` character.
//  * The type is general, for example, 'text' or 'video'.  The subtype is more
//  * specific, indicating the specific type of text, image, video, etc.  See:
//  * https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types
//  *
//  * A number of common types are used in web development:
//  *
//  * mimeFromFilename('/User/Documents/readme.txt') --> returns 'text/plain'
//  *
//  * Your mimeFromFilename() function should support all of the following extensions
//  * with and without the leading '.':
//  *
//  * - .html, .htm --> text/html
//  * - .css --> text/css
//  * - .js --> text/javascript
//  * - .jpg, .jpeg --> image/jpeg
//  * - .gif --> image/gif
//  * - .bmp --> image/bmp
//  * - .ico, .cur --> image/x-icon
//  * - .png --> image/png
//  * - .svg --> image/svg+xml
//  * - .webp --> image/webp
//  * - .mp3 --> audio/mp3
//  * - .wav --> audio/wav
//  * - .mp4 --> video/mp4
//  * - .webm --> video/webm
//  * - .json --> application/json
//  * - .mpeg --> video/mpeg
//  * - .csv --> text/csv
//  * - .ttf --> font/ttf
//  * - .woff --> font/woff
//  * - .zip --> application/zip
//  * - .avi --> video/x-msvideo
//  *
//  *
//  * NOTE: any other extension should use the `application/octet-stream` MIME type,
//  * to indicate that it is an unknown stream of bytes (e.g., binary file). You should
//  * also use `application/octet-stream` if the file has no extension.
//  *//   // NOTE: Use a switch statement in your solution.

//  ******************************************************************************/
function mimeFromFilename(filename) {
  //more validation
  if (typeof filename !== "string" || !filename.trim()) {
    throw new Error("Cannot Be Empty !! ");
  }

  //extracting here

  const match = filename.trim().match(/\.([^>]+)$/);
  if (!match) return "application/octet-stream";
  const ext = match[1].toLowerCase();

  // this was intense and had to take it from the web. what was given was not usable
  switch (ext) {
    case "html":
    case "htm":
      return "text/html";
    case "css":
      return "text/css";
    case "js":
      return "text/javascript";
    case "jpg":
    case "jpeg":
      return "image/jpeg";
    case "gif":
      return "image/gif";
    case "bmp":
      return "image/bmp";
    case "ico":
    case "cur":
      return "image/x-icon";
    case "png":
      return "image/png";
    case "svg":
      return "image/svg+xml";
    case "webp":
      return "image/webp";
    case "mp3":
      return "audio/mp3";
    case "wav":
      return "audio/wav";
    case "mp4":
      return "video/mp4";
    case "webm":
      return "video/webm";
    case "json":
      return "application/json";
    case "mpeg":
      return "video/mpeg";
    case "csv":
      return "text/csv";
    case "ttf":
      return "font/ttf";
    case "woff":
      return "font/woff";
    case "zip":
      return "application/zip";
    case "avi":
      return "video/x-msvideo";
    default:
      return "application/octet-stream";
  }
}
function mimeFromFileClick() {
  const input = document.querySelector("#mimeInput");
  const output = document.querySelector("#mimeOutput");
  // validation here
  if (!input || !output) {
    console.error("Missing Input");
    return;
  }

  //taking input
  const filename = input.value.trim();

  // input validation handle empty
  if (!filename) {
    output.textContent = "Enter Valid File Name";
    output.style.color = "red";
    return;
  }

  try {
    const mime = mimeFromFilename(filename);
    output.textContent = `MIME Type: ${mime}`;
    output.style.color = "green";
  } catch (err) {
    output.textContent = `Error: ${err.message}`;
    output.style.color = "red";
  }
}

// ==============================================================================================
// ================  Problem 8, Part 1: generate license text and link from license code.========
//===============================================================================================
//  * Your generateLicenseLink() function should also accept an optional second argument,
//  * `targetBlank`.  If `targetBlank` is true, add ` target="_blank"` to your link
//  * so that the URL opens in a blank tab/window.
//  ******************************************************************************/

function generateLicenseLink(licenseCode, targetBlank) {
  if (typeof licenseCode !== "string" || !licenseCode.trim()) {
    throw new Error("Cannot be Empty !! ");
  }

  const code = licenseCode.trim().toUpperCase();

  const licenseMap = {
    "CC-BY": "Creative Commons Attribution License",
    "CC-BY-NC": "Creative Commons Attribution Noncommuiciral License",
    "CC-BY-SA": "Creative Commons Atrrribution: Sharelike License",
    "CC-BY-ND": "Creative Commons Attribution-NoDericv License",
    "CC-BY-NC-SA":
      "Creative Commons Attribution-NonCommercial -Noderics ALicense",
    "CC-BY-NC-ND":
      "Creative Commons Attributions-noncommercial-noDerives License",
  };

  let url = "https://choosealicense.com/no-permission/";
  let text = "All Rights Reserved";

  if (licenseMap[code]) {
    const lower = code.replace("CC-", "").toLowerCase();
    url = `https://creativecommons.org/licenses/${lower}/4.0/`;
    text = licenseMap[code];
  }

  const targetAttr = targetBlank ? ` target="_blank"` : "";
  return `<a href="${url}"${targetAttr}>${text}</a>`;
}
// click handler here

function generateLicenseLinkClick() {
  const input = document.querySelector("#licenseInput");
  const checkbox = document.querySelector("#targetBlankCheckbox");
  const output = document.querySelector("#licenseOutput");

  if (!input || !output) {
    console.error("Requires Element In DOM");
    return;
  }

  const code = input.value.trim();
  const openNewTab = checkbox?.checked || false;

  try {
    const linkHTML = generateLicenseLink(code, openNewTab);
    output.innerHTML = `License Link: ${linkHTML}`;
    output.style.color = "green";
  } catch (err) {
    output.textContent = `Error: ${err.message}`;
    output.style.color = "red";
  }
}

// ==============================================================================================
// ================  9 Part 1: convert a value to a Boolean (true or false)========
//===============================================================================================
//  * A dataset contains fields that indicate a value is true or false.  However,
//  * users have entered data in various formats and languages (English and French)
//  * over the years, and the data is a mess. For example, the dataset contains all
//  * of the following values:
//  *
//  * Yes, yes, YES, Y, Oui, oui, OUI, O, t, TRUE, true, True, vrai, V, VRAI, 1, 2, ...any positive number
//  * No, no, NO, Non, non, NON, N, n, f, FALSE, false, False, FAUX, faux, Faux, 0, -1, -2, ...any negative number
//  *
//  * Write a function pureBool() which takes a String, Number, or Boolean,
//  * and attempts to convert it into a pure Boolean value, according to these rules:
//  *
//  * 1. If the value is already a Boolean (true or false) return the value without conversion
//  * 2. If the value is one of the "true" type values, return `true` (Boolean)
//  * 3. If the value is one of the "false" type values, return `false` (Boolean)
//  * 4. If the value is none of the "true" or "false" values, throw an error with the error
//  * message, 'invalid value'.
//  *

function pureBool(value) {
  if (typeof value === "boolean") return value;

  //string handler
  if (typeof value === "string") {
    const cleaned = value.trim().toLowerCase();

    // style text handle here

    const trueValues = ["yes", "y", "oui", "o", "t", "true", "vrai", "v"];
    const falseValues = ["no", "n", "non", "f", "false", "faux"];

    if (trueValues.includes(cleaned)) return true;
    if (falseValues.includes(cleaned)) return false;

    if (!isNaN(cleaned)) {
      const num = parseFloat(cleaned);
      if (num > 0) return true;
      if (num <= 0) return false;
    }

    throw new Error("Incorrect Value");
  }
  // number value
  if (typeof value === "number") {
    if (value > 0) return true;
    if (value <= 0) return false;
  }

  //fall back here

  throw new Error("Incorrect Value");
}
function boolClick() {
  const input = document.querySelector("#boolInput");
  const output = document.querySelector("#boolOutput");

  if (!input || !output) {
    console.error("No input output");
    return;
  }

  try {
    const rawValue = input.value.trim();
    let parsedvalue;
    if (rawValue === "") {
      throw new Error("input Cannot Be Empty");
    } else if (!Number.isNaN(Number(rawValue))) {
      parsedvalue = Number(rawValue);
    } else {
      parsedvalue = rawValue;
    }
    const result = pureBool(parsedvalue);

    //success Output

    output.textContent = `Converted Result: ${result}`;
    output.style.color = "green";
  } catch (err) {
    output.textContent = `Error: ${err.message}`;
    output.style.color = "red";
  }
}

// ==============================================================================================
// ================  9 Part 2: checking for all Every Anny None values in a normalized list======
//===============================================================================================

//  * Using your pureBool() function above, create three new functions to check
//  * if a list of arguments are all "true", partially "true", or all "false" values:
//  *
//  * every('Y', 'yes', 1) --> returns true
//  * any('Y', 'no', 1) --> returns true
//  * none('Y', 'invalid', 1) --> returns false
//  *
//  * Use try/catch syntax to avoid having your functions throw errors when pureBool()
//  * throws on invalid data.
//  ******************************************************************************/

// helper function here

function getInputval() {
  const inputBox = document.getquerySeclector("#boolListInput").value;
  return (
    inputBox
      .split()
      // found a way to use .map to help get output correctly
      .map((item) => item.trim())
      .filter((item) => item.length > 0)
  );
}

//every here

function every(...values) {
  for (const val of values) {
    try {
      if (!pureBool(val)) return false;
    } catch {
      return false; // value wil treat this as false
    }
  }
  return true; // all will be true
}

// this validates the any argument

function any(...values) {
  for (const val of values) {
    try {
      if (!pureBool(val)) return false;
    } catch {
      return false;
    }
  }

  // if none here =======

  function none(...values) {
    for (const val of values) {
      try {
        if (!pureBool(val)) return false;
      } catch {
        return true;
      }

      // handler will be here ==========

      function handleEvery() {
        const values = getInputval();
        const result = every(...values);
        const out = document.querySelector("#everyOutput");
        out.textContent = `every(${values.join(", ")}) ➜ ${result}`;
        out.style.color = result ? "green" : "red";
      }

      function handleAny() {
        const values = getInputval();
        const result = every(...values);
        const out = document.querySelector("#anyOutput");
        out.textContent = `every(${values.join(", ")}) ➜ ${result}`;
        out.style.color = result ? "green" : "red";
      }

      function handleNone() {
        const values = getInputval();
        const result = every(...values);
        const out = document.querySelector("#noOutput");
        out.textContent = `every(${values.join(", ")}) ➜ ${result}`;
        out.style.color = result ? "green" : "red";
      }
    }
  }
}

// /*******************************************************************************
//  * Problem 10 - build a URL
//  *
//  * Querying the iNaturalist Web API (https://api.inaturalist.org/v2/observations)
//  * for data involves formatting a URL in a particular way.  As we know might know, a URL can contain optional name=value pairs. For reference: read query strings on web :)
//  *
//  * For example:
//  *
//  *   https://www.store.com/search?q=dog includes q=dog
//  *
//  *   https://www.store.com?_encoding=UTF8&node=18521080011 includes
//  *   both _encoding=UTF8 and also node=18521080011, separated by &
//  *
//  * We will write a buildUrl() function to build a URL for the iNaturalist API
//  * based on arguments passed by the caller.
//  *
//  * The buildUrl() function accepts the following arguments:
//  *
//  * - query: a URI encoded search string, for example "butterfly" or "Horse-chestnut"
//  * - order: a string indicating sort order, with possible values of `ascending` or `descending`
//  * - count: a number from 1 to 50, indicating how many results to return per page
//  * - license: a string indicating which items to return (e.g., which license they use). Possible
//  *   values include: none, any, cc-by, cc-by-nc, cc-by-sa, cc-by-nd, cc-by-nc-sa, cc-by-nc-nd
//  *
//  * Write an implementation of buildUrl() that accepts arguments for all of the above
//  * parameters, validates them (e.g., count must be between 1 and 50, etc), and returns
//  * a properly formatted URL.
//  *
//  * For example:
//  *
//  * buildUrl('Monarch Butterfly', 'ascending', 25, 'cc-by') would return the following URL:
//  *
//  * https://api.inaturalist.org/v2/observations?query='Monarch%20Butterfly'&count=25&order=ascending&license=cc-by
//  *
//  * NOTE: if any of the values passed to buildUrl() are invalid, an Error should be thrown.
//  *
//  * NOTE: make sure you properly encode the query value, since URLs can't contain
//  * spaces or other special characters. HINT: use the encodeURIComponent() function
//  * to do this, see:
//  *
//  * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent
//  *
//  * The following might be the parameters
//  *
//  *  "query" the query to use. Must be properly URI encoded
//  * "order" the sort order to use, must be one of `ascending` or `descending`
//  * "count" the number of results per page, must be 1-50
//  * "license" the license to use, must be one of none, any, cc-by, cc-by-nc, cc-by-sa, cc-by-nd, cc-by-nc-sa, cc-by-nc-nd
//  *
//  ********************************************************** ********************/

// function buildUrl(query, order, count, license) {
//   // Replace this comment with your code...
//   //returns the properly formatted iNaturlist URL
//
