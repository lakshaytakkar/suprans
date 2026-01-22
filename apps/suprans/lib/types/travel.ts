export interface TravelPackage {
  id: string
  title: string
  destinations: string[]
  duration: string
  price: number
  originalPrice?: number
  image: string
  description: string
  inclusions: string[]
  dates?: string
  category: 'canton-fair' | 'market-tours' | 'factory-visits'
}

export type TravelFilter = 'All' | 'Canton Fair' | 'Market Tours' | 'Factory Visits'


