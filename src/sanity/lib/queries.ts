import { defineQuery } from "next-sanity";

export const SUITS_CARD_QUERY = defineQuery(`
  *[
    _type == "suit" &&
    defined(slug.current) &&
    defined(versions[0].images[0].asset)
  ]
  | order(_createdAt desc) {
    _id,
    name,
    "slug": slug.current,
    "versionSlug": versions[0].versionSlug.current,
    "imageUrl": versions[0].images[0].asset->url
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
  "products": *[
    _type == "suit" &&
    defined(slug.current) &&
    defined(versions[0].images[0].asset)
  ]
  | order(_createdAt desc) {
    _id,
    name,
    "slug": slug.current,
    "versionSlug": versions[0].versionSlug.current,
    "imageUrl": versions[0].images[0].asset->url
  },
  "total": count(*[_type == "suit"])
}
`);


export const SUIT_BY_SLUG_QUERY = defineQuery(`
  *[_type == "suit" && slug.current == $slug][0]{
    _id,
    name,
    "slug": slug.current,
    "version": coalesce(
      versions[versionSlug.current == $versionSlug][0],
      versions[0]
    ){
      _key,
      versionName,
      "versionSlug": versionSlug.current,
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
`)

export const SUIT_VERSIONS_MENU_QUERY = defineQuery(`
  *[_type == "suit" && slug.current == $slug][0].versions[]{
    _key,
    versionName,
    "versionSlug": versionSlug.current
  }
`)

export const REOPEN_SCHEDULE_DATE = defineQuery(`
  *[_type == "schedule"][0]{
    isOpen,
    reopenDate
  }
`);

export const ABOUT_QUERY = defineQuery(`
  *[_type == "about"][0]{
    _id,
    badge,
    title,
    description,
    image{
      asset->{
        _id,
        url
      },
    },
    features[]{
      icon,
      title,
      description
    }
  }
`)

export const CUSTOM_SUIT_QUERY = defineQuery(`
  *[_type == "customSuit"][0]{
    _id,
    badge,
    title,
    description,
    image{
      asset->{
        _id,
        url
      },
    },
    callToAction
  }
`)








