import type {
  LibrarySymbolInfo,
  Bar,
  DatafeedConfiguration,
  PeriodParams,
  ResolutionString,
} from '@/public/charting_library'

interface SearchResult {
  symbol: string
  full_name: string
  description: string
  exchange: string
  type: string
}

interface TokenData {
  date: string
  close_price: string
  return: string | null
  signal: string | null
  position: string | null
  signal_return: string | null
  cum_return: string | null
  cum_signal_return: string | null
}

export class CustomUDFDatafeed {
  private baseUrl: string
  private cachedData: Map<string, { raw: TokenData[]; mo: TokenData[] }> = new Map()
  private availableSymbols: string[] = ['BTC', 'ETH', 'PEPE', 'ARB', 'DOGE', 'SOL', 'cbBTC', 'wETH']
  private customPrefix = 'mo'

  constructor() {
    this.baseUrl = '/api'
  }

  searchSymbols(symbol: string, type: string, resolution: string, callback: (results: SearchResult[]) => void): void {
    const results: SearchResult[] = this.availableSymbols
      .filter((item) => item.toLowerCase().includes(symbol.toLowerCase()))
      .flatMap((item) => [
        {
          symbol: item,
          full_name: item,
          description: `${item} Price`,
          exchange: 'Crypto',
          type: 'crypto',
        },
        {
          symbol: `${this.customPrefix}${item}`,
          full_name: `${this.customPrefix}${item}`,
          description: `mo${item} Price`,
          exchange: 'Crypto',
          type: 'crypto',
        },
      ])

    callback(results)
  }

  onReady(callback: (configuration: DatafeedConfiguration) => void): void {
    const configuration: DatafeedConfiguration = {
      supports_marks: false,
      supports_time: true,
      supports_timescale_marks: false,
      exchanges: [
        {
          value: 'Crypto',
          name: 'Crypto',
          desc: 'Crypto',
        },
      ],
    }
    setTimeout(() => callback(configuration), 0)
  }

  async resolveSymbol(
    symbolName: string,
    onResolve: (symbolInfo: LibrarySymbolInfo) => void,
    onError: (error: string) => void,
  ): Promise<void> {
    const baseSymbol = symbolName.startsWith(this.customPrefix)
      ? symbolName.slice(this.customPrefix.length)
      : symbolName

    if (!this.availableSymbols.includes(baseSymbol)) {
      onError(`Symbol not found: ${symbolName}`)
      return
    }

    const symbolInfo: LibrarySymbolInfo = {
      name: symbolName,
      ticker: symbolName,
      description: `${symbolName} Price`,
      type: 'crypto',
      exchange: 'Crypto',
      listed_exchange: 'Crypto',
      session: '24x7',
      timezone: 'Etc/UTC',
      minmov: 1,
      pricescale: symbolName !== 'moPEPE' ? 10 : 1000000,
      has_intraday: true,
      has_weekly_and_monthly: false,
      volume_precision: 8,
      data_status: 'streaming',
      currency_code: 'USD',
      format: 'price',
    }

    onResolve(symbolInfo)
  }

  private async fetchAllData(symbol: string): Promise<{ raw: TokenData[]; mo: TokenData[] }> {
    if (this.cachedData.has(symbol)) {
      return this.cachedData.get(symbol)!
    }

    const response = await fetch(
      `${this.baseUrl}/fetch-token-data?token=mo${symbol == 'PEPE' ? '1000PEPE' : symbol == 'wETH' ? 'ETH' : symbol == 'cbBTC' ? 'BTC' : symbol}`,
    )
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const rawData: TokenData[] = await response.json()

    const moData: TokenData[] = rawData.map((item) => {
      const assetPrice = Number(item.close_price) // Convert close_price to number
      const assetReturn = Number(item.cum_return) || 0 // Handle null values
      const signalReturn = Number(item.cum_signal_return) || 0

      const moPrice = (assetPrice * (1 + signalReturn)) / (1 + assetReturn)

      return {
        date: item.date,
        close_price: moPrice.toFixed(8), // Format to 8 decimal places
        return: null,
        signal: null,
        position: null,
        signal_return: null,
        cum_return: null,
        cum_signal_return: null,
      }
    })

    const data = { raw: rawData, mo: moData }
    this.cachedData.set(symbol, data)
    return data
  }

  async getBars(
    symbolInfo: LibrarySymbolInfo,
    resolution: ResolutionString,
    periodParams: PeriodParams,
    onResult: (bars: Bar[], meta: { noData?: boolean }) => void,
    onError: (error: string) => void,
  ): Promise<void> {
    try {
      const baseSymbol = symbolInfo.name.startsWith(this.customPrefix)
        ? symbolInfo.name.slice(this.customPrefix.length)
        : symbolInfo.name

      const data = await this.fetchAllData(baseSymbol)
      const relevantData = symbolInfo.name.startsWith(this.customPrefix) ? data.mo : data.raw

      const filteredData = relevantData.filter((item) => {
        const timestamp = new Date(item.date).getTime() // Ensure date is parsed correctly
        return timestamp >= periodParams.from * 1000 && timestamp <= periodParams.to * 1000
      })

      if (filteredData.length === 0) {
        onResult([], { noData: true })
        return
      }

      const sortedData = filteredData.sort((a, b) => {
        const timeA = new Date(a.date).getTime()
        const timeB = new Date(b.date).getTime()
        return timeA - timeB
      })

      const bars: Bar[] = sortedData.map((item) => ({
        time: new Date(item.date).getTime(), // Ensure time is in milliseconds
        open: parseFloat(item.close_price),
        high: parseFloat(item.close_price),
        low: parseFloat(item.close_price),
        close: parseFloat(item.close_price),
      }))

      onResult(bars, { noData: false })
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      onError(`Failed to load bars: ${error.message}`)
    }
  }

  subscribeBars(): void {
    // Implement real-time updates if required
  }

  unsubscribeBars(): void {
    // Cleanup subscriptions
  }
}
