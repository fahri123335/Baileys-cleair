import { JidHelper } from './jid-helper.js';

export function serializeMessage(conn: any, m: any) {
    if (!m) return m;

    const senderJid = m.key?.participant || m.key?.remoteJid || '';
    const cleanRemoteJid = JidHelper.normalize(m.key?.remoteJid || '');

    return {
        ...m,
        sender: senderJid,
        cleanRemoteJid
    };
}

