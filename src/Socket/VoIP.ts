import type { BinaryNode } from '../WABinary/index.js';

export interface CallLinkDetails {
    type: 'voice' | 'video';
    token: string;
}

export const makeVoIPSocket = (sock: any) => {
    const generateCallLink = (type: 'voice' | 'video', token: string): string => {
        return `https://call.whatsapp.com/${type}/${token}`;
    };

    const parseCallLink = (url: string): CallLinkDetails | null => {
        const regex = /https:\/\/call\.whatsapp\.com\/(voice|video)\/([A-Za-z0-9_-]+)/;
        const match = url.match(regex);
        
        if (!match || !match[1] || !match[2]) return null;

        return {
            type: match[1] as 'voice' | 'video',
            token: match[2]
        };
    };

    const offerCall = async (jid: string, isVideo: boolean = false) => {
        const callId = Math.random().toString(36).substring(2, 12);
        const mediaType = isVideo ? 'video' : 'audio';
        
        const callNode: BinaryNode = {
            tag: 'call',
            attrs: {
                to: jid,
                id: sock.generateMessageTag(),
                from: sock.user?.id || ''
            },
            content: [
                {
                    tag: 'offer',
                    attrs: {
                        'call-id': callId,
                        'call-creator': sock.user?.id || ''
                    },
                    content: [
                        { 
                            tag: mediaType, 
                            attrs: { enc: 'opus', rate: '16000' } 
                        }
                    ]
                }
            ]
        };

        await sock.query(callNode);
        return {
            callId,
            type: mediaType,
            status: 'offered'
        };
    };

    return {
        ...sock,
        generateCallLink,
        parseCallLink,
        offerCall
    };
};

