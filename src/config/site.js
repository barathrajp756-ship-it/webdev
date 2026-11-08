/**
 * Contact details live here so you only need to edit them once.
 *
 * TODO: replace the placeholder numbers and emails with your real ones.
 * - `href` must be the number in international format, digits only, e.g. "+15551234567".
 * - `display` is exactly how it appears on the page.
 * - The first email receives form submissions; the second one is CC'd.
 */
export const site = {
  phones: [
    { label: "New projects", display: "+91 9443834248", href: "919443834248" },
    { label: "Existing clients", display: "+91 9677749414", href: "919677749414" },
  ],
  emails: [
    { label: "New projects", address: "harishpanchanatham@gmail.com" },
    { label: "General enquiries", address: "barathraj018@gmail.com" },
  ],
};

export const primaryPhone = site.phones[0];
export const primaryEmail = site.emails[0]?.address ?? "";
export const secondaryEmail = site.emails[1]?.address ?? "";

/** FormSubmit delivers the contact form to this address (and CCs the second). */
export const formEndpoint = `https://formsubmit.co/ajax/${primaryEmail}`;
