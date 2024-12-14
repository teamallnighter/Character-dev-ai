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
  ContactFormDesigns,
  FaqDesigns,
  AboutUsDesigns,
} from '../../components/WebPageComponents/designs';

import HeroSection from '../../components/WebPageComponents/HeroComponent';

import ContactFormSection from '../../components/WebPageComponents/ContactFormComponent';

import FaqSection from '../../components/WebPageComponents/FaqComponent';

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
      question: 'How do I start creating an AI character?',
      answer:
        "To start creating an AI character, log in to your account and navigate to the character creation section. Follow the prompts to upload an image and define your character's personality.",
    },
    {
      question: "Can I update my character's traits later?",
      answer:
        "Yes, you can update your character's traits at any time. Simply go to the character's profile and make the necessary changes to the traits and attributes.",
    },
    {
      question: 'What is the cost of using ${projectName}?',
      answer:
        '${projectName} offers a free version with basic features. For access to advanced features, you may need to subscribe to a premium plan. Check our pricing page for more details.',
    },
    {
      question: 'How can I simulate scenarios for my character?',
      answer:
        "You can simulate scenarios by selecting the 'Scenario Simulation' option in your character's profile. This allows you to test how your character reacts in different situations.",
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
        <title>{`Contact Us - Get in Touch with ${projectName}`}</title>
        <meta
          name='description'
          content={`Reach out to the ${projectName} team for any inquiries or support. We're here to assist you with all your AI character development needs.`}
        />
      </Head>
      <WebSiteHeader projectName={'Character dev ai'} pages={pages} />
      <main className={`flex-grow    bg-white  rounded-none  `}>
        <HeroSection
          projectName={'Character dev ai'}
          image={['Customer support team assisting']}
          mainText={`Reach Out to ${projectName} Team`}
          subTitle={`We're here to help with any questions or support you need. Connect with us to enhance your experience with ${projectName}.`}
          design={HeroDesigns.IMAGE_LEFT || ''}
          buttonText={`Contact Us`}
        />

        <FaqSection
          projectName={'Character dev ai'}
          design={FaqDesigns.ACCORDION || ''}
          faqs={faqs}
          mainText={`Common Questions about ${projectName} `}
        />

        <AboutUsSection
          projectName={'Character dev ai'}
          image={['Team collaborating on project']}
          mainText={`Discover the Story of ${projectName}`}
          subTitle={`At ${projectName}, we are passionate about empowering creators with innovative tools for AI character development. Our mission is to blend creativity with technology, providing a seamless experience for all users.`}
          design={AboutUsDesigns.IMAGE_RIGHT || ''}
          buttonText={`Our Mission`}
        />

        <ContactFormSection
          projectName={'Character dev ai'}
          design={ContactFormDesigns.WITH_IMAGE || ''}
          image={['Person filling contact form']}
          mainText={`Connect with ${projectName} Support `}
          subTitle={`We're available to assist you with any inquiries or feedback. Reach out to us anytime, and we'll respond promptly to ensure your experience with ${projectName} is seamless.`}
        />
      </main>
      <WebSiteFooter projectName={'Character dev ai'} pages={pages} />
    </div>
  );
}

WebSite.getLayout = function getLayout(page: ReactElement) {
  return <LayoutGuest>{page}</LayoutGuest>;
};
