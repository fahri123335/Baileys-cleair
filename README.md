# 乂 BAILEYS - FORKD 乂

---

this a fork baileys from indonesian by finn 

---

### features 

- **support voip**
- **Advances jid & lid**
- **companlib feature (new)**

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

---

## companlib handle [new !]

```javascript
import makeWASocket, { Companlib } from 'baileys-forkd'
import fs from 'fs'

async function startBot() {
    console.log('🤖 Bot sedang berjalan...')

    // Ambil waktu WIB saat ini
    console.log(`⏰ Waktu aktif saat ini (WIB): ${Companlib.now()}`)

    // Bikin jadwal otomatis (Contoh: Jalan tiap jam 08:00 pagi WIB)
    Companlib.scheduleCron('0 8 * * *', () => {
        console.log('✨ [CRON] Pesan otomatis terkirim pada jam 8 pagi WIB!')
        // Masukin logika kirim pesan broadcast atau reset data di sini
    })

    // Contoh handler saat user kirim gambar buat dijadiin Stiker Statis
    async function handleMakeSticker(imageBuffer: Buffer) {
        try {
            // Ubah buffer gambar jadi webp ukuran stiker (otomatis 512x512, fit contain)
            const stickerWebp = await Companlib.image.toStickerBuffer(imageBuffer)
            
            console.log('✅ Berhasil konversi gambar jadi stiker statis!')
            return stickerWebp
        } catch (err) {
            console.error('❌ Gagal bikin stiker:', err)
        }
    }

    // Contoh handler saat user kirim video pendek buat dijadiin Stiker Animasi (Gerak)
    async function handleAnimatedSticker(inputVideoPath: string, outputWebpPath: string) {
        try {
            // Konversi video max 10 detik jadi stiker gerak WebP
            await Companlib.media.videoToAnimatedSticker(inputVideoPath, outputWebpPath)
            
            console.log('✅ Berhasil konversi video jadi stiker animasi!')
        } catch (err) {
            console.error('❌ Gagal bikin stiker animasi:', err)
        }
    }
    
    async function handleVoiceNote(inputAudioPath: string, outputOggPath: string) {
        try {
            // Ubah file audio apa aja jadi format .ogg / .opus standar VN WhatsApp
            await Companlib.media.toVoiceNote(inputAudioPath, outputOggPath)
            
            console.log('✅ Berhasil convert audio jadi Voice Note WhatsApp!')
        } catch (err) {
            console.error('❌ Gagal convert VN:', err)
        }
    }
}

startBot()
```
