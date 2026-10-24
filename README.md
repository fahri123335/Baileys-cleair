# 乂 BAILEYS - FORKD 乂

---

this a fork baileys from indonesian by finn

---

### features

- **support voip**
- **Advances jid & lid**

---

### requitments

- **Node js +20**
- **Type esm/module es**

---

### tutorial installation

```bash
npm i baileys-forkd


---

### example code

```javascript
import makeWASocket, { useMultiFileAuthState } from 'baileys->

const { state, saveCreds } = await useMultiFileAuthState('aut>

const sock = makeWASocket({
    auth: state,
    printQRInTerminal: true
})

sock.ev.on('creds.update', saveCreds)
