import { FC } from 'react';
import { VStack, Heading, Container } from '@chakra-ui/react';
import { FAQItem } from '@/pages/faq/components/FAQItem/FAQItem';
import * as styles from '@/pages/faq/screens/styles';

type FAQData = {
  question: string;
  answer: string;
};

const faqData: FAQData[] = [
  {
    question: 'What is heds?',
    answer:
      'heds is a decentralized audio-visual collective. Once a month, heds will release a collaborative mixtape, created and curated by the community, as its own digital collection.',
  },
  {
    question: ' How can I contribute?',
    answer:
      'The best and most productive way to contribute is to participate in community interactions, submitting your work to the monthly tapes, and joining listening parties public Q & A’s.',
  },
  {
    question: 'When is everything happening?',
    answer:
      'Specific announcements will be released as we go, so pay attention to the twitter page, throw on notifications, as well as the #announcements channel in the discord!',
  },
];

export const FAQ: FC = () => {
  return (
    <Container centerContent>
      <VStack {...styles.$stackStyles}>
        <Heading as="h1" {...styles.$headingStyles}>
          Frequently Asked Questions
        </Heading>
        {faqData.map((faqItem, index) => (
          <FAQItem key={index} {...faqItem} />
        ))}
      </VStack>
    </Container>
  );
};
