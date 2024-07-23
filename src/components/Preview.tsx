import { useEffect, useRef } from 'react';

export const Preview: React.FC<any> = ({ snippet }: PreviewProps) => {
  console.log(snippet);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (iframe) iframe.srcdoc = snippet;
  }, [snippet]);

  return (
    <div className="w-full min-h-[100vh]">
      <iframe ref={iframeRef}></iframe>
    </div>
  );
};

interface PreviewProps {
  snippet: string;
}
