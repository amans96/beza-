export const links = [
  { label: "Home", path: "/" },
  { label: "About", path: "/Gallery" },

  {
    label: "Courses",
    children: [
      { label: "HTML & CSS", path: "/courses/html-css" },
      { label: "JavaScript", path: "/courses/javascript" },
      { label: "React", path: "/courses/react" },
      { label: "Python", path: "/courses/python" },
    ],
  },

  { label: "Practice", path: "/practice" },
  { label: "Resources", path: "/resources" },
];