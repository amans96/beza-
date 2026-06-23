 const links = [
     { label: "Home", path: "/" },
    { label: "About",
      children: [
         { label: "Our Story", path: "/about" },
         { label: "Mission & Vision", path: "/about" },
         { label: "Principal's message", path: "/about" },
         { label: "Our Team", path: "/about" },
      ]
    },
    {
      label: "Admissions",
      children: [
         { label: "How to apply", path: "/about" },
         { label: "Admission requirements", path: "/about" },
         { label: "Tuition & Fees", path: "/about" },
      ],
    },
    { label: "Student Life",
      children: [
         { label: "Clubs & activities", path: "/gallery" },
         { label: "Sports programs", path: "/gallery" },
         { label: "Events", path: "/gallery" },
      ]
    },
     { label: "Gallery", path: "/gallery" },
  ];

 export default links;