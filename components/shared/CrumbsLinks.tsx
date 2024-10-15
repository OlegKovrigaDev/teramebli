import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "../ui/breadcrumb";

interface BreadcrumbProps {
  categoryName?: string;
  categoryId?: string;
  subcategoryName?: string;
  subcategoryId?: string;
  productName?: string;
}

export function CrumbsLinks({
  categoryName,
  categoryId,
  subcategoryName,
  subcategoryId,
  productName,
}: BreadcrumbProps) {
  return (
    <Breadcrumb className="py-7">
      <BreadcrumbList className="text-lg">
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="/">Головна</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />

        {categoryName && categoryId && (
          <>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href={`/category/${categoryId}`}>{categoryName}</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            {subcategoryName && <BreadcrumbSeparator />}
          </>
        )}

        {subcategoryName && subcategoryId && (
          <code>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href={`/category/${categoryId}${subcategoryId}`}>
                  {subcategoryName}
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
          </code>
        )}

        {productName && (
          <>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{productName}</BreadcrumbPage>
            </BreadcrumbItem>
          </>
        )}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
