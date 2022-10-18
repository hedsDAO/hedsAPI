const timeline = [
  {
    name: 'Sample',
    description:
      'A sample is provided by an artist and made available for download on the site. Artists can download the sample stems and must use at least 1 second of the sample in their submissions.',
  },
  {
    name: 'Submissions',
    description:
      'Artists create and submit their own tracks conforming only with the bpm and using at least 1 second of the sample. Submissions should be between 60 and 70 seconds as the final submissions will be mixed into the final tape.',
  },
  {
    name: 'Vote',
    description:
      'The community votes on their favorite submissions. Voting power is determined from hedsTAPE(s) ownership. hedsTAPE(s) with a higher ratio of owners to tapes minted in the specific collection will have a higher voting power.',
  },
  {
    name: 'Curation',
    description:
      'The 20 submissions with the most votes will then be sent to the sample curator who will then select the final 10 submissions for the tape. If this number is less than 20, the curation step will move to the sample provider and ETH from the treasury will be distributed evenly to those who submitted.',
  },
  {
    name: 'Mint',
    description: 'The artists on the tape receive 75% of the initial mint, the remaining 25% goes to the treasury.',
  },
];

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ');
}

export const About = () => {
  return (
    <div className="relative pb-10 lg:py-5 overflow-hidden bg-[#f5f5f5]">
      <div className="relative px-4 sm:px-6 lg:px-8">
        <div className="text-lg max-w-6xl mx-auto">
          <h1>
            <span className="block text-base text-left text-fuchsia-500 tracking-wide">heds / hedsDAO</span>
            <span className="mt-2 block text-3xl text-left leading-8 font-extrabold tracking-tight text-neutral-700 dark:text-neutral-300 sm:text-4xl">
              HOW IT STARTED
            </span>
          </h1>
          <p className="text-neutral-500 text-base mt-6 text-left">
            <span className="text-neutral-700 dark:text-neutral-400 font-medium">{`Heds started as a simple twitter group chat. `}</span>
            {`10 producers, 2 software
						engineers, 1 sample, and some simple guidelines. No genre restrictions. Engineering went to work creating the first
						version of the heds interface that you see today, and the artists went about throwing together a completely
						unprecedented audio-visual experience. By sheer power of will & dedication to publishing forward-thinking art, we
						released the hedsTAPE 01 contract onto ETH mainnet. This set into motion a pattern of monthly curation cycles. With
						each cycle, we’re testing the boundaries of what it means to create a collaborative art piece.`}
          </p>
        </div>
        <hr className="border-neutral-700 h-2 max-w-6xl mx-auto w-full my-10 " />
        <div className="max-w-6xl text-gray-500 mx-auto px-3">
          <nav aria-label="Progress">
            <ol role="list" className="overflow-hidden">
              {timeline.map((step, stepIdx) => (
                <li key={step.name} className={classNames(stepIdx !== timeline.length - 1 ? 'pb-10' : '', 'relative')}>
                  {stepIdx !== timeline.length - 1 ? (
                    <div className="-ml-px absolute mt-0.5 top-4 left-4 w-0.5 h-full bg-fuchsia-700" aria-hidden="true" />
                  ) : null}
                  <div className="relative flex items-start group">
                    <span className="h-9 flex items-center">
                      <span className="relative z-10 w-8 h-8 flex items-center justify-center bg-white dark:bg-[#202020] text-fuchsia-600 dark:text-fuchsia-400 border-2 border-fuchsia-900 rounded-full">
                        {stepIdx + 1}
                      </span>
                    </span>
                    <span className="ml-4 min-w-0 flex flex-col">
                      <span className="text-lg dark:font-medium text-fuchsia-500 dark:text-fuchsia-300 font-base tracking-wide uppercase mb-1">
                        {step.name}
                      </span>
                      <span className="text-sm text-gray-500">{step.description}</span>
                    </span>
                  </div>
                </li>
              ))}
            </ol>
          </nav>
        </div>
      </div>
    </div>
  );
};
