const pbUrl = () =>
  (import.meta.env.VITE_POCKETBASE_URL || 'https://dashboard-mambeu.schoolhub.space').replace(/\/$/, '');

function randomId() {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) return crypto.randomUUID();
  return `req-${Date.now()}`;
}

/** Save enquiry to PocketBase (best-effort; form still works via WhatsApp/email). */
export async function submitEnquiry(fields) {
  const body = {
    requestId: randomId(),
    status: 'new',
    source: 'plan',
    name: fields.name || '',
    email: fields.email || '',
    phone: fields.phone || '',
    country: fields.country || '',
    style: fields.style || '',
    journey: fields.journey || '',
    interest: fields.interest || '',
    travelDate: fields.date || '',
    adults: fields.adults || '',
    children: fields.children || '',
    message: fields.message || '',
    payload: fields,
  };
  const res = await fetch(`${pbUrl()}/api/collections/enquiries/records`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || `Enquiry save failed (${res.status})`);
  }
  return res.json();
}
