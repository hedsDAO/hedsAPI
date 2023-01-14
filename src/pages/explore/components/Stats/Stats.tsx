import { Box, Container, Heading, SimpleGrid, Stack, Text } from '@chakra-ui/react';

const Stats = () => {
  const stats = [
    { label: 'Tapes Minted', value: '734' },
    { label: 'Value Generated', value: '$234,517' },
    { label: 'Submissions', value: '438' },
  ];
  return (
    <Box bg="" py={{ base: '4', md: '8' }}>
      <Container maxW="4xl" mx="auto">
        <SimpleGrid columns={{ base: 2, md: 3 }} gap={{ base: '5', md: '6' }}>
          {stats.map(({ label, value }) => (
            <Box border="1px" borderColor="black" px={{ base: '3', md: '5' }} py={{ base: '3', md: '3' }} borderRadius="lg" shadow={'md'} key={label}>
              <Stack>
                <Text fontFamily={'"Space Mono", monospace'} textColor="gray.600" fontSize={{ base: 'xs', lg: 'sm' }}>
                  {label}
                </Text>
                <Heading fontFamily={'"Space Mono", monospace'} textColor="gray.800" fontSize={{ base: 'sm', md: 'md', xl: 'lg' }}>
                  {value}
                </Heading>
              </Stack>
            </Box>
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
};

export default Stats;
