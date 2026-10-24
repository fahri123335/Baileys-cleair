import { transform } from '@napi-rs/image'
import ffmpeg from 'fluent-ffmpeg'

export const MediaModule = {
    image: {
        process: async (
            buffer: Buffer, 
            options: { 
                width?: number; 
                height?: number; 
                quality?: number; 
                format?: 'webp' | 'png' | 'jpeg' 
            } = {}
        ): Promise<Buffer> => {
            return await transform(buffer, {
                width: options.width || 512,
                height: options.height || 512,
                quality: options.quality || 80,
                format: options.format || 'webp',
                fit: 'cover'
            })
        },

        toStickerBuffer: async (buffer: Buffer): Promise<Buffer> => {
            return await transform(buffer, {
                width: 512,
                height: 512,
                quality: 80,
                format: 'webp',
                fit: 'contain'
            })
        }
    },
    media: {
        ffmpeg,

        toVoiceNote: (inputPath: string, outputPath: string): Promise<string> => {
            return new Promise((resolve, reject) => {
                ffmpeg(inputPath)
                    .audioCodec('libopus')
                    .format('ogg')
                    .save(outputPath)
                    .on('end', () => resolve(outputPath))
                    .on('error', (err) => reject(err))
            })
        },

        toGif: (inputPath: string, outputPath: string, fps: number = 15, scale: number = 320): Promise<string> => {
            return new Promise((resolve, reject) => {
                ffmpeg(inputPath)
                    .outputOptions([
                        `-vf fps=${fps},scale=${scale}:-1:flags=lanczos,split[s0][s1];[s0]palettegen[p];[s1][p]paletteuse`,
                        '-loop 0'
                    ])
                    .save(outputPath)
                    .on('end', () => resolve(outputPath))
                    .on('error', (err) => reject(err))
            })
        },

        videoToAnimatedSticker: (inputPath: string, outputPath: string): Promise<string> => {
            return new Promise((resolve, reject) => {
                ffmpeg(inputPath)
                    .inputOptions(['-t 10'])
                    .outputOptions([
                        '-vcodec libwebp',
                        '-vf scale=512:512:force_original_aspect_ratio=decrease,fps=15,pad=512:512:(ow-iw)/2:(oh-ih)/2:color=transparent@0',
                        '-loop 0',
                        '-ss 00:00:00',
                        '-t 00:00:10',
                        '-preset default',
                        '-an',
                        '-vsync 0'
                    ])
                    .save(outputPath)
                    .on('end', () => resolve(outputPath))
                    .on('error', (err) => reject(err))
            })
        }
    }
}

