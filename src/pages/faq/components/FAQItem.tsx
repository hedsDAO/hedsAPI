import { useState, FC } from 'react';
import { Box, Collapse, Text, Button } from '@chakra-ui/react';

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
    <Box>
      <Button onClick={handleToggle} width="100%" justifyContent="space-between">
        {question}
      </Button>
      <Collapse in={isOpen}>
        <Text mt={4} color="white">
          {answer}
        </Text>
      </Collapse>
    </Box>
  );
};
