import makeWASocket from './Socket/index'

export { Companlib } from './Utils/Companlib'
export * from './Socket/index.js'
export * as callmess from './Socket/VoIP.js'
export * from './Utils/jid-helper.js'
export * from '../WAProto/index.js'
export * from './Utils/index'
export * from './Types/index'
export * from './Defaults/index'
export * from './WABinary/index'
export * from './WAM/index'
export * from './WAUSync/index'

export type WASocket = ReturnType<typeof makeWASocket>
export { makeWASocket }
export default makeWASocket
