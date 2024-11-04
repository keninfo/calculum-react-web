/* eslint-disable @typescript-eslint/no-explicit-any */
import { timeParse, utcFormat } from 'd3-time-format'

const parseDate = timeParse('%Y-%m-%d')
const formatTime = utcFormat('%B %d, %Y')

export const parseData = (data: any) => {
  return data.map((obj: any) => {
    const { ['']: timestampString, ['MPEPE-PERP']: movePepe, ...rest } = obj
    const TIMESTAMP = timestampString ? parseDate(timestampString) : null
    const formattedDate = TIMESTAMP ? formatTime(TIMESTAMP) : null
    return { TIMESTAMP: formattedDate, ['MPEPE-PERP']: movePepe, ...rest }
  })
}

export const parseStaticData = (data: any) => {
  return data.map((obj: any) => {
    const { ['']: timestampString, ['MPEPE-PERP']: valueToMultiply, ...rest } = obj
    const TIMESTAMP = timestampString ? parseDate(timestampString) : null
    const formattedDate = TIMESTAMP ? formatTime(TIMESTAMP) : null
    const updatedValue = valueToMultiply ? Number(valueToMultiply) * 1000 : null
    return { TIMESTAMP: formattedDate, ['MPEPE-PERP']: updatedValue ? updatedValue.toString() : '', ...rest }
  })
}
