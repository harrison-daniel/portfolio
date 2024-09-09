import Link from 'next/link';
import Image from 'next/image';
import Gitpub from '../../public/assets/images/yesmore-content-beer.jpg';
import PicknFlickLogo from '../../public/assets/images/picknflick-logo.png';
import PasswordGenerator from '../../public/assets/images/password-generator.png';

const projects = [
  {
    image: Gitpub,
    alt: 'picture of full beer mug with foam on top',
    title: 'GitPub',
    description:
      'Search for breweries in your area and add custom entries or notes to your profile.',

    descriptionExpanded: [
      {
        text: 'Search for breweries in your area and add custom entries or notes to your profile.',
      },
      {
        label: 'Front-end:',
        text: 'The frontend is built with Next.js and React.js, featuring animations with Framer Motion, and styled with Tailwind CSS and Shadcn UI.',
      },
      {
        label: 'Back-end:',
        text: 'The app is deployed via Github actions to Vercel, and uses Next Auth for authentication.',
      },
    ],
    link: 'https://gitpub.vercel.app',
    tags: [
      'HTML',
      'CSS',
      'Tailwind CSS',
      'shadcn-ui',
      'Javascript',
      'React.js',
      'MongoDB',
      'Open Brewery DB',
      'Next Auth',
      'Vercel',
      'Next.js',
      'Github Actions',
    ],
  },

  {
    image: PicknFlickLogo,
    alt: 'PicknFlick logo',
    title: 'PicknFlick',
    description: 'Random Decision Maker',
    descriptionExpanded: [
      {
        text: 'Random decision maker allowing users to choose between 2 to 6 options, with spin momentum based on flick speed.',
      },
      {
        label: 'Front-end:',
        text: 'The frontend is built with Next.js and React.js, featuring animations with Framer Motion, and styled with Tailwind CSS and Shadcn UI.',
      },
      {
        label: 'Back-end:',
        text: 'The app is hosted on an AWS EC2 instance (Ubuntu), using an Elastic IP with Nginx as a reverse proxy. It is secured with/served over HTTPS using a self-signed certificate, with Cron jobs for SSL certificate renewal.',
      },
    ],

    link: 'https://picknflick.com',
    tags: [
      'HTML',
      'CSS',
      'Javascript',
      'React.js',
      'Tailwind CSS',
      'Framer Motion',
      'Next.js',
      'AWS',
      'Elastic IP',
      'EC2 (Ubuntu AMI)',
      'Nginx',
      'Docker',
      'Docker Compose',
    ],
  },
  {
    image: PasswordGenerator,
    alt: 'picture of a password generator',
    title: 'Password Generator',
    description: 'Password Generator',

    descriptionExpanded: [
      {
        text: 'Custom, unique password generator with options for length and character types.',
      },
    ],

    link: 'https://harrison-daniel.github.io/password-generator/',
    tags: ['Javascript', 'HTML', 'CSS'],
  },
];

export default projects;
