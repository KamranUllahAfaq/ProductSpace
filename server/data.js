const data = [
  {
    name: "Productivity",
    description:
      "Tools to increase your productivity and get things done more efficiently.",
    thumbnail:
      "https://ph-files.imgix.net/e8163b3f-12cc-4b69-9bcb-3e6c1507a56d.png?auto=format&auto=compress&codec=mozjpeg&cs=strip&w=80&h=80&fit=crop",
  },
  {
    name: "Web3",
    description: "The future on blockchain. All things wagmi, ngmi, and more.",
  },
  {
    name: "Design",
    description:
      "Tools and resources for designers and creatives, from graphic design to UX/UI design.",
    thumbnail:
      "https://ph-files.imgix.net/b2df4c33-4161-4b9c-a083-a3f3c6ef670c.png?auto=format&auto=compress&codec=mozjpeg&cs=strip&w=80&h=80&fit=crop",
  },
  {
    name: "Development",
    description:
      "Resources for developers, including coding tools, frameworks, and libraries.",
    thumbnail:
      "https://ph-files.imgix.net/8e6825b5-5b5b-4a3f-8ccf-527cc1f2c72d.png?auto=format&auto=compress&codec=mozjpeg&cs=strip&w=80&h=80&fit=crop",
  },
  {
    name: "Marketing",
    description:
      "Tools for marketing and growth, from social media management to SEO and content marketing.",
    thumbnail:
      "https://ph-files.imgix.net/32fa013f-1836-45f6-822e-73c40dd7d0c3.png?auto=format&auto=compress&codec=mozjpeg&cs=strip&w=80&h=80&fit=crop",
  },
  {
    name: "AI",
    description:
      "Artificial intelligence and machine learning tools and applications.",
    thumbnail:
      "https://ph-files.imgix.net/f34bbdbb-6d9d-49d7-9c3a-d3c6e13f73d8.png?auto=format&auto=compress&codec=mozjpeg&cs=strip&w=80&h=80&fit=crop",
  },
  {
    name: "Cryptocurrency",
    description:
      "Tools and resources related to cryptocurrencies and blockchain technology.",
    thumbnail:
      "https://ph-files.imgix.net/e157e3e3-2a9b-4c8e-9c91-91ebd965ed89.png?auto=format&auto=compress&codec=mozjpeg&cs=strip&w=80&h=80&fit=crop",
  },
  {
    name: "Blockchain",
    description:
      "Blockchain technology and cryptocurrencies, including Bitcoin and Ethereum.",
    thumbnail: "https://commons.wikimedia.org/wiki/File:Blockchain.png",
  },
  {
    name: "Business",
    description:
      "Business tools and resources for entrepreneurs and small businesses.",
    thumbnail: "https://commons.wikimedia.org/wiki/File:Business_meeting.jpg",
  },
  {
    name: "Chatbots",
    description:
      "Chatbot development tools and platforms for businesses and individuals.",
    thumbnail: "https://commons.wikimedia.org/wiki/File:Chatbot.png",
  },
  {
    name: "Collaboration",
    description:
      "Tools for collaboration and project management, including team communication and file sharing apps.",
    thumbnail: "https://commons.wikimedia.org/wiki/File:Business_meeting.jpg",
  },
  {
    name: "Gaming",
    description:
      "Video games, game development tools, and resources for gamers and developers.",
    thumbnail:
      "https://ph-files.imgix.net/0b634ffa-692e-46b6-8d1b-2f2bcb6fc2d6.png?auto=format&auto=compress&codec=mozjpeg&cs=strip&w=80&h=80&fit=crop",
  },
  {
    name: "Hardware",
    description:
      "Hardware products, from consumer electronics to robotics and IoT devices.",
    thumbnail:
      "https://commons.wikimedia.org/wiki/File:Computer_hardware_components.jpg",
  },
  {
    name: "Health",
    description:
      "Health and wellness products, including fitness and nutrition apps, medical devices, and mental health tools.",
    thumbnail: "https://commons.wikimedia.org/wiki/File:Healthy_lifestyle.jpg",
  },
  {
    name: "Social",
    description:
      "Social media platforms, networking apps, and online communities.",
    thumbnail:
      "https://commons.wikimedia.org/wiki/File:Social_network_analysis_visualization.png",
  },
  {
    name: "Finance",
    description:
      "Financial products and services, including personal finance apps, investment platforms, and payment processors.",
    thumbnail:
      "https://commons.wikimedia.org/wiki/File:Finance_Magnifying_Glass.jpg",
  },
  {
    name: "Education",
    description:
      "Educational resources and tools, from e-learning platforms to educational apps and games.",
    thumbnail:
      "https://commons.wikimedia.org/wiki/File:Finance_Magnifying_Glass.jpg",
  },
  {
    name: "Entertainment",
    description: "Movies, TV shows, music, and other forms of entertainment.",
    thumbnail:
      "https://commons.wikimedia.org/wiki/File:Finance_Magnifying_Glass.jpg",
  },
  {
    name: "Travel",
    description:
      "Travel-related products and services, including booking tools, transportation, and travel gear.",
    thumbnail:
      "https://commons.wikimedia.org/wiki/File:Finance_Magnifying_Glass.jpg",
  },
  {
    name: "Food & Drink",
    description:
      "Food and drink products, including recipes, meal planning apps, and cooking tools.",
    thumbnail:
      "https://commons.wikimedia.org/wiki/File:Finance_Magnifying_Glass.jpg",
  },
  {
    name: "Sports",
    description:
      "Sports products and services, including sports news, fitness apps, and sports gear.",
    thumbnail:
      "https://commons.wikimedia.org/wiki/File:Finance_Magnifying_Glass.jpg",
  },
  {
    name: "News & Magazines",
    description:
      "News and magazine apps and websites, covering a wide range of topics from technology to politics.",
    thumbnail:
      "https://commons.wikimedia.org/wiki/File:Finance_Magnifying_Glass.jpg",
  },
  {
    name: "Utilities",
    description:
      "Useful tools and utilities, including file management, system optimization, and productivity enhancers.",
    thumbnail:
      "https://commons.wikimedia.org/wiki/File:Finance_Magnifying_Glass.jpg",
  },
  {
    name: "Open Source",
    description: "Open source software, projects, and communities.",
    thumbnail:
      "https://commons.wikimedia.org/wiki/File:Finance_Magnifying_Glass.jpg",
  },
  {
    name: "Books",
    description: "Books, reading apps, and tools for readers and writers.",
    thumbnail:
      "https://commons.wikimedia.org/wiki/File:Finance_Magnifying_Glass.jpg",
  },

  {
    name: "Health and Fitness",
    description: "Health and fitness apps, tools, and products.",
    thumbnail:
      "https://commons.wikimedia.org/wiki/File:Finance_Magnifying_Glass.jpg",
  },
  {
    name: "Startup",
    description:
      "Startup resources, from idea validation to fundraising and growth.",
    thumbnail:
      "https://commons.wikimedia.org/wiki/File:Finance_Magnifying_Glass.jpg",
  },
  {
    name: "Video",
    description:
      "Video production tools, editing software, and platforms for video creators.",
    thumbnail:
      "https://commons.wikimedia.org/wiki/File:Finance_Magnifying_Glass.jpg",
  },
  {
    name: "Virtual Reality",
    description:
      "Virtual and augmented reality (VR/AR) hardware and software products.",
    thumbnail:
      "https://commons.wikimedia.org/wiki/File:Finance_Magnifying_Glass.jpg",
  },
  {
    name: "Web Development",
    description:
      "Web development tools and frameworks for building websites and web applications.",
    thumbnail:
      "https://commons.wikimedia.org/wiki/File:Finance_Magnifying_Glass.jpg",
  },
  {
    name: "Writing Tools",
    description:
      "Tools for writers, including writing software, editors, and productivity tools.",
    thumbnail:
      "https://commons.wikimedia.org/wiki/File:Finance_Magnifying_Glass.jpg",
  },
  {
    name: "Audio",
    description:
      "Audio production tools, music apps, and sound engineering software.",
    thumbnail:
      "https://commons.wikimedia.org/wiki/File:Finance_Magnifying_Glass.jpg",
  },
  {
    name: "SaaS",
    description: "Software as a service (SaaS) products and tools.",
    thumbnail:
      "https://commons.wikimedia.org/wiki/File:Finance_Magnifying_Glass.jpg",
  },
  {
    name: "Remote Work",
    description:
      "Tools and resources for remote work, from communication to project management.",
    thumbnail:
      "https://commons.wikimedia.org/wiki/File:Finance_Magnifying_Glass.jpg",
  },
  {
    name: "Social Media",
    description: "Social media management and marketing tools.",
    thumbnail:
      "https://commons.wikimedia.org/wiki/File:Finance_Magnifying_Glass.jpg",
  },
];
export default data;
