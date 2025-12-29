import { test, expect } from '@playwright/test';
import Ajv from 'ajv';
import bookingSchema from "../../TestData/APISchemas/bookingSchema.json";
import logger from "../../src/utils/logger";

const ajv = new Ajv();
ajv.addFormat('date', /^\d{4}-\d{2}-\d{2}$/);

// --------------------
// Positive Scenarios
// --------------------

test('GET Booking - Positive 1: Fetch booking by ID with schema validation', async ({ request }) => {
    // Step 1: fetch all booking IDs
    const idsRes = await request.get('/booking');
    expect(idsRes.status()).toBe(200);
    const idsJson = await idsRes.json();
    const bookingId = idsJson[0].bookingid; // pick first available ID
    logger.info(`Positive 1 → Using booking ID`);

    // Step 2: fetch booking by that ID
    const res = await request.get(`/booking/${bookingId}`, {
        headers: { Accept: 'application/json' }
    });
    logger.info(`Positive 1 → Status: ${res.status()}`);
    logger.info(`Positive 1 → Fetched booking ID: ${res.json}`);
    expect(res.status()).toBe(200);

    const json = await res.json();
    logger.info(`Positive 1 → Response: ${JSON.stringify(json)}`);

    // Step 3: validate schema
    const validate = ajv.compile(bookingSchema);
    const valid = validate(json);
    if (!valid) {
        logger.error(`Positive 1 → Schema validation failed: ${JSON.stringify(validate.errors)}`);
    } else {
        logger.info('Positive 1 → Schema validation passed');
    }
    expect(valid, JSON.stringify(validate.errors)).toBeTruthy();
});

test('GET Booking - Positive 2: Fetch all booking IDs', async ({ request }) => {
    logger.info('Positive 2 → Fetch all booking IDs');
    const res = await request.get('/booking');
    logger.info(`Positive 2 → Status: ${res.status()}`);
    expect(res.status()).toBe(200);

    const json = await res.json();
    const responseStr = JSON.stringify(json);

    // log only first 50 characters
    logger.info(`Positive 2 → Response (truncated): ${responseStr.substring(0, 50)}...`);
});


test('GET Booking - Positive 3: Filter bookings by firstname', async ({ request }) => {
    logger.info('Positive 3 → Filter bookings by firstname=Jim');
    const res = await request.get('/booking?firstname=Jim');
    logger.info(`Positive 3 → Status: ${res.status()}`);
    expect(res.status()).toBe(200);

    const json = await res.json();
    logger.info(`Positive 3 → Response: ${JSON.stringify(json)}`);
});

// --------------------
// Negative Scenarios
// --------------------

test('GET Booking - Negative 1: Invalid booking ID', async ({ request }) => {
    logger.warn('Negative 1 → Fetch booking with invalid ID 999999');
    const res = await request.get('/booking/999999');
    logger.warn(`Negative 1 → Status: ${res.status()}`);
    expect([404, 500]).toContain(res.status());

    const json = await res.json().catch(() => null);
    logger.warn(`Negative 1 → Response: ${JSON.stringify(json)}`);
});

test('GET Booking - Negative 2: Invalid query parameter', async ({ request }) => {
    logger.warn('Negative 2 → Fetch booking with invalid query param checkin=invalid-date');
    const res = await request.get('/booking?checkin=invalid-date');
    logger.warn(`Negative 2 → Status: ${res.status()}`);
    expect([400, 500]).toContain(res.status());

    const json = await res.json().catch(() => null);
    logger.warn(`Negative 2 → Response: ${JSON.stringify(json)}`);
});

test('GET Booking - Negative 3: Wrong endpoint', async ({ request }) => {
    logger.warn('Negative 3 → Fetch wrong endpoint /bookings');
    const res = await request.get('/bookings');
    logger.warn(`Negative 3 → Status: ${res.status()}`);
    expect([404, 500]).toContain(res.status());

    const json = await res.json().catch(() => null);
    logger.warn(`Negative 3 → Response: ${JSON.stringify(json)}`);
});
