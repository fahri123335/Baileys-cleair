import cron from 'node-cron'
import moment from 'moment-timezone'

moment.tz.setDefault('Asia/Jakarta')

export const TimezoneModule = {
    now: (format: string = 'YYYY-MM-DD HH:mm:ss'): string => {
        return moment().format(format)
    },

    moment: (date?: any) => {
        return moment(date).tz('Asia/Jakarta')
    },

    scheduleCron: (
        expression: string, 
        task: () => void, 
        options: cron.ScheduleOptions = {}
    ) => {
        return cron.schedule(expression, task, {
            scheduled: true,
            timezone: 'Asia/Jakarta',
            ...options
        })
    }
}

