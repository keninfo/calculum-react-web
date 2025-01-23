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
}

export class CustomUDFDatafeed {
  private baseUrl: string
  private cachedData: Map<string, TokenData[]> = new Map()
  private availableSymbols: string[] = ['moBTC', 'moETH']

  constructor() {
    this.baseUrl = '/api'
  }

  searchSymbols(symbol: string, type: string, resolution: string, callback: (results: SearchResult[]) => void): void {
    const results: SearchResult[] = this.availableSymbols
      .filter((symbolItem) => symbolItem.toLowerCase().includes(symbol.toLowerCase()))
      .map((symbolItem) => ({
        symbol: symbolItem,
        full_name: symbolItem,
        description: `${symbolItem} Price`,
        exchange: 'Crypto',
        type: 'crypto',
      }))

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
    setTimeout(() => {
      if (!this.availableSymbols.includes(symbolName)) {
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
        pricescale: 100000000,
        has_intraday: true,
        has_weekly_and_monthly: false,
        volume_precision: 8,
        data_status: 'streaming',
        currency_code: 'USD',
        format: 'price', // Include required format property
      }

      onResolve(symbolInfo)
    }, 0)
  }

  private async fetchAllData(symbol: string): Promise<TokenData[]> {
    if (this.cachedData.has(symbol)) {
      return this.cachedData.get(symbol)!
    }

    const response = await fetch(`${this.baseUrl}/fetch-token-data?token=${symbol}`)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data: TokenData[] = await response.json()
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
      const data: TokenData[] = await this.fetchAllData(symbolInfo.name)

      // Filter the data based on the requested time range
      const filteredData = data.filter((item: TokenData) => {
        const timestamp = new Date(item.date).getTime()
        return timestamp >= periodParams.from * 1000 && timestamp <= periodParams.to * 1000
      })

      if (filteredData.length === 0) {
        onResult([], { noData: true })
        return
      }

      // Sort and map the data to TradingView's Bar type
      const sortedData = filteredData.sort((a, b) => {
        const timeA = new Date(a.date).getTime()
        const timeB = new Date(b.date).getTime()
        return timeA - timeB
      })

      const bars: Bar[] = sortedData.map((item) => ({
        time: new Date(item.date).getTime(),
        open: parseFloat(item.close_price),
        high: parseFloat(item.close_price),
        low: parseFloat(item.close_price),
        close: parseFloat(item.close_price),
        // Uncomment and map volume if available
        // volume: parseFloat(item.position || '0'),
      }))

      onResult(bars, { noData: false })
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      onError(`Failed to load bars: ${error.message}`)
    }
  }

  subscribeBars(): void {
    // Real-time updates implementation
  }

  unsubscribeBars(): void {
    // Cleanup
  }
}
