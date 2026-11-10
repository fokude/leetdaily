// Firefox needs a different background declaration and an add-on ID, so the
// Firefox manifest is derived from the Chrome one at build time instead of
// being maintained as a second file.

// Required for chrome.storage.sync to work in Firefox. Change it if you
// publish under your own add-on ID.
export const GECKO_ID = "leetdaily@fokude.github.io";

// Firefox rejects add-on names longer than 45 characters.
const FIREFOX_NAME = "LeetDaily - LeetCode & DSA Interview Prep";

/**
 * 140 is the first Firefox release that understands
 * data_collection_permissions, which new AMO submissions must declare.
 */
const MIN_FIREFOX_VERSION = "140.0";

/** Returns a Firefox version of a Chrome Manifest V3 manifest. */
export const toFirefoxManifest = (manifest) => {
  // Firefox runs the background as an event page, not a service worker.
  const { service_worker: worker, ...background } = manifest.background;

  return {
    ...manifest,
    name: FIREFOX_NAME,
    background: { scripts: [worker], ...background },
    browser_specific_settings: {
      gecko: {
        id: GECKO_ID,
        strict_min_version: MIN_FIREFOX_VERSION,
        data_collection_permissions: { required: ["none"] },
      },
    },
  };
};
