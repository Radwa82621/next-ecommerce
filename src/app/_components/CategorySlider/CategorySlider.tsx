

import { getAllCategories } from "@/api/getAllCategories";
import CategoriesSwipers from "../categoriesSwiper/categoriesSwipers";
export default async function CategorySlider() {
let categories = await getAllCategories()

  
  return (
<>
<CategoriesSwipers  categories={categories}/>
</>
  );
}
