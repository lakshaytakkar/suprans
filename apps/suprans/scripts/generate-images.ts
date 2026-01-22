/**
 * Gemini Image Generation Script
 * Uses Google's latest Gemini 2.0 Flash model for image generation
 *
 * Usage:
 *   bun run scripts/generate-images.ts                    # Generate hero-main only
 *   bun run scripts/generate-images.ts single hero-main   # Generate specific image
 *   bun run scripts/generate-images.ts all                # Generate ALL images
 */

import { writeFile, mkdir, readFile } from "fs/promises"
import { existsSync } from "fs"
import path from "path"
import { travelImagePrompts } from "../lib/data/travel-image-prompts"

// Load .env.local file
const envPath = path.join(process.cwd(), ".env.local")
let GEMINI_API_KEY = process.env.GEMINI_API_KEY

if (!GEMINI_API_KEY && existsSync(envPath)) {
  const envContent = await readFile(envPath, "utf-8")
  const match = envContent.match(/^GEMINI_API_KEY=(.+)$/m)
  if (match) {
    GEMINI_API_KEY = match[1].trim()
  }
}

if (!GEMINI_API_KEY) {
  console.error("Error: GEMINI_API_KEY not found")
  process.exit(1)
}

// All image prompts
interface ImagePrompt {
  id: string
  path: string
  prompt: string
  context: string
}

const imagePrompts: ImagePrompt[] = [
  // Hero Section
  {
    id: "hero-main",
    path: "/assets/images/hero-entrepreneur-success.jpg",
    prompt: "Successful Indian entrepreneur working on global business setup, modern office with laptop showing international business dashboard, confident professional pose, red and yellow accent colors in background, realistic photography, professional business photography, optimistic mood, warm lighting, high quality detailed",
    context: "Hero main",
  },
  {
    id: "hero-background",
    path: "/assets/images/hero-background-global.jpg",
    prompt: "Abstract global business network visualization, world map with connection lines, modern office environment blurred in background, red and yellow gradient overlays, professional business photography style, dynamic mood, high quality",
    context: "Hero background",
  },

  // Stats Section
  {
    id: "stat-entrepreneurs",
    path: "/assets/images/stat-entrepreneurs-guided.jpg",
    prompt: "Diverse group of Indian entrepreneurs in business meeting, collaborative workspace, people of different ages working together, modern office, realistic photography, professional business photography, collaborative mood, natural lighting, high quality",
    context: "Stats - Entrepreneurs",
  },
  {
    id: "stat-businesses",
    path: "/assets/images/stat-successful-businesses.jpg",
    prompt: "Successful business certificates on wall, modern office with growth charts, achievement awards displayed, professional business photography, success mood, bright lighting, high quality",
    context: "Stats - Businesses",
  },
  {
    id: "stat-products",
    path: "/assets/images/stat-products-imported.jpg",
    prompt: "Warehouse with imported products from China, shipping containers, quality inspection, modern logistics facility, realistic photography, professional business photography, efficient mood, industrial lighting, high quality",
    context: "Stats - Products",
  },
  {
    id: "stat-rating",
    path: "/assets/images/stat-customer-satisfaction.jpg",
    prompt: "Happy customer giving 5-star review on mobile phone, satisfied entrepreneur with thumbs up, modern office background, realistic photography, professional business photography, positive mood, warm lighting, high quality",
    context: "Stats - Rating",
  },

  // Opportunity Section
  {
    id: "opportunity-global-businesses",
    path: "/assets/images/opportunity-global-businesses.jpg",
    prompt: "Global business setups on world map, entrepreneurs from different countries, international business growth visualization, modern office, realistic photography, professional business photography, growth mood, dynamic lighting, high quality",
    context: "Opportunity - Global",
  },
  {
    id: "opportunity-monthly-revenue",
    path: "/assets/images/opportunity-monthly-revenue.jpg",
    prompt: "Entrepreneur celebrating revenue milestone, laptop showing profit charts, Indian currency notes, modern home office, realistic photography, professional business photography, success mood, warm lighting, high quality",
    context: "Opportunity - Revenue",
  },
  {
    id: "opportunity-us-llc",
    path: "/assets/images/opportunity-us-llc-advantage.jpg",
    prompt: "US LLC certificate and documents, Indian entrepreneur holding US business documents, modern office with global business setup, realistic photography, professional business photography, credible mood, bright lighting, high quality",
    context: "Opportunity - US LLC",
  },
  {
    id: "opportunity-india-potential",
    path: "/assets/images/opportunity-india-potential.jpg",
    prompt: "India map with global business opportunities, entrepreneurs across India, market potential visualization, business growth charts, realistic photography, professional business photography, opportunity mood, optimistic lighting, high quality",
    context: "Opportunity - India",
  },

  // Comparison Section
  {
    id: "comparison-traditional",
    path: "/assets/images/comparison-traditional-approach.jpg",
    prompt: "Traditional local business struggling, small shop with limited customers, cramped workspace, realistic photography, professional business photography, challenging mood, dim lighting, high quality",
    context: "Comparison - Traditional",
  },
  {
    id: "comparison-suprans",
    path: "/assets/images/comparison-suprans-approach.jpg",
    prompt: "Successful global business, modern international office, global connections, high profit visualization, confident entrepreneur, realistic photography, professional business photography, success mood, bright lighting, high quality",
    context: "Comparison - Suprans",
  },

  // Services Section
  {
    id: "service-us-llc",
    path: "/assets/images/service-us-llc-formation.jpg",
    prompt: "US LLC formation documents, Indian entrepreneur receiving US business documents, legal compliance visualization, modern office with legal documents, realistic photography, professional business photography, trustworthy mood, bright lighting, high quality",
    context: "Service - US LLC",
  },
  {
    id: "service-brand-development",
    path: "/assets/images/service-brand-development.jpg",
    prompt: "Brand development process, logo design on computer, brand identity elements, creative workspace with brand materials, realistic photography, professional business photography, creative mood, studio lighting, high quality",
    context: "Service - Brand",
  },
  {
    id: "service-dropshipping",
    path: "/assets/images/service-dropshipping.jpg",
    prompt: "Dropshipping fulfillment center, products being packed for shipping, China import warehouse, efficient logistics, realistic photography, professional business photography, efficient mood, industrial lighting, high quality",
    context: "Service - Dropshipping",
  },
  {
    id: "service-video-consultations",
    path: "/assets/images/service-video-consultations.jpg",
    prompt: "Professional video consultation, entrepreneur on video call with business expert, modern home office, laptop with video call, realistic photography, professional business photography, supportive mood, warm lighting, high quality",
    context: "Service - Video",
  },
  {
    id: "service-canton-fair",
    path: "/assets/images/service-canton-fair-travel.jpg",
    prompt: "Canton Fair trade show, Indian entrepreneurs at China trade fair, business networking, product sourcing at exhibition, realistic photography, professional business photography, networking mood, exhibition lighting, high quality",
    context: "Service - Canton",
  },

  // Testimonials
  {
    id: "testimonial-1",
    path: "/assets/images/testimonial-success-story-1.jpg",
    prompt: "Successful Indian entrepreneur portrait, confident business owner, modern office background, professional headshot, realistic photography, professional business photography, confident mood, studio lighting, high quality",
    context: "Testimonial 1",
  },
  {
    id: "testimonial-2",
    path: "/assets/images/testimonial-success-story-2.jpg",
    prompt: "Young entrepreneur celebrating business milestone, modern office, achievement moment, realistic photography, professional business photography, celebratory mood, warm lighting, high quality",
    context: "Testimonial 2",
  },
  {
    id: "testimonial-3",
    path: "/assets/images/testimonial-success-story-3.jpg",
    prompt: "Female entrepreneur working on global business, professional workspace, confident pose, realistic photography, professional business photography, confident mood, bright lighting, high quality",
    context: "Testimonial 3",
  },
  {
    id: "testimonial-4",
    path: "/assets/images/testimonial-success-story-4.jpg",
    prompt: "Entrepreneur showing business growth charts, successful metrics, modern office, realistic photography, professional business photography, achievement mood, professional lighting, high quality",
    context: "Testimonial 4",
  },
  {
    id: "testimonial-5",
    path: "/assets/images/testimonial-success-story-5.jpg",
    prompt: "Entrepreneur with US LLC certificate, celebrating international business success, modern office, realistic photography, professional business photography, proud mood, warm lighting, high quality",
    context: "Testimonial 5",
  },
  {
    id: "testimonial-6",
    path: "/assets/images/testimonial-success-story-6.jpg",
    prompt: "Entrepreneur managing dropshipping business, warehouse background, successful e-commerce, realistic photography, professional business photography, efficient mood, industrial lighting, high quality",
    context: "Testimonial 6",
  },

  // Founder
  {
    id: "founder-portrait",
    path: "/assets/images/founder-portrait-professional.jpg",
    prompt: "Professional portrait of Indian business founder, confident entrepreneur, modern office background, professional headshot, realistic photography, professional business photography, visionary mood, studio lighting, high quality",
    context: "Founder Portrait",
  },
  {
    id: "founder-journey",
    path: "/assets/images/founder-journey-story.jpg",
    prompt: "Founder business journey visualization, from struggle to success, timeline of business growth, modern office evolution, realistic photography, professional business photography, inspirational mood, warm lighting, high quality",
    context: "Founder Journey",
  },

  // Process Steps
  {
    id: "process-step-1",
    path: "/assets/images/process-consultation.jpg",
    prompt: "Initial business consultation, entrepreneur meeting with expert, modern office, discussion and planning, realistic photography, professional business photography, collaborative mood, bright lighting, high quality",
    context: "Process - Consultation",
  },
  {
    id: "process-step-2",
    path: "/assets/images/process-setup.jpg",
    prompt: "Business setup process, legal documents and paperwork, LLC formation in progress, organized workspace, realistic photography, professional business photography, organized mood, bright lighting, high quality",
    context: "Process - Setup",
  },
  {
    id: "process-step-3",
    path: "/assets/images/process-sourcing.jpg",
    prompt: "Product sourcing process, China import inspection, quality check, warehouse operation, realistic photography, professional business photography, quality-focused mood, industrial lighting, high quality",
    context: "Process - Sourcing",
  },
  {
    id: "process-step-4",
    path: "/assets/images/process-launch.jpg",
    prompt: "Business launch celebration, entrepreneur launching global business, modern office celebration, achievement moment, realistic photography, professional business photography, celebratory mood, warm lighting, high quality",
    context: "Process - Launch",
  },

  // Gallery
  {
    id: "gallery-global-office",
    path: "/assets/images/gallery-global-office.jpg",
    prompt: "Modern global business office, international team working, diverse entrepreneurs collaborating, modern workspace, realistic photography, professional business photography, collaborative mood, bright modern lighting, high quality",
    context: "Gallery - Office",
  },
  {
    id: "gallery-success-metrics",
    path: "/assets/images/gallery-success-metrics.jpg",
    prompt: "Business success metrics dashboard, growth charts, revenue visualization, modern analytics display, realistic photography, professional business photography, data-driven mood, bright screen lighting, high quality",
    context: "Gallery - Metrics",
  },
  {
    id: "gallery-team-support",
    path: "/assets/images/gallery-team-support.jpg",
    prompt: "Team supporting entrepreneurs, expert consultation, collaborative workspace, professional support team, realistic photography, professional business photography, supportive mood, warm lighting, high quality",
    context: "Gallery - Team",
  },
]

// Travel image prompts (from travel-image-prompts.ts)
const travelPrompts: ImagePrompt[] = travelImagePrompts.map((prompt) => ({
  id: prompt.packageId,
  path: `/assets/images/travel/${prompt.filename}`,
  prompt: prompt.prompt,
  context: prompt.context,
}))

const OUTPUT_DIR = path.join(process.cwd(), "public/assets/images")

/**
 * Generate image using Gemini 2.0 Flash (latest with image generation)
 */
async function generateImage(prompt: string): Promise<{ buffer: Buffer; mimeType: string } | null> {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${GEMINI_API_KEY}`

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: `Generate a high-quality, photorealistic image: ${prompt}` }] }],
        generationConfig: {
          temperature: 1,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 8192,
          responseModalities: ["text", "image"],
        },
      }),
    })

    if (!response.ok) {
      const error = await response.text()
      console.error(`  API Error ${response.status}: ${error.substring(0, 150)}`)
      return null
    }

    const data = await response.json()
    const parts = data.candidates?.[0]?.content?.parts

    if (parts) {
      for (const part of parts) {
        if (part.inlineData?.data) {
          return {
            buffer: Buffer.from(part.inlineData.data, "base64"),
            mimeType: part.inlineData.mimeType || "image/png",
          }
        }
      }
    }

    console.error("  No image in response")
    return null
  } catch (error) {
    console.error("  Error:", error)
    return null
  }
}

/**
 * Save image to file
 */
async function saveImage(buffer: Buffer, filePath: string, mimeType: string): Promise<string | null> {
  try {
    const ext = mimeType.includes("png") ? ".png" : mimeType.includes("webp") ? ".webp" : ".jpg"
    const baseName = path.basename(filePath, path.extname(filePath))
    const fullPath = path.join(OUTPUT_DIR, baseName + ext)

    if (!existsSync(OUTPUT_DIR)) {
      await mkdir(OUTPUT_DIR, { recursive: true })
    }

    await writeFile(fullPath, buffer)
    return fullPath
  } catch (error) {
    console.error("  Save error:", error)
    return null
  }
}

/**
 * Generate single image by ID
 */
async function generateSingleImage(promptId: string): Promise<boolean> {
  const data = imagePrompts.find((p) => p.id === promptId)

  if (!data) {
    console.error(`Prompt "${promptId}" not found`)
    console.log("Available:", imagePrompts.map((p) => p.id).join(", "))
    return false
  }

  console.log(`\n[${data.id}] ${data.context}`)
  console.log(`  Generating...`)

  const result = await generateImage(data.prompt)

  if (result) {
    const saved = await saveImage(result.buffer, data.path, result.mimeType)
    if (saved) {
      const sizeKB = (result.buffer.length / 1024).toFixed(0)
      console.log(`  ✓ Saved: ${path.basename(saved)} (${sizeKB} KB)`)
      return true
    }
  }

  console.log(`  ✗ Failed`)
  return false
}

/**
 * Generate all images
 */
async function generateAllImages(): Promise<void> {
  console.log(`\nGenerating ${imagePrompts.length} images...`)
  console.log(`Output: ${OUTPUT_DIR}\n`)

  let success = 0
  let failed = 0

  for (let i = 0; i < imagePrompts.length; i++) {
    const prompt = imagePrompts[i]
    console.log(`[${i + 1}/${imagePrompts.length}] ${prompt.id} - ${prompt.context}`)

    const result = await generateImage(prompt.prompt)

    if (result) {
      const saved = await saveImage(result.buffer, prompt.path, result.mimeType)
      if (saved) {
        const sizeKB = (result.buffer.length / 1024).toFixed(0)
        console.log(`  ✓ ${path.basename(saved)} (${sizeKB} KB)`)
        success++
      } else {
        console.log(`  ✗ Save failed`)
        failed++
      }
    } else {
      console.log(`  ✗ Generation failed`)
      failed++
    }

    // Rate limit: 3 second delay
    if (i < imagePrompts.length - 1) {
      await new Promise((r) => setTimeout(r, 3000))
    }
  }

  console.log(`\n=============================`)
  console.log(`✓ Success: ${success}`)
  console.log(`✗ Failed: ${failed}`)
  console.log(`=============================`)
}

// Main
const args = process.argv.slice(2)
const mode = args[0] || "single"
const target = args[1] || "hero-main"

console.log("=== Gemini Image Generator ===")
console.log(`Model: gemini-2.0-flash-exp`)
console.log(`API Key: ${GEMINI_API_KEY.substring(0, 15)}...`)

if (mode === "travel") {
  // Generate travel images
  console.log(`Generating ${travelPrompts.length} travel images...`)
  console.log(`Output: ${OUTPUT_DIR}/travel\n`)
  
  // Ensure travel directory exists
  const travelDir = path.join(OUTPUT_DIR, "travel")
  if (!existsSync(travelDir)) {
    await mkdir(travelDir, { recursive: true })
  }
  
  let success = 0
  let failed = 0
  
  for (let i = 0; i < travelPrompts.length; i++) {
    const prompt = travelPrompts[i]
    console.log(`[${i + 1}/${travelPrompts.length}] ${prompt.id} - ${prompt.context}`)
    
    const result = await generateImage(prompt.prompt)
    
    if (result) {
      // For travel images, save directly to travel subdirectory
      const ext = result.mimeType.includes("png") ? ".png" : result.mimeType.includes("webp") ? ".webp" : ".jpg"
      const baseName = path.basename(prompt.path, path.extname(prompt.path))
      const fullPath = path.join(travelDir, baseName + ext)
      
      await writeFile(fullPath, result.buffer)
      const sizeKB = (result.buffer.length / 1024).toFixed(0)
      console.log(`  ✓ ${path.basename(fullPath)} (${sizeKB} KB)`)
      success++
    } else {
      console.log(`  ✗ Generation failed`)
      failed++
    }
    
    // Rate limit: 3 second delay
    if (i < travelPrompts.length - 1) {
      await new Promise((r) => setTimeout(r, 3000))
    }
  }
  
  console.log(`\n=============================`)
  console.log(`✓ Success: ${success}`)
  console.log(`✗ Failed: ${failed}`)
  console.log(`=============================`)
} else if (mode === "all") {
  console.log(`Total prompts: ${imagePrompts.length}`)
  await generateAllImages()
} else {
  console.log(`Total prompts: ${imagePrompts.length}`)
  const ok = await generateSingleImage(target)
  process.exit(ok ? 0 : 1)
}
