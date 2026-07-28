
import MadanBanner from "/projects/mpm/madanBanner.webp";
import ProjectCover1 from "/projects/mpm/madanBanner.webp";

const projectsData = [
  {
    id: 1,
    slug: "project-mpm",
    title: "MPM",
    category: "Architecture",
    location: "Indore, India",
    plotArea: "7100 Sq. Ft.",
    buildUpArea: "5131 Sq. Ft.",
    status: "Completed",
    bannerImage: MadanBanner,
    bannerPosition: "center 20%",
    gallery: [
      {
        src: "/projects/mpm/madanprojectcard.webp",
        position: "right center"
      },
      {
        src: "/projects/mpm/madanproject2.webp",
        position: "center 5%",
      },
      {
        src: "/projects/mpm/madanproject3.webp",
        position: "center 5%",
      },
      {
        src: "/projects/mpm/madanproject4.webp",
        position: "center 30%",
      },
      {
        src: "/projects/mpm/madanproject5.webp",
        position: "center top",
      },
      {
        src: "/projects/mpm/madanproject6.webp",
        position: "center bottom",
      },
    ]
  },
  {
    id: 2,
    slug: "project-nrk",
    title: "NRK",
    category: "Architecture",
    plotArea: "7900 Sq. Ft.",
    buildUpArea: "5558 Sq. Ft.",
    location: "Indore, India",
    status: "Completed",
    bannerImage: "/projects/nrk/nrkBanner.webp",
    bannerPosition: "center 10%",
    gallery: [
      {
        src: "/projects/nrk/nrkproject2.webp",
        position: "center center",
      },
      {
        src: "/projects/nrk/nrkprojectcard.webp",
        position: "center top",
      },
      {
        src: "/projects/nrk/nrkproject3.webp",
        position: "center 28%",
      },
      {
        src: "/projects/nrk/nrkproject4.webp",
        position: "center center",
      },
      {
        src: "/projects/nrk/nrkproject1.webp",
        position: "center center",
      },
      {
        src: "/projects/nrk/nrkproject5.webp",
        position: "20% center",
      },
      {
        src: "/projects/nrk/nrkproject6.webp",
        position: "center right",
      },
      {
        src: "/projects/nrk/nrkproject8.webp",
        position: "center center",
      },
    ],
  },

  {
    id: 3,
    slug: "project-hpm",
    title: "Courtyard House",
    category: "Architecture",
    location: "Indore, India",
    status: "Completed",

    // PROJECT BANNER IMAGE
    // Temporary image — replace later
    bannerImage: "/projects/hpm/HPM-banner.webp",
    bannerPosition: "center 10%",
    // PROJECT DESCRIPTION
    description:
      "A thoughtfully designed residence centered around an open courtyard, creating a seamless connection between natural light, landscape, and everyday living.",

    // PROJECT GALLERY — 6 IMAGES
    // Temporary images — replace later
    gallery: [
      {
        src: "/projects/hpm/HPM1.webp",
        position: "center center",
      },
      {
        src: "/projects/hpm/HPM6.webp",
        position: "center center",
      },
      {
        src: "/projects/hpm/HPM3.webp",
        position: "center center",
      },
      {
        src: "/projects/hpm/HPM4.webp",
        position: "center center",
      },
      {
        src: "/projects/hpm/HPM5.webp",
        position: "center center",
      },
      {
        src: "/projects/hpm/HPM2.webp",
        position: "center center",
      },
    ],

    // PROJECT YOUTUBE VIDEO — OPTIONAL
    youtubeUrl: "https://www.youtube.com/embed/GurEg1t3Xko",
  },


  // =====================================================
  // ARCHITECTURE PROJECT 4 — MODERN VILLA
  // =====================================================
  {
    id: 7,
    slug: "modern-villa",
    title: "Modern Villa",
    category: "Architecture",
    location: "Indore, India",
    year: "2026",
    status: "Completed",
    bannerImage: ProjectCover1,

    // PROJECT DESCRIPTION
    description:
      "A modern villa designed with clean architectural lines, open living spaces, natural light, and a strong connection between indoor and outdoor environments.",

    // PROJECT GALLERY — 6 IMAGES
    // Temporary images — replace later
    gallery: [
      "/projects/HPM1.webp",
      "/projects/HPM2.webp",
      "/projects/HPM3.webp",
      "/projects/HPM4.webp",
      "/projects/HPM5.webp",
      "/projects/HPM6.webp",
    ],

    // PROJECT YOUTUBE VIDEO — OPTIONAL
    youtubeUrl: "https://www.youtube.com/embed/GurEg1t3Xko",
  },


  // =====================================================
  // ARCHITECTURE PROJECT 5 — CONTEMPORARY HOUSE
  // =====================================================
  {
    id: 8,
    slug: "contemporary-house",
    title: "Contemporary House",
    category: "Architecture",

    // PROJECT INFORMATION
    location: "Indore, India",
    year: "2026",
    status: "Completed",

    // PROJECT BANNER IMAGE
    // Temporary image — replace later
    bannerImage: ProjectCover1,

    // PROJECT DESCRIPTION
    description:
      "A contemporary home designed around simplicity, natural light, and thoughtfully connected spaces, creating a refined balance between comfort and modern architecture.",

    // PROJECT GALLERY — 6 IMAGES
    // Temporary images — replace later
    gallery: [
      "/projects/HPM1.webp",
      "/projects/HPM2.webp",
      "/projects/HPM3.webp",
      "/projects/HPM4.webp",
      "/projects/HPM5.webp",
      "/projects/HPM6.webp",
    ],

    // PROJECT YOUTUBE VIDEO — OPTIONAL
    youtubeUrl: "https://www.youtube.com/embed/GurEg1t3Xko",
  },


  // =====================================================
  // ARCHITECTURE PROJECT 6 — WEEKEND RESIDENCE
  // =====================================================
  {
    id: 9,
    slug: "weekend-residence",
    title: "Weekend Residence",
    category: "Architecture",

    // PROJECT INFORMATION
    location: "Indore, India",
    year: "2026",
    status: "Completed",

    // PROJECT BANNER IMAGE
    // Temporary image — replace later
    bannerImage: ProjectCover1,

    // PROJECT DESCRIPTION
    description:
      "A peaceful weekend residence designed to create a relaxed connection with nature through open spaces, natural light, and thoughtful architectural planning.",

    // PROJECT GALLERY — 6 IMAGES
    // Temporary images — replace later
    gallery: [
      "/projects/HPM1.webp",
      "/projects/HPM2.webp",
      "/projects/HPM3.webp",
      "/projects/HPM4.webp",
      "/projects/HPM5.webp",
      "/projects/HPM6.webp",
    ],

  },


  // =====================================================
  // INTERIOR PROJECT 1 — ELEGANT DINING SPACE
  // =====================================================
  {
    id: 4,
    slug: "elegant-dining-space",
    title: "Elegant Dining Space",
    category: "Interior",

    // PROJECT INFORMATION
    location: "Indore, India",
    year: "2026",
    status: "Completed",

    // PROJECT BANNER IMAGE
    // Temporary image — replace later
    bannerImage: "/projects/2BHK/2BHK-banner.webp",
    bannerPosition: "center ",
    // PROJECT DESCRIPTION
    description:
      "An elegant dining space designed with refined materials, warm textures, thoughtful lighting, and a balanced composition to create an inviting interior experience.",

    // PROJECT GALLERY — 6 IMAGES
    // Temporary images — replace later
    gallery: [
      "/projects/2BHK/h5.webp",
      "/projects/2BHK/h2.webp",
      "/projects/2BHK/h4.webp",
      "/projects/2BHK/h1.webp",
      "/projects/2BHK/h3.webp",

      "/projects/2BHK/b1.webp",
      "/projects/2BHK/b2.webp",
      "/projects/2BHK/b3.webp",
      "/projects/2BHK/d1.webp",
      "/projects/2BHK/d2.webp",
      "/projects/2BHK/k1.webp",
      "/projects/2BHK/k2.webp",
      "/projects/2BHK/k3.webp",
      "/projects/2BHK/r1.webp",
      "/projects/2BHK/r2.webp",
      "/projects/2BHK/r3.webp",
      "/projects/2BHK/r4.webp",
      "/projects/2BHK/r5.webp",


    ],

    // PROJECT YOUTUBE VIDEO — OPTIONAL
    // youtubeUrl: "https://www.youtube.com/embed/GurEg1t3Xko",
  },


  // =====================================================
  // INTERIOR PROJECT 2 — MODERN LIVING ROOM
  // =====================================================
  {
    id: 5,
    slug: "modern-living-room",
    title: "K3",
    category: "Interior",
    location: "Indore, India",
    status: "Completed",

    // PROJECT BANNER IMAGE
    // Temporary image — replace later
    bannerImage: "/projects/K3Interior/k3Banner.webp",
    ImagePosition: "center 10%",
    // PROJECT DESCRIPTION
    description:
      "A modern living space designed with a refined material palette, comfortable proportions, natural light, and carefully selected details to create a warm and contemporary atmosphere.",

    // PROJECT GALLERY — 6 IMAGES
    // Temporary images — replace later
    gallery: [

      "/projects/K3Interior/k3project7.webp",
      "/projects/K3Interior/k3project4.webp",
      "/projects/K3Interior/k3project6.webp",
      "/projects/K3Interior/k3project11.webp",
      "/projects/K3Interior/k3project13.webp",
      "/projects/K3Interior/k3project2.webp",
      "/projects/K3Interior/k3project18.webp",
      "/projects/K3Interior/k3project15.webp",
      "/projects/K3Interior/k3project16.webp",
      "/projects/K3Interior/k3project17.webp",
      "/projects/K3Interior/k3project19.webp",
      "/projects/K3Interior/k3bedroom.webp",
      "/projects/K3Interior/k3project14.webp",
    ],
  },

  {
    id: 6,
    slug: "luxury-bedroom",
    title: "Luxury Bedroom",
    category: "Interior",

    // PROJECT INFORMATION
    location: "Indore, India",
    year: "2026",
    status: "Completed",

    // PROJECT BANNER IMAGE
    // Temporary image — replace later
    bannerImage: "/projects/3BHK/3BHK-banner.webp",
    bannerPosition: "center ",

    // PROJECT DESCRIPTION
    description:
      "A sophisticated bedroom interior designed around comfort, warmth, and understated luxury, combining soft textures, thoughtful lighting, and refined material details.",

    // PROJECT GALLERY — 6 IMAGES
    // Temporary images — replace later
    gallery: [
      "/projects/3BHK/h1.webp",
      "/projects/3BHK/h2.webp",
      "/projects/3BHK/h3.webp",
      "/projects/3BHK/h4.webp",
      "/projects/3BHK/h5.webp",
      "/projects/3BHK/h6.webp",

      "/projects/3BHK/h8.webp",

      "/projects/3BHK/3BHK-card.webp",
      "/projects/3BHK/r1.webp",
      "/projects/3BHK/r2.webp",
      "/projects/3BHK/r3.webp",
      "/projects/3BHK/r4.webp",

    ],

    // PROJECT YOUTUBE VIDEO — OPTIONAL
    youtubeUrl: null,
  },


  // =====================================================
  // INTERIOR PROJECT 4 — CONTEMPORARY DINING INTERIOR
  // =====================================================
  {
    id: 10,
    slug: "contemporary-dining-interior",
    title: "Contemporary Dining Interior",
    category: "Interior",

    // PROJECT INFORMATION
    location: "Indore, India",
    year: "2026",
    status: "Completed",

    // PROJECT BANNER IMAGE
    // Temporary image — replace later
    bannerImage: "/projects/Shobhit/S-banner.webp",
    bannerPosition: "center bottom 5%",


    // PROJECT DESCRIPTION
    description:
      "A contemporary dining interior shaped through elegant proportions, warm materials, ambient lighting, and carefully considered details that create a welcoming dining experience.",

    // PROJECT GALLERY — 6 IMAGES
    // Temporary images — replace later
    gallery: [
      "/projects/Shobhit/h1.webp",
      "/projects/Shobhit/h2.webp",
      "/projects/Shobhit/h3.webp",
      "/projects/Shobhit/c1.webp",
      "/projects/Shobhit/c2.webp",
      "/projects/Shobhit/d1.webp",
      "/projects/Shobhit/k1.webp",
      "/projects/Shobhit/k2.webp",
      "/projects/Shobhit/k3.webp",
      "/projects/Shobhit/k4.webp",
      "/projects/Shobhit/m1.webp",
      "/projects/Shobhit/s1.webp",
      "/projects/Shobhit/s2.webp",
      "/projects/Shobhit/b1.webp",
      "/projects/Shobhit/b2.webp",
      "/projects/Shobhit/b3.webp",
      "/projects/Shobhit/b4.webp",
      "/projects/Shobhit/b5.webp",
    ],

    // PROJECT YOUTUBE VIDEO — OPTIONAL
    youtubeUrl: null,
  },


  // =====================================================
  // INTERIOR PROJECT 5 — REFINED LIVING SPACE
  // =====================================================
  {
    id: 11,
    slug: "refined-living-space",
    title: "Refined Living Space",
    category: "Interior",
    location: "Indore, India",
    year: "2026",
    status: "Completed",

    bannerImage: "/projects/ashishInterior/ashishBanner.webp",

    // PROJECT DESCRIPTION
    description:
      "A refined living space that combines contemporary furniture, natural textures, subtle lighting, and balanced spatial planning to create an elegant yet comfortable environment.",

    // PROJECT GALLERY — 6 IMAGES
    // Temporary images — replace later
    gallery: [
      "/projects/ashishInterior/ashishproject1.webp",
      "/projects/ashishInterior/ashishproject2.webp",
      "/projects/ashishInterior/ashishproject5.webp",
      "/projects/ashishInterior/ashishproject6.webp",
      "/projects/ashishInterior/ashishproject7.webp",
      "/projects/ashishInterior/ashishproject8.webp",
      "/projects/ashishInterior/ashishproject9.webp",
      "/projects/ashishInterior/ashishproject10.webp",
      "/projects/ashishInterior/ashishproject11.webp",
      "/projects/ashishInterior/ashishproject12.webp",
      "/projects/ashishInterior/ashishproject13.webp",
      "/projects/ashishInterior/ashishproject14.webp",
      "/projects/ashishInterior/ashishproject15.webp",
      "/projects/ashishInterior/ashishproject16.webp",
      "/projects/ashishInterior/ashishproject17.webp",
      "/projects/ashishInterior/ashishproject18.webp",
      "/projects/ashishInterior/ashishproject19.webp",
      "/projects/ashishInterior/ashishproject20.webp",
      "/projects/ashishInterior/ashishproject21.webp",
      "/projects/ashishInterior/ashishproject22.webp",
      "/projects/ashishInterior/ashishproject3.webp",

    ],

    youtubeUrl: null,
  },


  // =====================================================
  // INTERIOR PROJECT 6 — SERENE BEDROOM INTERIOR
  // =====================================================
  {
    id: 12,
    slug: "serene-bedroom-interior",
    title: "Serene Bedroom Interior",
    category: "Interior",

    // PROJECT INFORMATION
    location: "Indore, India",
    year: "2026",
    status: "Completed",

    // PROJECT BANNER IMAGE
    // Temporary image — replace later
    bannerImage: ProjectCover1,

    // PROJECT DESCRIPTION
    description:
      "A serene bedroom interior designed with soft materials, calming tones, layered lighting, and thoughtful details to create a peaceful and sophisticated private space.",

    // PROJECT GALLERY — 6 IMAGES
    // Temporary images — replace later
    gallery: [
      "/projects/HPM1.webp",
      "/projects/HPM2.webp",
      "/projects/HPM3.webp",
      "/projects/HPM4.webp",
      "/projects/HPM5.webp",
      "/projects/HPM6.webp",
    ],

    // PROJECT YOUTUBE VIDEO — OPTIONAL
    youtubeUrl: null,
  },

];

export default projectsData;