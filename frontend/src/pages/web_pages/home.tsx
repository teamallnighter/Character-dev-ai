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
  FeaturesDesigns,
  GalleryPortfolioDesigns,
  AboutUsDesigns,
  FaqDesigns,
} from '../../components/WebPageComponents/designs';

import HeroSection from '../../components/WebPageComponents/HeroComponent';

import FeaturesSection from '../../components/WebPageComponents/FeaturesComponent';

import GalleryPortfolioSection from '../../components/WebPageComponents/GalleryPortfolioComponent';

import { getMultiplePexelsImages } from '../../helpers/pexels';

import AboutUsSection from '../../components/WebPageComponents/AboutUsComponent';

import FaqSection from '../../components/WebPageComponents/FaqComponent';

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
      name: 'Image Upload',
      description:
        'Easily upload images to visually personalize your AI characters. This feature allows you to bring your characters to life with unique visuals.',
      icon: 'mdiImage',
    },
    {
      name: 'Personality Development',
      description:
        "Define and develop your character's personality with a set of traits and attributes. Ensure consistent behavior across various scenarios.",
      icon: 'mdiAccount',
    },
    {
      name: 'Scenario Simulation',
      description:
        'Create and simulate scenarios to see how your AI character reacts in different contexts. This feature helps in refining character interactions.',
      icon: 'mdiPlayCircle',
    },
  ];

  const [images, setImages] = useState([]);
  const pexelsQueriesWebSite = [
    'AI character development process',
    'Creative personality traits illustration',
    'Scenario simulation with AI characters',
    'Version control for character evolution',
    'Modern AI character design',
    'Interactive AI character scenarios',
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

  const faqs = [
    {
      question: 'How do I upload an image for my AI character?',
      answer:
        "To upload an image, simply navigate to the character creation page and click on the 'Upload Image' button. You can select an image from your device to represent your AI character.",
    },
    {
      question: 'Can I change the personality traits of my character?',
      answer:
        "Yes, you can easily modify the personality traits of your character. Go to the character's profile and update the traits and attributes to reflect the desired personality.",
    },
    {
      question: 'How does version control work in ${projectName}?',
      answer:
        'Version control allows you to track changes made to your AI character. Each update creates a new version, enabling you to revert to previous versions if needed.',
    },
    {
      question: 'Is there a limit to the number of characters I can create?',
      answer:
        'There is no limit to the number of characters you can create. Feel free to explore and develop as many AI characters as you like.',
    },
    {
      question: 'What scenarios can I simulate with my AI character?',
      answer:
        'You can simulate a wide range of scenarios to see how your AI character reacts. This includes social interactions, problem-solving situations, and more.',
    },
    {
      question: 'Is there a cost associated with using ${projectName}?',
      answer:
        'Currently, ${projectName} offers a free version with basic features. For advanced features and capabilities, you may need to subscribe to a premium plan.',
    },
  ];

  return (
    <div className='flex flex-col min-h-screen'>
      <Head>
        <title>{`AI Character Development App - Create and Evolve Your Characters`}</title>
        <meta
          name='description'
          content={`Discover our AI Character Development App, where creators can upload images, define personalities, and manage character versions with ease. Start developing your unique AI characters today!`}
        />
      </Head>
      <WebSiteHeader projectName={'Character dev ai'} pages={pages} />
      <main className={`flex-grow    bg-white  rounded-none  `}>
        <HeroSection
          projectName={'Character dev ai'}
          image={['AI character creation illustration']}
          mainText={`Unleash Creativity with AI Characters`}
          subTitle={`Explore the ${projectName} to create, develop, and evolve your unique AI characters. Upload images, define personalities, and manage versions effortlessly.`}
          design={HeroDesigns.IMAGE_RIGHT || ''}
          buttonText={`Start Creating`}
        />

        <FeaturesSection
          projectName={'Character dev ai'}
          image={['AI character features illustration']}
          withBg={0}
          features={features_points}
          mainText={`Discover Key Features of ${projectName}`}
          subTitle={`Unlock the full potential of your AI characters with these powerful features. Experience seamless creation and development with ${projectName}.`}
          design={FeaturesDesigns.CARDS_GRID_WITH_ICONS || ''}
        />

        <GalleryPortfolioSection
          projectName={'Character dev ai'}
          images={images}
          mainText={`Showcase Your AI Creations`}
          design={GalleryPortfolioDesigns.OVERLAPPING_CENTRAL_IMAGE || ''}
        />

        <AboutUsSection
          projectName={'Character dev ai'}
          image={['Team working on AI project']}
          mainText={`Empowering Creators with ${projectName}`}
          subTitle={`At ${projectName}, we are dedicated to providing creators with the tools they need to bring their AI characters to life. Our platform is designed to be intuitive, modern, and powerful, enabling seamless character development.`}
          design={AboutUsDesigns.IMAGE_LEFT || ''}
          buttonText={`Learn More`}
        />

        <FaqSection
          projectName={'Character dev ai'}
          design={FaqDesigns.ACCORDION || ''}
          faqs={faqs}
          mainText={`Frequently Asked Questions about ${projectName} `}
        />
      </main>
      <WebSiteFooter projectName={'Character dev ai'} pages={pages} />
    </div>
  );
}

WebSite.getLayout = function getLayout(page: ReactElement) {
  return <LayoutGuest>{page}</LayoutGuest>;
};
