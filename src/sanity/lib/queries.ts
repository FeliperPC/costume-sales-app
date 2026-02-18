import { defineQuery } from "next-sanity";

export const SUITS_CARD_QUERY = defineQuery(`
  *[_type == "suit" && defined(slug.current)]
  | order(_createdAt desc) {
    _id,
    _createdAt,
    name,
    slug,
    versions[0]{
      images[0]{
        asset->{
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

export const SUITS_CARD_PAGINATED_QUERY = defineQuery(`
{
  "products": *[_type == "suit"] 
    | order(publishedAt desc) 
    [$start...$end]{
      _id,
    _createdAt,
    name,
    slug,
    versions[0]{
      images[0]{
        asset->{
          url
        }
      }
    }
  },
  "total": count(*[_type == "suit"])
}
`);

export const GET_SUIT_BY_SLUG_QUERY = defineQuery(`
*[
  _type == "suit" &&
  slug.current == $slug
][0]{
  _id,
  "name": coalesce(name, ""),
  slug,

  "versions": coalesce(versions, [])[]{
    _key,
    "versionName": coalesce(versionName, ""),
    "price": coalesce(price, 0),
    "fullDescription": coalesce(fullDescription, []),

    "images": coalesce(images, [])[]{
      _key,
      "asset": asset->{
        _id,
        "url": coalesce(url, ""),
        metadata {
          dimensions
        }
      }
    }
  }
}
`)


