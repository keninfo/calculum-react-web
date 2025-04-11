import type { AxiosResponse } from 'axios'
import axios from 'axios'

import { VELVET_CAPITAL_BASE_API_URL, VELVET_CAPITAL_OWNER_WALLET } from '@/shared/constants'

export const getMyVaults = async (chain = 'base'): Promise<AxiosResponse> => {
  const url = `${VELVET_CAPITAL_BASE_API_URL}/v3/portfolio/owner/${VELVET_CAPITAL_OWNER_WALLET}?chain=${chain}`
  return await axios.get(url)
}
