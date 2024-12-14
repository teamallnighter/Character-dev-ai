import React, { useEffect, useState } from 'react';
import type { ReactElement } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useAppSelector } from '../../stores/hooks';
import LayoutGuest from '../../layouts/Guest';
import WebSiteHeader from '../../components/WebPageComponents/Header';
import WebSiteFooter from '../../components/WebPageComponents/Footer';
import {
  HeroDesigns,
  AboutUsDesigns,
  FeaturesDesigns,
  GalleryPortfolioDesigns,
  ContactFormDesigns,
} from '../../components/WebPageComponents/designs';

import HeroSection from '../../components/WebPageComponents/HeroComponent';

import AboutUsSection from '../../components/WebPageComponents/AboutUsComponent';

import FeaturesSection from '../../components/WebPageComponents/FeaturesComponent';

import GalleryPortfolioSection from '../../components/WebPageComponents/GalleryPortfolioComponent';

import { getMultiplePexelsImages } from '../../helpers/pexels';

import ContactFormSection from '../../components/WebPageComponents/ContactFormComponent';

export default function WebSite() {
  const cardsStyle = useAppSelector((state) => state.style.cardsStyle);
  const bgColor = useAppSelector((state) => state.style.bgLayoutColor);
  const projectName = 'Character dev ai';

  useEffect(() => {
    const darkElement = document.querySelector('body .dark');
    if (darkElement) {
      darkElement.classList.remove('dark');
    }
  }, []);
  const pages = [
    {
      href: '/about',
      label: 'about',
    },

    {
      href: '/contact',
      label: 'contact',
    },

    {
      href: '/home',
      label: 'home',
    },

    {
      href: '/portfolio_gallery',
      label: 'portfolio_gallery',
    },

    {
      href: '/faq',
      label: 'FAQ',
    },
  ];

  const features_points = [
    {
      name: 'Dynamic Personality Builder',
      description:
        'Craft unique personalities for your AI characters with our dynamic builder. Customize traits and attributes to ensure your characters are truly one-of-a-kind.',
      icon: 'mdiAccountCircle',
    },
    {
      name: 'Advanced Scenario Simulation',
      description:
        'Test your characters in various scenarios to see how they react and adapt. This feature helps refine interactions and improve character depth.',
      icon: 'mdiPlayCircleOutline',
    },
    {
      name: 'Comprehensive Version Control',
      description:
        "Keep track of your character's evolution with our comprehensive version control system. Easily revert to previous versions or explore new development paths.",
      icon: 'mdiHistory',
    },
  ];

  const [images, setImages] = useState([]);
  const pexelsQueriesWebSite = [
    'Team collaborating on AI design',
    'Developers brainstorming character features',
    'Creative process in action',
    'AI character sketches and concepts',
    'Innovative technology in use',
    'User interface design session',
  ];
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const images = await getMultiplePexelsImages(pexelsQueriesWebSite);
        const formattedImages = images.map((image) => ({
          src: image.src || undefined,
          photographer: image.photographer || undefined,
          photographer_url: image.photographer_url || undefined,
        }));
        setImages(formattedImages);
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };

    fetchImages();
  }, []);

  return (
    <div className='flex flex-col min-h-screen'>
      <Head>
        <title>{`About Us - Discover ${projectName}`}</title>
        <meta
          name='description'
          content={`Learn more about ${projectName}, our mission, values, and the innovative features that empower creators to develop unique AI characters.`}
        />
      </Head>
      <WebSiteHeader projectName={'Character dev ai'} pages={pages} />
      <main className={`flex-grow    bg-white  rounded-none  `}>
        <HeroSection
          projectName={'Character dev ai'}
          image={['Team collaborating on project']}
          mainText={`Explore the Vision Behind ${projectName}`}
          subTitle={`Discover the mission and values that drive ${projectName}. Learn how we empower creators to bring their AI characters to life with innovative tools and features.`}
          design={HeroDesigns.IMAGE_BG || ''}
          buttonText={`Our Story`}
        />

        <AboutUsSection
          projectName={'Character dev ai'}
          image={['Creative team brainstorming session']}
          mainText={`The Heart of ${projectName}`}
          subTitle={`At ${projectName}, we are passionate about empowering creators with cutting-edge tools to develop AI characters. Our team is dedicated to innovation and excellence, ensuring a seamless experience for all users.`}
          design={AboutUsDesigns.IMAGE_LEFT || ''}
          buttonText={`Meet Our Team`}
        />

        <FeaturesSection
          projectName={'Character dev ai'}
          image={['Innovative AI features illustration']}
          withBg={0}
          features={features_points}
          mainText={`Innovative Features of ${projectName}`}
          subTitle={`Explore the powerful features that make ${projectName} the ultimate tool for AI character development. Enhance your creative process with these innovative solutions.`}
          design={FeaturesDesigns.CARDS_GRID_WITH_ICONS_DIVERSITY || ''}
        />

        <GalleryPortfolioSection
          projectName={'Character dev ai'}
          images={images}
          mainText={`Visual Journey of ${projectName}`}
          design={GalleryPortfolioDesigns.HORIZONTAL_WITH_BUTTONS || ''}
        />

        <ContactFormSection
          projectName={'Character dev ai'}
          design={ContactFormDesigns.WITH_IMAGE || ''}
          image={['Person typing on laptop']}
          mainText={`Get in Touch with ${projectName} `}
          subTitle={`We'd love to hear from you! Reach out to us with any questions or feedback, and our team will respond promptly.`}
        />
      </main>
      <WebSiteFooter projectName={'Character dev ai'} pages={pages} />
    </div>
  );
}

WebSite.getLayout = function getLayout(page: ReactElement) {
  return <LayoutGuest>{page}</LayoutGuest>;
};
