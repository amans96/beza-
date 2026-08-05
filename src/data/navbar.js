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
    { label: "How to apply", path: "/admissions" },
    { label: "Admission requirements", path: "/admissions" },
    { label: "Tuition & Fees", path: "/admissions" },
  ],
},
    { label: "Student Life",
      children: [
         { label: "Clubs & activities", path: "/Student" },
         { label: "Sports programs", path: "/Student" },
         { label: "Events", path: "/Student" },
      ]
    },
     { label: "Gallery", path: "/gallery" },
  ];

 export default links;