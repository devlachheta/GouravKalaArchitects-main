// ==========================================================
// GET ALL ARCHITECTURE PROJECTS
// ==========================================================

export const GET_ARCHITECTURE_PROJECTS = `
*[_type == "architectureProject"] | order(_createdAt desc){

  "_id": _id,

  "id": _id,

  "type": "architecture",

  title,

  "slug": slug.current,

  location,

  plotArea,

  builtUpArea,

  status,

  description,

  youtubeUrl,

  imagePosition,

  bannerPosition,

  "image": coverImage.asset->url,

  "bannerImage": bannerImage.asset->url,

  "gallery": gallery[]{
    "src": asset->url,
    position
  }
}
`;


// ==========================================================
// GET SINGLE ARCHITECTURE PROJECT
// ==========================================================

export const GET_ARCHITECTURE_PROJECT = `
*[_type == "architectureProject" && slug.current == $slug][0]{

  "_id": _id,

  "id": _id,

  "type": "architecture",

  title,

  "slug": slug.current,

  location,

  plotArea,

  builtUpArea,

  status,

  description,

  youtubeUrl,

  imagePosition,

  bannerPosition,

  "image": coverImage.asset->url,

  "bannerImage": bannerImage.asset->url,

  "gallery": gallery[]{
    "src": asset->url,
    position
  }
}
`;
// ==========================================================
// GET ALL INTERIOR PROJECTS
// ==========================================================

export const GET_INTERIOR_PROJECTS = `
*[_type == "interiorProject"] | order(_createdAt desc){

  "_id": _id,

  "id": _id,

  "type": "interior",

  title,

  "slug": slug.current,

  location,

  carpetArea,

  status,

  description,

  youtubeUrl,

  imagePosition,

  bannerPosition,

  "image": coverImage.asset->url,

  "bannerImage": bannerImage.asset->url,

  "gallery": gallery[]{
    "src": image.asset->url,
    position
  }
}
`;


// ==========================================================
// GET SINGLE INTERIOR PROJECT
// ==========================================================

export const GET_INTERIOR_PROJECT = `
*[_type == "interiorProject" && slug.current == $slug][0]{

  "_id": _id,

  "id": _id,

  "type": "interior",

  title,

  "slug": slug.current,

  location,

  carpetArea,

  status,

  description,

  youtubeUrl,

  imagePosition,

  bannerPosition,

  "image": coverImage.asset->url,

  "bannerImage": bannerImage.asset->url,

  "gallery": gallery[]{
    "src": image.asset->url,
    position
  }
}
`;

export const GET_HOMEPAGE_STATISTICS = `
*[_type == "homepage"][0]{
    years,
    projects,
    cities
}
`;

// ==========================================================
// GET ABOUT SOCIAL STATISTICS
// ==========================================================

export const GET_ABOUT_SOCIAL_STATISTICS = `
*[_type == "about"][0]{
    instagramFollowers,
    facebookFollowers,
    youtubeSubscribers
}
`;