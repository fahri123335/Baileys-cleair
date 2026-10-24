import type { SocketConfig } from '../Types'
import type { BinaryNode } from '../WABinary'

export interface VoIPCallOfferOptions {
    callId: string
    from: string
    isVideo?: boolean
}

export const makeVoIPSocket = (config: SocketConfig, query: (node: BinaryNode) => Promise<BinaryNode>) => {
    
    const acceptCall = async (callId: string, from: string) => {
        const node: BinaryNode = {
            tag: 'call',
            attrs: {
                to: from,
                id: callId
            },
            content: [
                {
                    tag: 'accept',
                    attrs: {
                        'call-id': callId,
                        'call-creator': from
                    },
                    content: undefined
                }
            ]
        }
        return await query(node)
    }

    const rejectCall = async (callId: string, from: string) => {
        const node: BinaryNode = {
            tag: 'call',
            attrs: {
                to: from,
                id: callId
            },
            content: [
                {
                    tag: 'reject',
                    attrs: {
                        'call-id': callId,
                        'call-creator': from
                    },
                    content: undefined
                }
            ]
        }
        return await query(node)
    }

    return {
        acceptCall,
        rejectCall
    }
}

export type VoIPSocket = ReturnType<typeof makeVoIPSocket>

