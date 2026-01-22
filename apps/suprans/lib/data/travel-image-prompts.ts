/**
 * Image generation prompts for travel packages
 * These prompts will be used with the Gemini image generation script
 */

export interface TravelImagePrompt {
  packageId: string
  prompt: string
  context: string
  filename: string
}

export const travelImagePrompts: TravelImagePrompt[] = [
  {
    packageId: 'canton-phase-1',
    filename: 'canton-phase-1.jpg',
    context: 'Canton Fair Phase 1 - Electronics and Machinery trade fair',
    prompt: 'Professional photography of Canton Fair trade show floor showcasing electronics, machinery, and home appliances. Modern exhibition hall with bright lighting, business professionals networking, Chinese and international exhibitors. Include red accent colors matching Suprans branding. High-quality business photography style, vibrant colors, professional atmosphere.',
  },
  {
    packageId: 'canton-phase-2',
    filename: 'canton-phase-2.jpg',
    context: 'Canton Fair Phase 2 - Consumer Goods and Gifts',
    prompt: 'Professional photography of Canton Fair consumer goods section showing gifts, home decorations, and building materials. Colorful product displays, international buyers examining products, modern trade fair environment. Include red accent colors matching Suprans branding. High-quality business photography, vibrant product showcase, professional trade fair atmosphere.',
  },
  {
    packageId: 'canton-phase-3',
    filename: 'canton-phase-3.jpg',
    context: 'Canton Fair Phase 3 - Fashion and Textiles',
    prompt: 'Professional photography of Canton Fair fashion and textiles section. Fashion displays, textile samples, garment showcases, shoes and accessories. International buyers and exhibitors, modern trade fair setting. Include red accent colors matching Suprans branding. High-quality fashion photography style, vibrant textiles, professional business atmosphere.',
  },
  {
    packageId: 'foshan-furniture-lighting',
    filename: 'foshan-furniture.jpg',
    context: 'Foshan Furniture and Lighting Market',
    prompt: 'Professional photography of Foshan furniture market in China. Large furniture showroom with modern and traditional furniture pieces, lighting fixtures, ceramic products. Business professionals examining products, large market halls, manufacturing district atmosphere. Include red accent colors matching Suprans branding. High-quality commercial photography, vibrant furniture displays, professional sourcing environment.',
  },
  {
    packageId: 'wuxi-ev-battery',
    filename: 'wuxi-ev.jpg',
    context: 'Wuxi EV and Battery Manufacturing',
    prompt: 'Professional photography of electric vehicle and battery manufacturing facility in Wuxi, China. Modern factory floor with EV components, battery production lines, electric scooters. Industrial setting with clean modern facilities, business professionals touring factory. Include red accent colors matching Suprans branding. High-quality industrial photography, modern manufacturing, professional business tour atmosphere.',
  },
  {
    packageId: 'yiwu-shanghai',
    filename: 'yiwu-shanghai.jpg',
    context: 'Yiwu Wholesale Market and Shanghai',
    prompt: 'Professional photography combining Yiwu wholesale market and Shanghai business district. Yiwu market with diverse products, wholesale stalls, busy trading environment. Shanghai skyline with modern business buildings. International buyers sourcing products, vibrant market atmosphere. Include red accent colors matching Suprans branding. High-quality business photography, vibrant market scenes, professional sourcing environment.',
  },
  {
    packageId: 'hong-kong-canton-exclusive',
    filename: 'hong-kong-canton.jpg',
    context: 'Hong Kong and Canton Exclusive Package',
    prompt: 'Professional photography combining Hong Kong cityscape with Canton Fair. Hong Kong skyline with modern skyscrapers, Victoria Harbour. Canton Fair exhibition center, business professionals networking, premium travel experience. Include red accent colors matching Suprans branding. High-quality travel photography, luxury business travel, professional premium experience.',
  },
]

export function getPromptByPackageId(packageId: string): TravelImagePrompt | undefined {
  return travelImagePrompts.find((prompt) => prompt.packageId === packageId)
}


