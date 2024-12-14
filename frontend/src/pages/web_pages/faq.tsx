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
  FaqDesigns,
  ContactFormDesigns,
  AboutUsDesigns,
} from '../../components/WebPageComponents/designs';

import HeroSection from '../../components/WebPageComponents/HeroComponent';

import FaqSection from '../../components/WebPageComponents/FaqComponent';

import ContactFormSection from '../../components/WebPageComponents/ContactFormComponent';

import AboutUsSection from '../../components/WebPageComponents/AboutUsComponent';

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

  const faqs = [
    {
      question: 'How do I create an AI character?',
      answer:
        "To create an AI character, log in to your account and navigate to the character creation section. Follow the steps to upload an image and define your character's personality traits.",
    },
    {
      question: "Can I modify my character's personality later?",
      answer:
        "Yes, you can update your character's personality traits at any time. Simply access the character's profile and make the necessary changes to the traits and attributes.",
    },
    {
      question: 'What are the pricing options for ${projectName}?',
      answer:
        '${projectName} offers a free version with basic features. For advanced features, you may need to subscribe to a premium plan. Visit our pricing page for more details.',
    },
    {
      question: 'How can I simulate scenarios for my character?',
      answer:
        "You can simulate scenarios by selecting the 'Scenario Simulation' option in your character's profile. This feature allows you to test how your character reacts in different situations.",
    },
    {
      question: 'Is there a limit to the number of characters I can create?',
      answer:
        'There is no limit to the number of characters you can create with ${projectName}. Feel free to explore and develop as many characters as you wish.',
    },
    {
      question: 'How does version control work?',
      answer:
        'Version control allows you to track changes made to your AI character. Each update creates a new version, enabling you to revert to previous versions if needed.',
    },
  ];

  return (
    <div className='flex flex-col min-h-screen'>
      <Head>
        <title>{`Frequently Asked Questions - ${projectName}`}</title>
        <meta
          name='description'
          content={`Find answers to common questions about ${projectName}. Learn more about our features, pricing, and how to get started with AI character development.`}
        />
      </Head>
      <WebSiteHeader projectName={'Character dev ai'} pages={pages} />
      <main className={`flex-grow    bg-white  rounded-none  `}>
        <HeroSection
          projectName={'Character dev ai'}
          image={['Person reading FAQ document']}
          mainText={`Your Questions Answered at ${projectName}`}
          subTitle={`Explore our comprehensive FAQ section to find answers to your questions about ${projectName}. Learn how to make the most of our AI character development tools.`}
          design={HeroDesigns.TEXT_CENTER || ''}
          buttonText={`Explore FAQs`}
        />

        <FaqSection
          projectName={'Character dev ai'}
          design={FaqDesigns.TWO_COLUMN || ''}
          faqs={faqs}
          mainText={`Frequently Asked Questions about ${projectName} `}
        />

        <AboutUsSection
          projectName={'Character dev ai'}
          image={['Team discussing project ideas']}
          mainText={`The Vision Behind ${projectName}`}
          subTitle={`At ${projectName}, we are dedicated to revolutionizing AI character development. Our mission is to empower creators with innovative tools and a supportive community.`}
          design={AboutUsDesigns.IMAGE_LEFT || ''}
          buttonText={`Learn More`}
        />

        <ContactFormSection
          projectName={'Character dev ai'}
          design={ContactFormDesigns.WITH_IMAGE || ''}
          image={['Person using contact form']}
          mainText={`Reach Out to ${projectName} Support `}
          subTitle={`Have more questions or need assistance? Contact us anytime, and our team will respond promptly to ensure you have the best experience with ${projectName}.`}
        />
      </main>
      <WebSiteFooter projectName={'Character dev ai'} pages={pages} />
    </div>
  );
}

WebSite.getLayout = function getLayout(page: ReactElement) {
  return <LayoutGuest>{page}</LayoutGuest>;
};
