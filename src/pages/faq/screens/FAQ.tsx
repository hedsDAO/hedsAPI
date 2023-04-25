import { FC } from 'react';
import { VStack, Heading, Container } from '@chakra-ui/react';
import { FAQItem } from '@pages/faq/components/FAQItem';

type FAQData = {
  question: string;
  answer: string;
};

const faqData: FAQData[] = [
  {
    question: 'question 1',
    answer: 'answer 1',
  },
  {
    question: 'question 2',
    answer: 'answer 2',
  },
  // Add more questions and answers here.
];

export const FAQPage: FC = () => {
  return (
    <Container centerContent>
      <VStack spacing={6} width="100%">
        <Heading as="h1" size="xl" color="white">
          Frequently Asked Questions
        </Heading>
        {faqData.map((faqItem, index) => (
          <FAQItem key={index} {...faqItem} />
        ))}
      </VStack>
    </Container>
  );
};
