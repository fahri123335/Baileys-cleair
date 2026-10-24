import cron from 'node-cron'
import moment from 'moment-timezone'

let currentTz = 'Asia/Jakarta'
moment.tz.setDefault(currentTz)

export const TimezoneModule = {
    setTimezone: (tz: string) => {
        currentTz = tz
        moment.tz.setDefault(tz)
    },

    getTimezone: (): string => {
        return currentTz
    },

    now: (format: string = 'YYYY-MM-DD HH:mm:ss', customTz?: string): string => {
        return moment().tz(customTz || currentTz).format(format)
    },

    moment: (date?: any, customTz?: string) => {
        return moment(date).tz(customTz || currentTz)
    },

    scheduleCron: (
        expression: string, 
        task: () => void, 
        options: Record<string, any> = {},
        customTz?: string
    ) => {
        return cron.schedule(expression, task, {
            timezone: customTz || currentTz,
            ...options
        })
    }
}

