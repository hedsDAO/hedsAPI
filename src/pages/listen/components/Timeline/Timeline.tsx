import { RootState } from '@/store';
import { classNames } from '@/utils';
import { Box, Container, Flex, ListItem, Text, UnorderedList } from '@chakra-ui/react';
import { CheckIcon } from '@heroicons/react/24/solid';
import { IconHourglass } from '@tabler/icons';
import { useSelector } from 'react-redux';

const Timeline = () => {
  const { timeline } = useSelector((state: RootState) => state.hedstapeModel);
  return (
    <>
      <div className="lg:border-t lg:border-b lg:border-gray-200">
        <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Progress">
          <UnorderedList role="list" className="overflow-hidden rounded-md lg:flex lg:rounded-none lg:border-l lg:border-r lg:border-gray-200">
            {timeline &&
              Object.entries(timeline).map(([step, data], i) => (
                <ListItem key={data.name} flex={1} overflow={{ lg: 'hidden' }} pos={'relative'}>
                  <Container
                    className={classNames(
                      i === 0 ? 'border-b-0 rounded-t-md' : '',
                      i === Object.keys(timeline).length - 1 ? 'border-t-0 rounded-b-md' : '',
                      'border border-gray-200 overflow-hidden lg:border-0',
                    )}
                  >
                    {data.status === 'closed' ? (
                      <Container className="group transition-all ease-in-out">
                        <Box
                          className="absolute top-0 left-0 h-full w-1 bg-transparent group-hover:bg-gray-200 lg:bottom-0 lg:top-auto lg:h-1 lg:w-full"
                          aria-hidden="true"
                        />
                        <Flex justifyContent={'center'} alignItems={'center'} pl={i == 0 && { lg: '9' }} px={4} py={5} gap={2} fontSize={'sm'}>
                          <Box flexShrink={0}>
                            <Box className="flex h-7 w-7 items-center justify-center rounded-full bg-green-200">
                              <CheckIcon className="h-4 w-4 text-gray-600" aria-hidden="true" />
                            </Box>
                          </Box>
                          <Flex flexDirection={'column'} className="mt-0.5 ml-4 flex min-w-0 flex-col" gap={1}>
                            <Text className="text-sm font-medium">{data.name}</Text>
                            <Text className="text-xs font-medium text-gray-500">{data.description}</Text>
                          </Flex>
                        </Flex>
                      </Container>
                    ) : data.status === 'closed' ? (
                      <Container className="group transition-all ease-in-out">
                        <Box
                          className="absolute top-0 left-0 h-full w-1 group-hover:bg-green-400 bg-green-600 lg:bottom-0 lg:top-auto lg:h-1 lg:w-full"
                          aria-hidden="true"
                        />
                        <Flex justifyContent={'center'} alignItems={'center'} pl={i == 0 && { lg: '9' }} px={4} py={5} gap={2} fontSize={'sm'}>
                          <Box flexShrink={0}>
                            <Box className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-green-600">
                              <CheckIcon className="h-4 w-4 text-gray-600" aria-hidden="true" />
                            </Box>
                          </Box>
                          <Flex flexDirection={'column'} className="mt-0.5 ml-4 flex min-w-0 flex-col" gap={1}>
                            <Text className="text-sm font-medium">{data.name}</Text>
                            <Text className="text-xs font-medium text-gray-500">{data.description}</Text>
                          </Flex>
                        </Flex>
                      </Container>
                    ) : (
                      <Container className="group transition-all ease-in-out">
                        <Box
                          className="absolute top-0 left-0 h-full w-1 bg-transparent group-hover:bg-gray-200 lg:bottom-0 lg:top-auto lg:h-1 lg:w-full"
                          aria-hidden="true"
                        />
                        <Flex justifyContent={'center'} alignItems={'center'} pl={i == 0 && { lg: '9' }} px={4} py={5} gap={2} fontSize={'sm'}>
                          <Box flexShrink={0}>
                            <Box className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-gray-300">
                              <IconHourglass className="h-4 w-4 text-gray-600" aria-hidden="true" />
                            </Box>
                          </Box>
                          <Flex flexDirection={'column'} className="mt-0.5 ml-4 flex min-w-0 flex-col" gap={1}>
                            <Text className="text-sm font-medium">{data.name}</Text>
                            <Text className="text-xs font-medium text-gray-500">{data.description}</Text>
                          </Flex>
                        </Flex>
                      </Container>
                    )}
                    {i !== 0 ? (
                      <>
                        <div className="absolute inset-0 top-0 left-0 hidden w-3 lg:block" aria-hidden="true">
                          <svg className="h-full w-full text-gray-300" viewBox="0 0 12 82" fill="none" preserveAspectRatio="none">
                            <path d="M0.5 0V31L10.5 41L0.5 51V82" stroke="currentcolor" vectorEffect="non-scaling-stroke" />
                          </svg>
                        </div>
                      </>
                    ) : null}
                  </Container>
                </ListItem>
              ))}
          </UnorderedList>
        </nav>
      </div>
    </>
  );
};

export default Timeline;
