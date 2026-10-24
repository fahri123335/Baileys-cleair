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
```

---

### example code 

```javascript 
import makeWASocket, { useMultiFileAuthState, callmess } from 'baileys-forkd'

const { state, saveCreds } = await useMultiFileAuthState('auth_info')

const sock = makeWASocket({
    auth: state,
    printQRInTerminal: true
})

sock.ev.on('creds.update', saveCreds)
```

---

### voip calls

```javascript
// Handler panggilan masuk VoIP
    sock.ev.on('call', async (callEvents) => {
        for (const call of callEvents) {
            if (call.status === 'offer') {
                
                const action = 'yes' <-- select a not if you want the bot to reject calls

                if (action === 'yes') {
                    console.log(`📞 Menerima panggilan dari ${call.from} (Action: YES)...`)
                    try {
                        // gunakan method yang berasal dari socket
                        await sock.acceptCall(call.id, call.from)
                        await sock.sendMessage(call.from, { 
                            text: '🎙️ *VoIP Connected!* Panggilan diterima.' 
                        })
                    } catch (error) {
                        console.error('Gagal accept call:', error)
                    }
                } else if (action === 'not') {
                    console.log(`📵 Menolak panggilan dari ${call.from} (Action: NOT)...`)
                    await sock.rejectCall(call.id, call.from)
                    await sock.sendMessage(call.from, { 
                        text: '⚠️ *VoIP Rejected!* Panggilan ditolak.' 
                    })
                }
            }
        }
    })
}

startBot()
```
