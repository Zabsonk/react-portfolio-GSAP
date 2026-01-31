export type ImgTexts = {
  text: string,
  imgPath: string,
}

const words: ImgTexts[] = [
  { text: "Ideas", imgPath: "/images/ideas.svg" },
  { text: "Concepts", imgPath: "/images/concepts.svg" },
  { text: "Designs", imgPath: "/images/designs.svg" },
  { text: "Code", imgPath: "/images/code.svg" },
];

const aboutImgs: string[] = [
        "/images/abouts/graduate.png",
        "/images/abouts/active.png",
        "/images/abouts/game-dev.png",
    ]

const aboutInfo: string[] = [
  "I'm a Computer Science graduate with an engineering degree, specializing in IT Systems Infrastructure.",
  "In my free time, I focus on staying active through sports and maintaining a healthy lifestyle.",
  "Currently, I work on building interactive applications and browser-based games using PixiJS. I enjoy working in a team environment and take particular interest in developing engaging and visually rich casino games."
]

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

const skillsLevels: Map<number, string> = new Map([
  [1, "Beginner"],
  [2, "Intermediate"],
  [3, "Advanced"],
  [4, "Expert"],
  [5, "Master"]
]);

const skills: { text:string , imgPath: string, level: number, color: string}[] = [
  {
    text: 'PixiJS is a fast and flexible 2D rendering library for creating rich, interactive graphics and animations in the browser',
    imgPath: "/images/logos/pixi.svg",
    level: 4,
    color: '#ea1e63'
  },
  {
    text: 'This is what I love the most about programing. OOP makes it easier to model real-world problems in a clear and intuitive way.',
    imgPath: "/images/logos/oop.svg",
    level: 4,
    color: '#12dcbe'
  },
  {
    text: 'This site is built with React, a powerful library for building interactive user interfaces',
    imgPath: "/images/logos/react.png",
    level: 2,
    color: '#00d8ff'
  },
  {
    text: 'Node.js is a powerful runtime environment that allows JavaScript to be executed on the server side.',
    imgPath: "/images/logos/node.png",
    level: 3,
    color: '#78cc65'
  }
  ,
  {
    text: 'I use Git for version control to keep track of changes and collaborate efficiently.',
    imgPath: "/images/logos/git.svg",
    level: 4,
    color: '#f03c2e'
  },
  {
    text: 'TypeScript helps me write safer, strongly typed code for complex projects.',
    imgPath: "/images/logos/ts.svg",
    level: 5,
    color: '#3178c6'
  },
  {
    text: 'HTML5 is the latest standard for structuring and presenting content on the web. ',
    imgPath: "/images/logos/html5.svg",
    level: 4,
    color: '#e44d26'
  }
  ,
  {
    text: 'GSAP',
    imgPath: "/images/logos/gsap.svg",
    level: 3,
    color: '#8ac640'
  }
]

const myLinks: (ImgTexts & { link: string })[] = [
  {
    text:'Linked In',
    link: 'll',
    imgPath: 'images/linkedin.png',
  }
]

export {
    skillsLevels,
    words,
    navLinks,
    skills,
    myLinks,
    aboutImgs,
    aboutInfo
};
