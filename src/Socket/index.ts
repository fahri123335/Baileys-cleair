import { DEFAULT_CONNECTION_CONFIG } from '../Defaults/index.js'
import type { UserFacingSocketConfig } from '../Types/index.js'
import { makeCommunitiesSocket } from './communities.js'
import { makeVoIPSocket } from './VoIP.js'

// export the last socket layer with VoIP support
const makeWASocket = (config: UserFacingSocketConfig) => {
    const newConfig = {
        ...DEFAULT_CONNECTION_CONFIG,
        ...config
    }

    // Gabungkan communities socket dengan wrapper VoIP
    const conn = makeCommunitiesSocket(newConfig)
    return makeVoIPSocket(conn)
}

export default makeWASocket

