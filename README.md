# 乂 BAILEYS - FORKD 乂

A fork of Baileys, made in Indonesia by Finn.

---

## Features

- **VoIP support**
- **Advanced JID & LID support**

---

## Requirements

- **Node.js 20+**
- **ES Modules** (`"type": "module"` in your `package.json`)

---

## Installation

```bash
npm i baileys-forkd
```

---

## Example

```javascript
import makeWASocket, { useMultiFileAuthState } from 'baileys-forkd'

const { state, saveCreds } = await useMultiFileAuthState('auth_info')

const sock = makeWASocket({
    auth: state,
    printQRInTerminal: true
})

sock.ev.on('creds.update', saveCreds)
```
