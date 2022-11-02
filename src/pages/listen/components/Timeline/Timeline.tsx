import { Dispatch, RootState } from '@/store';
import { classNames } from '@/utils';
import { Box, Container, Flex } from '@chakra-ui/react';
import { CheckIcon } from '@heroicons/react/24/solid';
import { useDispatch, useSelector } from 'react-redux';

const Timeline = () => {
  const dispatch = useDispatch<Dispatch>();
  const { timeline } = useSelector((state: RootState) => state.hedstapeModel);
  return (
    <>
      <div className="lg:border-t lg:border-b lg:border-gray-200">
        <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Progress">
          <ol role="list" className="overflow-hidden rounded-md lg:flex lg:rounded-none lg:border-l lg:border-r lg:border-gray-200">
            {timeline &&
              Object.entries(timeline).map(([step, data], i) => (
                <li key={data.name} className="relative overflow-hidden lg:flex-1">
                  <div
                    className={classNames(
                      i === 0 ? 'border-b-0 rounded-t-md' : '',
                      i === Object.keys(timeline).length - 1 ? 'border-t-0 rounded-b-md' : '',
                      'border border-gray-200 overflow-hidden lg:border-0',
                    )}
                  >
                    {data.status === 'closed' ? (
                      <Container className="group">
                        <span
                          className="absolute top-0 left-0 h-full w-1 bg-transparent group-hover:bg-gray-200 lg:bottom-0 lg:top-auto lg:h-1 lg:w-full"
                          aria-hidden="true"
                        />
                        <Flex pl={i == 0 && { lg: '9' }} px={6} py={5} fontSize={'sm'}>
                          <Box flexShrink={0}>
                            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600">
                              <CheckIcon className="h-4 w-4 text-white" aria-hidden="true" />
                            </span>
                          </Box>
                        </Flex>
                      </Container>
                    ) : // <div className="group">
                    //   <span
                    //     className="absolute top-0 left-0 h-full w-1 bg-transparent group-hover:bg-gray-200 lg:bottom-0 lg:top-auto lg:h-1 lg:w-full"
                    //     aria-hidden="true"
                    //   />
                    //   <span className={classNames(i !== 0 ? 'lg:pl-9' : '', 'px-6 py-5 flex items-start text-sm font-medium')}>
                    //     <span className="flex-shrink-0">
                    //       <span className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600">
                    //         <CheckIcon className="h-4 w-4 text-white" aria-hidden="true" />
                    //       </span>
                    //     </span>
                    //     <span className="mt-0.5 ml-4 flex min-w-0 flex-col">
                    //       <span className="text-sm font-medium">{data.name}</span>
                    //       <span className="text-xs font-medium text-gray-500">{data.description}</span>
                    //       <span>
                    //         <i className="fa-solid fa-ellipsis" />
                    //       </span>
                    //     </span>
                    //   </span>
                    // </div>
                    data.status === 'current' ? (
                      <div>
                        <span className="absolute top-0 left-0 h-full w-1 bg-indigo-600 lg:bottom-0 lg:top-auto lg:h-1 lg:w-full" aria-hidden="true" />
                        <span className={classNames(i !== 0 ? 'lg:pl-9' : '', 'px-6 py-5 flex items-start text-sm font-medium')}>
                          <span className="flex-shrink-0">
                            <span className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-indigo-600">
                              {/* <span className="text-indigo-600">{step.id}</span> */}
                            </span>
                          </span>
                          <span className="mt-0.5 ml-4 flex min-w-0 flex-col">
                            <span className="text-sm font-medium text-indigo-600">{data.name}</span>
                            <span className="text-xs font-medium text-gray-500">{data.description}</span>
                          </span>
                        </span>
                      </div>
                    ) : (
                      <div className="group">
                        <span
                          className="absolute top-0 left-0 h-full w-1 bg-transparent group-hover:bg-gray-200 lg:bottom-0 lg:top-auto lg:h-1 lg:w-full"
                          aria-hidden="true"
                        />
                        <span className={classNames(i !== 0 ? 'lg:pl-9' : '', 'px-6 py-5 flex items-start text-sm font-medium')}>
                          <span className="flex-shrink-0">
                            <span className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-gray-300">
                              {/* <span className="text-gray-500">{step.id}</span> */}
                            </span>
                          </span>
                          <span className="mt-0.5 ml-4 flex min-w-0 flex-col">
                            <span className="text-sm font-medium text-gray-500">{data.name}</span>
                            <span className="text-xs font-medium text-gray-500">{data.description}</span>
                          </span>
                        </span>
                      </div>
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
                  </div>
                </li>
              ))}
          </ol>
        </nav>
      </div>
    </>
  );
};

export default Timeline;
