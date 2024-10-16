"use client";
import { CrumbsLinks } from "@/components/shared/CrumbsLinks";
import Pagination from "@/components/shared/Pagination";
import { ProductCard } from "@/components/shared/product/ProductCard";
import { ProductFilter } from "@/components/shared/product/ProductFilter";
import { useCategoryData } from "@/hooks";
import Link from "next/link";

export default function CategoryId({ params }: { params: { id: string } }) {
  const { id } = params;

  const {
    status,
    message,
    category,
    products,
    totalPages,
    currentPage,
    parentCategory,
    setPage,
  } = useCategoryData(id);

  if (status === "loading" || status === "error" || status === "noData") {
    return (
      <p className={`text-${status === "error" ? "red" : "gray"}-500`}>
        {message}
      </p>
    );
  }

  return (
    <div className="mb-[75px]">
      <CrumbsLinks
        categoryName={parentCategory ? parentCategory.name : category?.name}
        categoryId={
          parentCategory ? parentCategory.id.toString() : category?.id.toString()
        }
      />
      <div className="flex flex-col gap-8 md:flex-row md:justify-between">
        <div className="flex flex-col gap-2 max-w-[280px] sm:min-w-[280px]">
          <ProductFilter title="Product Filter" />
        </div>
        <div className="flex flex-1 gap-y-8 justify-between flex-wrap max-w-[904px]">
          {products?.map((product) => (
            <Link key={product.offerId} href={`/product/${product.offerId}`}>
              <ProductCard
                img=""
                title={product.params.ModelName}
                oldPrice={product.params.RetailPrice}
                newPrice={product.params.RetailPriceWithDiscount}
                Articul={product.params.Articul}
              />
            </Link>
          ))}
        </div>
      </div>
     <Pagination
          currentPage={currentPage ?? 1}
          totalPages={totalPages ?? 1}
          onPageChange={setPage}
        />
    </div>
  );
}
