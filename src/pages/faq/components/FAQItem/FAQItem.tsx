import { useState, FC } from 'react';
import { Box, Collapse, Flex, Text, Button } from '@chakra-ui/react';
import { FiPlus, FiMinus } from 'react-icons/fi';
import * as styles from '@pages/faq/components/FAQItem/styles';

interface FAQItemProps {
  question: string;
  answer: string;
}

export const FAQItem: FC<FAQItemProps> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Box width="100%">
      <Button onClick={handleToggle} {...styles.$buttonStyles}>
        <Flex {...styles.$flexStyles}>
          <Text {...styles.$questionStyles}>{question}</Text>
          {isOpen ? <FiMinus color="white" /> : <FiPlus color="white" />}
        </Flex>
      </Button>
      <Collapse in={isOpen}>
        <Box {...styles.$boxStyles}>
          <Text {...styles.$answerStyles}>{answer}</Text>
        </Box>
      </Collapse>
    </Box>
  );
};
