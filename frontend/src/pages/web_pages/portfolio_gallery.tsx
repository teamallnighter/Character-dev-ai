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
  GalleryPortfolioDesigns,
  AboutUsDesigns,
  ContactFormDesigns,
} from '../../components/WebPageComponents/designs';

import HeroSection from '../../components/WebPageComponents/HeroComponent';

import GalleryPortfolioSection from '../../components/WebPageComponents/GalleryPortfolioComponent';

import { getMultiplePexelsImages } from '../../helpers/pexels';

import AboutUsSection from '../../components/WebPageComponents/AboutUsComponent';

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

  const [images, setImages] = useState([]);
  const pexelsQueriesWebSite = [
    'Futuristic AI character design',
    'AI character in action scene',
    'Creative AI character concepts',
    'Diverse AI character personalities',
    'AI character development process',
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

  return (
    <div className='flex flex-col min-h-screen'>
      <Head>
        <title>{`Explore Our AI Character Portfolio`}</title>
        <meta
          name='description'
          content={`Discover the diverse range of AI characters created with ${projectName}. Explore our portfolio to see the creativity and innovation in action.`}
        />
      </Head>
      <WebSiteHeader projectName={'Character dev ai'} pages={pages} />
      <main className={`flex-grow    bg-white  rounded-none  `}>
        <HeroSection
          projectName={'Character dev ai'}
          image={['AI character portfolio showcase']}
          mainText={`Discover Our AI Character Creations`}
          subTitle={`Explore the innovative and diverse AI characters crafted using ${projectName}. Dive into our portfolio to witness creativity and technology in harmony.`}
          design={HeroDesigns.IMAGE_BG || ''}
          buttonText={`View Gallery`}
        />

        <GalleryPortfolioSection
          projectName={'Character dev ai'}
          images={images}
          mainText={`Showcase of AI Character Innovations`}
          design={GalleryPortfolioDesigns.OVERLAPPING_CENTRAL_IMAGE || ''}
        />

        <AboutUsSection
          projectName={'Character dev ai'}
          image={['Team discussing AI strategies']}
          mainText={`The Vision Behind ${projectName}`}
          subTitle={`At ${projectName}, we are committed to pushing the boundaries of AI character development. Our mission is to empower creators with innovative tools and a supportive community.`}
          design={AboutUsDesigns.IMAGE_RIGHT || ''}
          buttonText={`Learn More`}
        />

        <ContactFormSection
          projectName={'Character dev ai'}
          design={ContactFormDesigns.WITH_IMAGE || ''}
          image={['Person using contact form']}
          mainText={`Connect with ${projectName} Team `}
          subTitle={`Have questions or feedback? Reach out to us anytime, and our team will get back to you promptly. We value your input and are here to help.`}
        />
      </main>
      <WebSiteFooter projectName={'Character dev ai'} pages={pages} />
    </div>
  );
}

WebSite.getLayout = function getLayout(page: ReactElement) {
  return <LayoutGuest>{page}</LayoutGuest>;
};
