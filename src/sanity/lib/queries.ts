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

export const REVIEWERS_QUERY = defineQuery(`
  *[_type == "review"]
  | order(_createdAt desc)[0...3]{
    _id,
    name,
    clientReview,
    image{
      asset->{
        url
      }
    }
  }
`);