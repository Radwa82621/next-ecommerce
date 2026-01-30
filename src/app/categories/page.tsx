import React from 'react'
import { getAllCategories } from '@/api/getAllCategories'
import CategoriesClient from './CategoriesClient'

export default async function CategoriesPage() {
  const categories = await getAllCategories()

  return (
    <div className="py-8">
      <h1 className="text-3xl font-bold mb-8">Browse Categories</h1>
     {categories&& <CategoriesClient categories={categories} />}
    </div>
  )
}