import { useSelector } from 'react-redux';
import { store } from '@/store';
import { Link, Heading, Image, AspectRatio, Divider } from '@chakra-ui/react';
import { Header } from '../components';

export const Collab = () => {
  const collabTapes = useSelector(store.select.tapesModel.selectAllCollabTapes);
  return (
    <div className="">
      <Header />
      <div className="max-w-5xl mx-auto w-full lg:px-3 px-5 mt-5 lg:mt-10">
        <Heading fontWeight={'bold'} letterSpacing={'tight'} size={{ base: 'lg', lg: 'xl' }} color={'blackAlpha.900'}>
          Collaborations
        </Heading>
        <Divider mt={3} mb={5} />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {collabTapes &&
            Object.values(collabTapes)
              ?.reverse()
              ?.map((tape, index) => {
                return (
                  <div key={tape.contract + index} className="group bg-gray-50 relative border border-gray-200 col-span-1 rounded-md shadow-sm">
                    <AspectRatio ratio={1}>
                      <Image w="full" src={tape.image} alt={tape.name} objectFit="cover" roundedTop={'md'} />
                    </AspectRatio>
                    <div className="flex flex-col justify-center">
                      <div className="flex flex-col justify-center">
                        <h3 className="text-sm text-gray-900 font-semibold tracking-widest p-4 w-full">
                          <Link href={tape.route}>
                            {tape.name}
                            <span aria-hidden="true" className="absolute inset-0 truncate" />
                          </Link>
                        </h3>
                      </div>
                    </div>
                  </div>
                );
              })}
        </div>
      </div>
    </div>
  );
};
