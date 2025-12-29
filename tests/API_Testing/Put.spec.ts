




import { test, expect, APIRequestContext } from '@playwright/test';
import Ajv from 'ajv';
import updateBookingSchema from "../../TestData/APISchemas/updateBookingSchema.json";
import updateData from "../../TestData/APIPayloads/updateBookingData.json";
import logger from "../../src/utils/logger";

const ajv = new Ajv();
ajv.addFormat('date', /^\d{4}-\d{2}-\d{2}$/);

async function getToken(request: APIRequestContext) {
    const res = await request.post('/auth', {
        data: { username: 'admin', password: 'password123' }
    });
    return (await res.json()).token;
}

// --------------------
// Positive Scenarios
// --------------------

test('PUT Booking - Positive 1: Valid payload + schema validation', async ({ request }) => {
    const token = await getToken(request);

    const createRes = await request.post('/booking', {
        data: updateData.validPayload // reuse same structure for create
    });
    const bookingId = (await createRes.json()).bookingid;
    logger.info(`Positive 1 → Created booking ID ${bookingId}`);

    const res = await request.put(`/booking/${bookingId}`, {
        data: updateData.validPayload,
        headers: { Cookie: `token=${token}` }
    });
    logger.info(`Positive 1 → Update status: ${res.status()}`);
    expect(res.status()).toBe(200);

    const json = await res.json();
    const validate = ajv.compile(updateBookingSchema);
    const valid = validate(json);
    if (valid) logger.info(' Schema validation passed');
    else logger.error(` Schema validation failed: ${JSON.stringify(validate.errors)}`);
    expect(valid, JSON.stringify(validate.errors)).toBeTruthy();
});

test('PUT Booking - Positive 2: Minimal payload', async ({ request }) => {
    const token = await getToken(request);
    const createRes = await request.post('/booking', { data: updateData.minimalPayload });
    const bookingId = (await createRes.json()).bookingid;

    const res = await request.put(`/booking/${bookingId}`, {
        data: updateData.minimalPayload,
        headers: { Cookie: `token=${token}` }
    });
    expect(res.status()).toBe(200);

    const json = await res.json();
    const validate = ajv.compile(updateBookingSchema);
    expect(validate(json), JSON.stringify(validate.errors)).toBeTruthy();
});

test('PUT Booking - Positive 3: With additional needs', async ({ request }) => {
    const token = await getToken(request);
    const createRes = await request.post('/booking', { data: updateData.additionalNeedsPayload });
    const bookingId = (await createRes.json()).bookingid;

    const res = await request.put(`/booking/${bookingId}`, {
        data: updateData.additionalNeedsPayload,
        headers: { Cookie: `token=${token}` }
    });
    expect(res.status()).toBe(200);

    const json = await res.json();
    const validate = ajv.compile(updateBookingSchema);
    expect(validate(json), JSON.stringify(validate.errors)).toBeTruthy();
});

// --------------------
// Negative Scenarios
// --------------------

test('PUT Booking - Negative 1: Without token', async ({ request }) => {
    const res = await request.put('/booking/1', { data: updateData.validPayload });
    logger.warn(`Negative 1 → Status: ${res.status()}`);
    expect(res.status()).toBe(403);
});

test('PUT Booking - Negative 2: Invalid token', async ({ request }) => {
    const res = await request.put('/booking/1', {
        data: updateData.validPayload,
        headers: { Cookie: `token=invalidtoken` }
    });
    logger.warn(`Negative 2 → Status: ${res.status()}`);
    expect(res.status()).toBe(403);
});

test('PUT Booking - Negative 3: Non-existent ID', async ({ request }) => {
    const token = await getToken(request);
    const res = await request.put('/booking/999999', {
        data: updateData.validPayload,
        headers: { Cookie: `token=${token}` }
    });
    logger.warn(`Negative 3 → Status: ${res.status()}`);
    expect([400, 404, 405]).toContain(res.status());
});

test('PUT Booking - Negative 4: Malformed payload', async ({ request }) => {
    const token = await getToken(request);
    const res = await request.put('/booking/1', {
        data: "not-a-json-object",
        headers: { Cookie: `token=${token}` }
    });
    logger.warn(`Negative 4 → Status: ${res.status()}`);
    expect([400, 500]).toContain(res.status());
});

test('PUT Booking - Negative 5: Missing required fields', async ({ request }) => {
    const token = await getToken(request);
    const res = await request.put('/booking/1', {
        data: updateData.missingFieldsPayload,
        headers: { Cookie: `token=${token}` }
    });
    logger.warn(`Negative 5 → Status: ${res.status()}`);
    expect([400, 500]).toContain(res.status());
});

test('PUT Booking - Negative 6: Wrong endpoint', async ({ request }) => {
    const token = await getToken(request);
    const res = await request.put('/bookings', {
        data: updateData.wrongEndpointPayload,
        headers: { Cookie: `token=${token}` }
    });
    logger.warn(`Negative 6 → Status: ${res.status()}`);
    expect([404, 405]).toContain(res.status());
});

test('PUT Booking - Negative 7: Invalid data types', async ({ request }) => {
    const token = await getToken(request);
    const res = await request.put('/booking/1', {
        data: updateData.invalidTypesPayload,
        headers: { Cookie: `token=${token}` }
    });
    logger.warn(`Negative 7 → Status: ${res.status()}`);
    expect([400, 500]).toContain(res.status());
});

