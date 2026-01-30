import React from 'react'
import { getAllBrands } from '@/api/getAllBrands'
import BrandsClient from './BrandsClient'

export default async function BrandsPage() {
  const brands = await getAllBrands()

  return (
    <div className="py-8">
      <h1 className="text-3xl font-bold mb-8">All Brands</h1>
      {brands && <BrandsClient brands={brands} />}
    </div>
  )
}