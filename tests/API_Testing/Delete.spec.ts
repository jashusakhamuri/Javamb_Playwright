
import { test, expect, APIRequestContext } from '@playwright/test';
import logger from "../../src/utils/logger";
import deleteData from "../../TestData/APIPayloads/deleteBookingData.json";

async function getToken(request: APIRequestContext) {
    const res = await request.post('/auth', {
        data: { username: 'admin', password: 'password123' }
    });
    return (await res.json()).token;
}

// --------------------
// Positive Scenarios
// --------------------

test('DELETE Booking - Positive 1: Delete existing booking by ID', async ({ request }) => {
    const token = await getToken(request);

    const createRes = await request.post('/booking', { data: deleteData.deleteMePayload });
    const bookingId = (await createRes.json()).bookingid;
    logger.info(`Positive 1 → Created booking ID ${bookingId}`);

    const delRes = await request.delete(`/booking/${bookingId}`, {
        headers: { Cookie: `token=${token}` }
    });
    logger.info(`Positive 1 → Delete status: ${delRes.status()}`);
    expect(delRes.status()).toBe(201);
});

test('DELETE Booking - Positive 2: Delete booking twice (second should fail)', async ({ request }) => {
    const token = await getToken(request);

    const createRes = await request.post('/booking', { data: deleteData.doubleDeletePayload });
    const bookingId = (await createRes.json()).bookingid;
    logger.info(`Positive 2 → Created booking ID ${bookingId}`);

    await request.delete(`/booking/${bookingId}`, { headers: { Cookie: `token=${token}` } });

    const delRes2 = await request.delete(`/booking/${bookingId}`, { headers: { Cookie: `token=${token}` } });
    logger.info(`Positive 2 → Second delete status: ${delRes2.status()}`);
    expect([404, 405]).toContain(delRes2.status());
});

test('DELETE Booking - Positive 3: Delete booking with valid token', async ({ request }) => {
    const token = await getToken(request);

    const createRes = await request.post('/booking', { data: deleteData.tokenDeletePayload });
    const bookingId = (await createRes.json()).bookingid;
    logger.info(`Positive 3 → Created booking ID ${bookingId}`);

    const delRes = await request.delete(`/booking/${bookingId}`, {
        headers: { Cookie: `token=${token}` }
    });
    logger.info(`Positive 3 → Delete status: ${delRes.status()}`);
    expect(delRes.status()).toBe(201);
});

// --------------------
// Negative Scenarios
// --------------------

test('DELETE Booking - Negative 1: Without token', async ({ request }) => {
    const delRes = await request.delete('/booking/1');
    logger.warn(`Negative 1 → Status: ${delRes.status()}`);
    expect(delRes.status()).toBe(403);
});

test('DELETE Booking - Negative 2: Invalid token', async ({ request }) => {
    const delRes = await request.delete('/booking/1', {
        headers: { Cookie: `token=invalidtoken` }
    });
    logger.warn(`Negative 2 → Status: ${delRes.status()}`);
    expect(delRes.status()).toBe(403);
});

test('DELETE Booking - Negative 3: Non-existent ID', async ({ request }) => {
    const token = await getToken(request);
    const delRes = await request.delete('/booking/999999', {
        headers: { Cookie: `token=${token}` }
    });
    logger.warn(`Negative 3 → Status: ${delRes.status()}`);
    expect([400, 404, 405]).toContain(delRes.status());
});

test('DELETE Booking - Negative 4: Wrong endpoint', async ({ request }) => {
    const token = await getToken(request);
    const delRes = await request.delete('/bookings', {
        headers: { Cookie: `token=${token}` }
    });
    logger.warn(`Negative 4 → Status: ${delRes.status()}`);
    expect([404, 405]).toContain(delRes.status());
});
