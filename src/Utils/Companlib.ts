import { TimezoneModule } from './Timezone'
import { MediaModule } from './Media'

export const Companlib = {
    ...TimezoneModule,
    ...MediaModule
}

export type CompanlibType = typeof Companlib

