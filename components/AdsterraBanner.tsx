import React, { useEffect, useRef } from 'react';

interface AdsterraBannerProps {
  adKey: string;
  width: number;
  height: number;
  format?: string;
  className?: string;
}

const AdsterraBanner: React.FC<AdsterraBannerProps> = ({
  adKey,
  width,
  height,
  format = 'iframe',
  className = ''
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.innerHTML = '';

    const iframe = document.createElement('iframe');
    iframe.style.width = `${width}px`;
    iframe.style.height = `${height}px`;
    iframe.style.maxWidth = '100%';
    iframe.style.border = 'none';
    iframe.style.overflow = 'hidden';
    iframe.setAttribute('scrolling', 'no');

    container.appendChild(iframe);

    const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
    if (iframeDoc) {
      iframeDoc.open();
      iframeDoc.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body { margin: 0; padding: 0; display: flex; justify-content: center; align-items: center; background: transparent; }
            </style>
          </head>
          <body>
            <script type="text/javascript">
              atOptions = {
                'key': '${adKey}',
                'format': '${format}',
                'height': ${height},
                'width': ${width},
                'params': {}
              };
            </script>
            <script type="text/javascript" src="https://www.highperformanceformat.com/${adKey}/invoke.js"></script>
          </body>
        </html>
      `);
      iframeDoc.close();
    }
  }, [adKey, width, height, format]);

  return (
    <div className={`flex justify-center items-center my-4 max-w-full overflow-hidden ${className}`}>
      <div ref={containerRef} style={{ width: `${width}px`, height: `${height}px`, maxWidth: '100%' }} />
    </div>
  );
};

export default AdsterraBanner;
