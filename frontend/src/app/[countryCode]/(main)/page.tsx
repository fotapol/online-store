import { Metadata } from "next"
import { Suspense } from "react"
import FeaturedProducts from "@modules/home/components/featured-products"
import { listCollections } from "@lib/data/collections"
import { getRegion } from "@lib/data/regions"

export const metadata: Metadata = {
  title: "Esthetique Concrete Store",
  description: "Minimalist concrete statues and decor.",
}

export default async function Home(props: {
  params: Promise<{ countryCode: string }>
}) {
  const params = await props.params
  const { countryCode } = params
  const region = await getRegion(countryCode)

  const { collections } = await listCollections({
    fields: "id, handle, title",
  })

  if (!collections || !region) {
    return null
  }

  return (
    <div className="bg-background min-h-screen">
      {/* HERO SECTION */}
      <div className="relative w-full h-[75vh] flex items-center justify-center overflow-hidden bg-secondary">
        {/* <Image src="/hero-bg.jpg" alt="Hero" fill className="object-cover opacity-40" /> */}
        
        <div className="relative z-10 text-center px-4 max-w-4xl animate-in fade-in zoom-in duration-1000">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-foreground mb-6 uppercase">
            Esthetique <br /> Concrete
          </h1>
          <p className="text-lg md:text-xl text-primary mb-10 font-light tracking-wide max-w-2xl mx-auto">
            Heavy art form. Handcrafted concrete sculptures for your interior.
          </p>
          <a 
            href="/store" 
            className="inline-block bg-foreground text-white px-10 py-4 text-sm font-medium tracking-[0.2em] uppercase hover:bg-primary transition-all hover:scale-105"
          >
            Shop Collection
          </a>
        </div>
      </div>

      <div className="py-12 px-4 max-w-[1440px] mx-auto">
        <div className="flex flex-col gap-y-10">
          <div className="flex justify-between items-end border-b border-gray-200">
            <h2 className="text-3xl font-bold text-foreground tracking-tight">
              Curated Collections
            </h2>
            <a href="/store" className="text-sm text-primary hover:text-foreground transition-colors underline decoration-gray-300 underline-offset-4">
              View all
            </a>
          </div>
          
          <ul className="flex flex-col gap-x-6">
            <Suspense fallback={<div className="text-center py-10">Loading showcase...</div>}>
              <FeaturedProducts collections={collections} region={region} />
            </Suspense>
          </ul>
        </div>
      </div>
    </div>
  )
}
