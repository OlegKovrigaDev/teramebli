import { home } from "@/constants";
import Link from "next/link";
import { List } from "../list";
import { Section } from "../section";

export const Categories = () => (
  <Section title={home.categories.title}>
    <List
      items={home.categories.data}
      className="categories-list"
      classItem="categories-item"
      renderItem={({ title, linkId, image }) => (
        <Link href={`/category/${linkId}`}>
          <img src={image} className="categories-img" />
          <h3 className="categories-title">{title}</h3>
        </Link>
      )}
    />
  </Section>
);
