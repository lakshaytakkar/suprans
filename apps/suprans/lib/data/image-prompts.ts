/**
 * Image Prompts for Gemini Image Generation
 * All prompts follow: realistic hybrid photography, professional business photography style
 * Context-specific, nuanced variety, high quality, detailed
 */

export interface ImagePrompt {
  id: string
  path: string
  prompt: string
  context: string
  dimensions: { width: number; height: number }
  style: string
  colorScheme: string
}

export const imagePrompts: ImagePrompt[] = [
  // Hero Section
  {
    id: "hero-main",
    path: "/assets/images/hero-entrepreneur-success.jpg",
    prompt: "Successful Indian entrepreneur working on global business setup, modern office with laptop showing international business dashboard, confident professional pose, red and yellow accent colors in background, realistic hybrid photography, professional business photography, optimistic and ambitious mood, warm lighting, high quality detailed",
    context: "Hero section main image - shows success and professionalism",
    dimensions: { width: 1200, height: 800 },
    style: "Professional business photography with lifestyle elements",
    colorScheme: "Red (#dc2626) and Yellow (#facc15) accents on white/light background",
  },
  {
    id: "hero-background",
    path: "/assets/images/hero-background-global.png",
    prompt: "Abstract global business network visualization, world map with connection lines, modern office environment blurred in background, red and yellow gradient overlays, professional business photography style, dynamic and energetic mood, high quality",
    context: "Hero section blurred background",
    dimensions: { width: 1920, height: 1080 },
    style: "Abstract business visualization",
    colorScheme: "Red and yellow gradients",
  },

  // Stats Section
  {
    id: "stat-entrepreneurs",
    path: "/assets/images/stat-entrepreneurs-guided.png",
    prompt: "Diverse group of Indian entrepreneurs in business meeting, collaborative workspace, people of different ages and backgrounds working together, modern office setting, realistic hybrid photography, professional business photography, collaborative and supportive mood, natural lighting, high quality detailed",
    context: "BusinessStats - Entrepreneurs Guided stat",
    dimensions: { width: 400, height: 400 },
    style: "Professional group business photography",
    colorScheme: "Warm tones with red accents",
  },
  {
    id: "stat-businesses",
    path: "/assets/images/stat-successful-businesses.png",
    prompt: "Multiple successful business logos and certificates on wall, modern office with growth charts, achievement awards displayed, professional business photography, success and achievement mood, bright professional lighting, high quality",
    context: "BusinessStats - Successful Businesses stat",
    dimensions: { width: 400, height: 400 },
    style: "Professional achievement photography",
    colorScheme: "Professional blue and red accents",
  },
  {
    id: "stat-products",
    path: "/assets/images/stat-products-imported.png",
    prompt: "Warehouse with imported products from China, shipping containers, quality inspection in progress, modern logistics facility, realistic hybrid photography, professional business photography, efficient and organized mood, industrial lighting, high quality detailed",
    context: "BusinessStats - Products Imported stat",
    dimensions: { width: 400, height: 400 },
    style: "Industrial business photography",
    colorScheme: "Industrial grays with red accents",
  },
  {
    id: "stat-rating",
    path: "/assets/images/stat-customer-satisfaction.png",
    prompt: "Happy customer giving 5-star review on mobile phone, satisfied entrepreneur with thumbs up, modern office background, realistic hybrid photography, professional business photography, positive and satisfied mood, warm friendly lighting, high quality",
    context: "BusinessStats - Average Rating stat",
    dimensions: { width: 400, height: 400 },
    style: "Lifestyle business photography",
    colorScheme: "Warm tones with yellow accents",
  },

  // Opportunity Section
  {
    id: "opportunity-global-businesses",
    path: "/assets/images/opportunity-global-businesses.png",
    prompt: "Multiple global business setups on world map, entrepreneurs from different countries, international business growth visualization, modern office with global connections, realistic hybrid photography, professional business photography, opportunity and growth mood, dynamic lighting, high quality detailed",
    context: "OpportunitySection - 900,000+ New Global Businesses card",
    dimensions: { width: 1024, height: 576 },
    style: "Conceptual business growth photography",
    colorScheme: "Global blue and red accents",
  },
  {
    id: "opportunity-monthly-revenue",
    path: "/assets/images/opportunity-monthly-revenue.png",
    prompt: "Successful entrepreneur celebrating monthly revenue milestone, laptop showing profit charts, Indian currency notes and coins, modern home office, realistic hybrid photography, professional business photography, success and achievement mood, warm celebratory lighting, high quality",
    context: "OpportunitySection - ₹15+ Lakh Monthly Revenue card",
    dimensions: { width: 1024, height: 576 },
    style: "Lifestyle success photography",
    colorScheme: "Warm tones with yellow and red",
  },
  {
    id: "opportunity-us-llc",
    path: "/assets/images/opportunity-us-llc-advantage.png",
    prompt: "US LLC certificate and documents, Indian entrepreneur holding US business documents, modern office with global business setup, comparison showing local vs global business, realistic hybrid photography, professional business photography, professional and credible mood, bright professional lighting, high quality",
    context: "OpportunitySection - US LLC is Gold vs Local Business card",
    dimensions: { width: 1024, height: 576 },
    style: "Professional document photography",
    colorScheme: "Professional blue and red",
  },
  {
    id: "opportunity-india-potential",
    path: "/assets/images/opportunity-india-potential.png",
    prompt: "India map with global business opportunities highlighted, entrepreneurs across India, untapped market potential visualization, modern business growth charts, realistic hybrid photography, professional business photography, opportunity and potential mood, optimistic lighting, high quality",
    context: "OpportunitySection - India's Untapped Global Potential card",
    dimensions: { width: 1024, height: 576 },
    style: "Conceptual opportunity photography",
    colorScheme: "Indian flag colors with business blue",
  },

  // Comparison Section
  {
    id: "comparison-traditional",
    path: "/assets/images/comparison-traditional-approach.png",
    prompt: "Traditional local business struggling, small shop with limited customers, price war scenario, cramped workspace, realistic hybrid photography, professional business photography, challenging and constrained mood, dim lighting, high quality",
    context: "ComparisonSection - Traditional/Local Approach visual",
    dimensions: { width: 800, height: 600 },
    style: "Documentary business photography",
    colorScheme: "Muted grays and browns",
  },
  {
    id: "comparison-suprans",
    path: "/assets/images/comparison-suprans-approach.png",
    prompt: "Successful global business with Suprans support, modern international office, global connections, high profit margins visualization, confident entrepreneur, realistic hybrid photography, professional business photography, success and growth mood, bright professional lighting, high quality",
    context: "ComparisonSection - Suprans Global Approach visual",
    dimensions: { width: 800, height: 600 },
    style: "Professional success photography",
    colorScheme: "Bright with red and yellow accents",
  },

  // Services Section
  {
    id: "service-us-llc",
    path: "/assets/images/service-us-llc-formation.png",
    prompt: "US LLC formation documents and process, Indian entrepreneur receiving US business documents, legal compliance visualization, modern office with legal documents, realistic hybrid photography, professional business photography, professional and trustworthy mood, bright legal office lighting, high quality detailed",
    context: "ServicesSection - US LLC Formation service card",
    dimensions: { width: 1024, height: 576 },
    style: "Professional legal business photography",
    colorScheme: "Professional blue and red",
  },
  {
    id: "service-brand-development",
    path: "/assets/images/service-brand-development.png",
    prompt: "Brand development process, logo design on computer, brand identity elements, creative workspace with brand materials, realistic hybrid photography, professional business photography, creative and innovative mood, bright creative studio lighting, high quality",
    context: "ServicesSection - Brand Development service card",
    dimensions: { width: 1024, height: 576 },
    style: "Creative business photography",
    colorScheme: "Creative colors with red accents",
  },
  {
    id: "service-dropshipping",
    path: "/assets/images/service-dropshipping.png",
    prompt: "Dropshipping fulfillment center, products being packed for shipping, China import warehouse, efficient logistics operation, realistic hybrid photography, professional business photography, efficient and organized mood, industrial warehouse lighting, high quality",
    context: "ServicesSection - Dropshipping service card",
    dimensions: { width: 1024, height: 576 },
    style: "Industrial logistics photography",
    colorScheme: "Industrial with red accents",
  },
  {
    id: "service-video-consultations",
    path: "/assets/images/service-video-consultations.png",
    prompt: "Professional video consultation setup, entrepreneur on video call with business expert, modern home office, laptop with video call interface, realistic hybrid photography, professional business photography, professional and supportive mood, warm office lighting, high quality",
    context: "ServicesSection - Video Consultations service card",
    dimensions: { width: 1024, height: 576 },
    style: "Modern remote work photography",
    colorScheme: "Warm office tones",
  },
  {
    id: "service-canton-fair",
    path: "/assets/images/service-canton-fair-travel.png",
    prompt: "Canton Fair trade show, Indian entrepreneurs at China trade fair, business networking, product sourcing at exhibition, realistic hybrid photography, professional business photography, opportunity and networking mood, bright exhibition hall lighting, high quality",
    context: "ServicesSection - Canton Fair Travel service card",
    dimensions: { width: 1024, height: 576 },
    style: "Event business photography",
    colorScheme: "Bright exhibition colors",
  },

  // Customer Stories
  {
    id: "testimonial-1",
    path: "/assets/images/testimonial-success-story-1.png",
    prompt: "Successful Indian entrepreneur portrait, confident business owner, modern office background, professional headshot, realistic hybrid photography, professional business photography, confident and successful mood, professional studio lighting, high quality",
    context: "CustomerStories - Testimonial video thumbnail 1",
    dimensions: { width: 640, height: 360 },
    style: "Professional portrait photography",
    colorScheme: "Professional with red accents",
  },
  {
    id: "testimonial-2",
    path: "/assets/images/testimonial-success-story-2.png",
    prompt: "Young successful entrepreneur celebrating business milestone, modern office, achievement moment, realistic hybrid photography, professional business photography, celebratory and successful mood, warm lighting, high quality",
    context: "CustomerStories - Testimonial video thumbnail 2",
    dimensions: { width: 640, height: 360 },
    style: "Lifestyle success photography",
    colorScheme: "Warm tones",
  },
  {
    id: "testimonial-3",
    path: "/assets/images/testimonial-success-story-3.png",
    prompt: "Female entrepreneur working on global business, professional workspace, confident pose, realistic hybrid photography, professional business photography, professional and confident mood, bright office lighting, high quality",
    context: "CustomerStories - Testimonial video thumbnail 3",
    dimensions: { width: 640, height: 360 },
    style: "Professional business portrait",
    colorScheme: "Professional with warm accents",
  },
  {
    id: "testimonial-4",
    path: "/assets/images/testimonial-success-story-4.png",
    prompt: "Entrepreneur showing business growth charts, successful business metrics, modern office, realistic hybrid photography, professional business photography, achievement and growth mood, professional lighting, high quality",
    context: "CustomerStories - Testimonial video thumbnail 4",
    dimensions: { width: 640, height: 360 },
    style: "Professional achievement photography",
    colorScheme: "Professional blue and red",
  },
  {
    id: "testimonial-5",
    path: "/assets/images/testimonial-success-story-5.png",
    prompt: "Entrepreneur with US LLC certificate, celebrating international business success, modern office, realistic hybrid photography, professional business photography, proud and successful mood, warm lighting, high quality",
    context: "CustomerStories - Testimonial video thumbnail 5",
    dimensions: { width: 640, height: 360 },
    style: "Professional success photography",
    colorScheme: "Warm professional tones",
  },
  {
    id: "testimonial-6",
    path: "/assets/images/testimonial-success-story-6.png",
    prompt: "Entrepreneur managing dropshipping business, warehouse background, successful e-commerce operation, realistic hybrid photography, professional business photography, efficient and successful mood, industrial lighting, high quality",
    context: "CustomerStories - Testimonial video thumbnail 6",
    dimensions: { width: 640, height: 360 },
    style: "Industrial business photography",
    colorScheme: "Industrial with success accents",
  },

  // Founder Story
  {
    id: "founder-portrait",
    path: "/assets/images/founder-portrait-professional.png",
    prompt: "Professional portrait of Indian business founder, confident entrepreneur, modern office background, professional headshot, realistic hybrid photography, professional business photography, confident and visionary mood, professional studio lighting, high quality detailed",
    context: "FoundersNote - Founder professional portrait",
    dimensions: { width: 800, height: 1000 },
    style: "Professional executive portrait",
    colorScheme: "Professional with red accents",
  },
  {
    id: "founder-journey",
    path: "/assets/images/founder-journey-story.png",
    prompt: "Founder's business journey visualization, from struggle to success, timeline of business growth, modern office showing evolution, realistic hybrid photography, professional business photography, inspirational and determined mood, warm lighting, high quality",
    context: "FoundersNote - Founder journey background",
    dimensions: { width: 1200, height: 600 },
    style: "Narrative business photography",
    colorScheme: "Warm inspirational tones",
  },

  // Process/Steps Section
  {
    id: "process-step-1",
    path: "/assets/images/process-consultation.png",
    prompt: "Initial business consultation, entrepreneur meeting with expert, modern office, discussion and planning, realistic hybrid photography, professional business photography, collaborative and planning mood, bright office lighting, high quality",
    context: "ProcessVisual - Step 1 Consultation",
    dimensions: { width: 600, height: 400 },
    style: "Professional meeting photography",
    colorScheme: "Professional office tones",
  },
  {
    id: "process-step-2",
    path: "/assets/images/process-setup.png",
    prompt: "Business setup process, legal documents and paperwork, LLC formation in progress, organized workspace, realistic hybrid photography, professional business photography, organized and professional mood, bright office lighting, high quality",
    context: "ProcessVisual - Step 2 Business Setup",
    dimensions: { width: 600, height: 400 },
    style: "Professional setup photography",
    colorScheme: "Professional legal tones",
  },
  {
    id: "process-step-3",
    path: "/assets/images/process-sourcing.png",
    prompt: "Product sourcing process, China import inspection, quality check, warehouse operation, realistic hybrid photography, professional business photography, efficient and quality-focused mood, industrial lighting, high quality",
    context: "ProcessVisual - Step 3 Product Sourcing",
    dimensions: { width: 600, height: 400 },
    style: "Industrial quality photography",
    colorScheme: "Industrial with quality accents",
  },
  {
    id: "process-step-4",
    path: "/assets/images/process-launch.png",
    prompt: "Business launch celebration, successful entrepreneur launching global business, modern office celebration, achievement moment, realistic hybrid photography, professional business photography, celebratory and successful mood, warm lighting, high quality",
    context: "ProcessVisual - Step 4 Launch & Growth",
    dimensions: { width: 600, height: 400 },
    style: "Celebration success photography",
    colorScheme: "Warm celebratory tones",
  },

  // Image Gallery Section
  {
    id: "gallery-global-office",
    path: "/assets/images/gallery-global-office.png",
    prompt: "Modern global business office, international team working, diverse entrepreneurs collaborating, modern workspace, realistic hybrid photography, professional business photography, collaborative and global mood, bright modern office lighting, high quality",
    context: "ImageGallery - Global office showcase",
    dimensions: { width: 800, height: 600 },
    style: "Modern workspace photography",
    colorScheme: "Modern office with red accents",
  },
  {
    id: "gallery-success-metrics",
    path: "/assets/images/gallery-success-metrics.png",
    prompt: "Business success metrics dashboard, growth charts, revenue visualization, modern analytics display, realistic hybrid photography, professional business photography, success and data-driven mood, bright screen lighting, high quality",
    context: "ImageGallery - Success metrics visualization",
    dimensions: { width: 800, height: 600 },
    style: "Data visualization photography",
    colorScheme: "Professional dashboard colors",
  },
  {
    id: "gallery-team-support",
    path: "/assets/images/gallery-team-support.png",
    prompt: "Suprans team supporting entrepreneurs, expert consultation, collaborative workspace, professional support team, realistic hybrid photography, professional business photography, supportive and professional mood, warm office lighting, high quality",
    context: "ImageGallery - Team support showcase",
    dimensions: { width: 800, height: 600 },
    style: "Professional team photography",
    colorScheme: "Warm professional tones",
  },
]

/**
 * Get image prompt by ID
 */
export function getImagePrompt(id: string): ImagePrompt | undefined {
  return imagePrompts.find((prompt) => prompt.id === id)
}

/**
 * Get image prompts by context
 */
export function getImagePromptsByContext(context: string): ImagePrompt[] {
  return imagePrompts.filter((prompt) => prompt.context.includes(context))
}

