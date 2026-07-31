import React, { useEffect, useRef } from 'react';

interface AdsterraNativeProps {
  containerId: string;
  scriptSrc: string;
  className?: string;
}

const AdsterraNative: React.FC<AdsterraNativeProps> = ({
  containerId,
  scriptSrc,
  className = ''
}) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const loaded = useRef(false);

  useEffect(() => {
    if (loaded.current) return;
    loaded.current = true;

    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    // Add the container div
    const container = document.createElement('div');
    container.id = containerId;
    wrapper.appendChild(container);

    // Load the script dynamically
    const script = document.createElement('script');
    script.async = true;
    script.setAttribute('data-cfasync', 'false');
    script.src = scriptSrc;
    wrapper.appendChild(script);

    return () => {
      if (wrapper) wrapper.innerHTML = '';
      loaded.current = false;
    };
  }, [containerId, scriptSrc]);

  return (
    <div ref={wrapperRef} className={`w-full overflow-hidden ${className}`} />
  );
};

export default AdsterraNative;
