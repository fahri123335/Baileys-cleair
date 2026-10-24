export type JidType = 'lid' | 'pn' | 'group' | 'broadcast' | 'newsletter' | 'unknown';

export interface ParsedJid {
    raw: string;
    user: string;
    server: string;
    device?: string;
    type: JidType;
    isLid: boolean;
    isPn: boolean;
    isGroup: boolean;
}

export class JidHelper {
    static parse(jid: string): ParsedJid | null {
        if (!jid || typeof jid !== 'string' || !jid.includes('@')) return null;

        const parts = jid.split('@');
        const rawUserServer = parts[0];
        const server = parts[1];
        if (!rawUserServer || !server) return null;

        let user: string = rawUserServer;
        let device: string | undefined = undefined;

        if (rawUserServer.includes(':')) {
            const subParts = rawUserServer.split(':');
            user = subParts[0] || '';
            device = subParts[1];
        }

        let type: JidType = 'unknown';
        let isLid = false;
        let isPn = false;
        let isGroup = false;

        switch (server) {
            case 'lid':
                type = 'lid';
                isLid = true;
                break;
            case 's.whatsapp.net':
                type = 'pn';
                isPn = true;
                break;
            case 'g.us':
                type = 'group';
                isGroup = true;
                break;
            case 'broadcast':
                type = 'broadcast';
                break;
            case 'newsletter':
                type = 'newsletter';
                break;
        }

        return {
            raw: jid,
            user,
            server,
            device,
            type,
            isLid,
            isPn,
            isGroup
        };
    }

    static isLid(jid: string): boolean {
        return this.parse(jid)?.isLid || false;
    }

    static isPn(jid: string): boolean {
        return this.parse(jid)?.isPn || false;
    }

    static isGroup(jid: string): boolean {
        return this.parse(jid)?.isGroup || false;
    }

    static normalize(jid: string): string {
        const parsed = this.parse(jid);
        if (!parsed) return jid;
        return `${parsed.user}@${parsed.server}`;
    }

    static isValid(jid: string): boolean {
        const parsed = this.parse(jid);
        return parsed !== null && parsed.type !== 'unknown';
    }
}

