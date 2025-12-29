import fs from 'fs';
import path from 'path';

export function loadProperties(env: string) {
    const filePath = path.resolve(__dirname, `${env}.properties`);
    if (!fs.existsSync(filePath)) {
        throw new Error(`❌ Config file not found for environment: ${env}`);
    }

    const raw = fs.readFileSync(filePath, 'utf-8');
    const props: Record<string, string> = {};

    raw.split('\n').forEach(line => {
        const trimmed = line.trim();
        if (!trimmed || trimmed.startsWith('#')) return;
        const [key, value] = trimmed.split('=');
        if (key && value) {
            props[key.trim()] = value.trim();
        }
    });

    return props;
}
