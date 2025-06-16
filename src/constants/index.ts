const words: {text: string, imgPath: string}[] = [
  { text: "Ideas", imgPath: "/images/ideas.svg" },
  { text: "Concepts", imgPath: "/images/concepts.svg" },
  { text: "Designs", imgPath: "/images/designs.svg" },
  { text: "Code", imgPath: "/images/code.svg" },
];

const navLinks: {text: string, link: string}[] = [
  {
    text: 'Skills',
    link: '#skills',
  },
  {
    text: 'Experience',
    link: '#experience',
  },
  {
    text: 'About Me',
    link: '#about',
  }
]

const skills: {text:string,imgPath: string}[] = [
  {
    text: 'Dlaczego JS jak ja pisze w tajpskrypcie? Dlaczego JS jak ja pisze w tajpskrypcie? Dlaczego JS jak ja pisze w tajpskrypcie? Dlaczego JS jak ja pisze w tajpskrypcie?',
    imgPath: "/images/logos/pixi.svg"
  },
  {
    text: 'Chyba ta strona jest w React nie?',
    imgPath: "/images/logos/react.png"
  },
  {
    text: 'Paczki umiem instalowac i dodawac',
    imgPath: "/images/logos/node.png"
  }
]

export {
    words,
    navLinks,
    skills
};
