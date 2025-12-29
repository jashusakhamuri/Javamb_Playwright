
import { test, expect } from '@playwright/test';
import Ajv from 'ajv';
import bookingSchema from "../../TestData/APISchemas/bookingSchema.json";
import createBookingSchema from "../../TestData/APISchemas/createBookingSchema.json";
import bookingData from "../../TestData/APIPayloads/createBookingData.json";
import logger from "../../src/utils/logger";

const ajv = new Ajv();
ajv.addFormat('date', /^\d{4}-\d{2}-\d{2}$/);

// --------------------
// Positive Scenarios
// --------------------

test('POST Booking - Positive 1: Valid payload', async ({ request }) => {
    const res = await request.post('/booking', { data: bookingData.validPayload });
    logger.info(`Positive 1 → Status: ${res.status()}`);
    expect(res.status()).toBe(200);

    const json = await res.json();
    logger.info(`Positive 1 → Response: ${JSON.stringify(json)}`);

    const validate = ajv.compile(createBookingSchema);
    const valid = validate(json);
    if (valid) logger.info('✅ Schema validation passed');
    else logger.error(`❌ Schema validation failed: ${JSON.stringify(validate.errors)}`);
    expect(valid, JSON.stringify(validate.errors)).toBeTruthy();
});

test('POST Booking - Positive 2: Minimal payload', async ({ request }) => {
    const res = await request.post('/booking', { data: bookingData.minimalPayload });
    logger.info(`Positive 2 → Status: ${res.status()}`);
    expect(res.status()).toBe(200);

    const json = await res.json();
    const validate = ajv.compile(createBookingSchema);
    expect(validate(json), JSON.stringify(validate.errors)).toBeTruthy();
});

test('POST Booking - Positive 3: With additional needs', async ({ request }) => {
    const res = await request.post('/booking', { data: bookingData.additionalNeedsPayload });
    logger.info(`Positive 3 → Status: ${res.status()}`);
    expect(res.status()).toBe(200);

    const json = await res.json();
    const validate = ajv.compile(createBookingSchema);
    expect(validate(json), JSON.stringify(validate.errors)).toBeTruthy();
});

// --------------------
// Negative Scenarios
// --------------------

test('POST Booking - Negative 1: Missing required fields', async ({ request }) => {
    const res = await request.post('/booking', { data: {} });
    logger.warn(`Negative 1 → Status: ${res.status()}`);
    expect([400, 500]).toContain(res.status());
});

test('POST Booking - Negative 2: Malformed payload', async ({ request }) => {
    const res = await request.post('/booking', { data: "not-a-json-object" });
    logger.warn(`Negative 2 → Status: ${res.status()}`);
    expect([400, 500]).toContain(res.status());
});

test('POST Booking - Negative 3: Wrong endpoint', async ({ request }) => {
    const res = await request.post('/bookings', { data: bookingData.validPayload });
    logger.warn(`Negative 3 → Status: ${res.status()}`);
    expect([404, 500]).toContain(res.status());
});

test('POST Booking - Negative 4: Invalid date format', async ({ request }) => {
    const res = await request.post('/booking', { data: bookingData.invalidDatePayload });
    logger.warn(`Negative 4 → Status: ${res.status()}`);
    expect([200, 400, 500]).toContain(res.status());
});

test('POST Booking - Negative 5: Unexpected property', async ({ request }) => {
    const res = await request.post('/booking', { data: bookingData.unexpectedPropertyPayload });
    logger.warn(`Negative 5 → Status: ${res.status()}`);
    expect(res.status()).toBe(200);

    const json = await res.json();
    expect(json.booking).not.toHaveProperty('extrafield');
});

test('POST Booking - Negative 6: Empty string values', async ({ request }) => {
    const res = await request.post('/booking', { data: bookingData.emptyStringsPayload });
    logger.warn(`Negative 6 → Status: ${res.status()}`);
    expect([200, 400, 500]).toContain(res.status());

    const json = await res.json().catch(() => null);
    const validate = ajv.compile(bookingSchema);
    const valid = validate(json?.booking);
    expect(valid).toBeFalsy();
});
