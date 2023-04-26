import AudioPlayer from '@/components/GlobalAudio/components/AudioPlayer';

/**
 * @function GlobalAudio A higher-order component that wraps its child components with a global audio player.
 * @param {React.ReactNode} children - The child components to be wrapped by the global audio player.
 * @returns {JSX.Element} The wrapped child components.
 */

export const GlobalAudio = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {children}
      <AudioPlayer />
    </>
  );
};
