import { defineQuery } from "next-sanity";

export const SUITS_QUERY = defineQuery(`
  *[_type == "suit" && defined(slug.current)]
  | order(_createdAt desc) {
    _id,
    _createdAt,
    name,
    slug,
    versions[]{
      versionName,
      price,
      fullDescription,
      images[]{
        asset->{
          _id,
          url
        }
      }
    }
  }
`);