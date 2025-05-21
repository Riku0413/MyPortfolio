'use client';

import { Timeline } from '@mantine/core';
import { useEffect, useState, useRef } from 'react';

export default function TableOfContents({ content }: { content: string }) {
  const [headings, setHeadings] = useState<{ id: string; text: string; level: number }[]>([]);
  const [isFixed, setIsFixed] = useState(false);
  const [activeHeading, setActiveHeading] = useState<string>('');
  const tocRef = useRef<HTMLDivElement>(null);
  const initialTopRef = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, 'text/html');
    const headingElements = doc.querySelectorAll('h1, h2, h3, h4, h5, h6');
    
    const headingData = Array.from(headingElements).map((heading) => {
      const id = heading.textContent?.toLowerCase().replace(/\s+/g, '-') || '';
      return {
        id,
        text: heading.textContent || '',
        level: parseInt(heading.tagName[1])
      };
    });

    setHeadings(headingData);

    const markdownContent = document.querySelector('.markdown');
    if (markdownContent) {
      const domHeadings = markdownContent.querySelectorAll('h1, h2, h3, h4, h5, h6');
      domHeadings.forEach((heading, index) => {
        if (!heading.id) {
          heading.id = headingData[index]?.id || '';
        }
      });
    }
  }, [content]);

  useEffect(() => {
    const updateDimensions = () => {
      if (!tocRef.current || !containerRef.current) return;
      initialTopRef.current = containerRef.current.getBoundingClientRect().top + window.scrollY;
    };

    const handleScroll = () => {
      if (!tocRef.current || !containerRef.current) return;
      
      const containerRect = containerRef.current.getBoundingClientRect();
      const scrollY = window.scrollY;
      const tocHeight = tocRef.current.offsetHeight;
      const viewportHeight = window.innerHeight;
      const fixedPosition = 100; // 固定位置の上部からの距離
      
      // 目次が実際に固定位置に到達した時点で固定状態に切り替える
      const shouldBeFixed = scrollY + fixedPosition >= initialTopRef.current!;
      
      if (shouldBeFixed !== isFixed) {
        setIsFixed(shouldBeFixed);
      }

      const markdownContent = document.querySelector('.markdown');
      if (!markdownContent) return;

      const headingElements = Array.from(markdownContent.querySelectorAll('h1, h2, h3, h4, h5, h6'));
      if (headingElements.length === 0) return;

      const headingPositions = headingElements.map(element => ({
        id: element.id || element.textContent?.toLowerCase().replace(/\s+/g, '-') || '',
        top: element.getBoundingClientRect().top + window.scrollY,
        bottom: element.getBoundingClientRect().bottom + window.scrollY
      }));

      const currentScrollPosition = window.scrollY + fixedPosition;
      const currentHeading = headingPositions.find((heading, index) => {
        const nextHeading = headingPositions[index + 1];
        return currentScrollPosition >= heading.top && 
               (!nextHeading || currentScrollPosition < nextHeading.top);
      });

      if (currentHeading) {
        setActiveHeading(currentHeading.id);
      } else {
        setActiveHeading('');
      }
    };

    const handleResize = () => {
      updateDimensions();
      handleScroll();
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    
    // 初期化
    updateDimensions();
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, [isFixed]);

  const activeIndex = headings.findIndex(h => h.id === activeHeading);

  return (
    <div ref={containerRef} className="w-full md:w-64">
      <div 
        ref={tocRef}
        className={`p-4 rounded shadow bg-white transition-all duration-200 ${isFixed ? 'fixed top-[100px]' : ''} hidden md:block`}
        style={isFixed ? { width: 'inherit' } : undefined}
      >
        <h2 className="text-lg font-bold mb-4">Contents</h2>
        <Timeline color="cyan" active={activeIndex} bulletSize={20} lineWidth={3}>
          {headings.map((heading, index) => (
            <Timeline.Item 
              key={index} 
              title={
                <a 
                  href={`#${heading.id}`}
                  className="text-sm transition-colors"
                  style={{ 
                    marginLeft: `${(heading.level - 1) * 1}rem`,
                    fontWeight: heading.id === activeHeading ? '700' : '600',
                    color: heading.id === activeHeading ? 'inherit' : '#999999',
                    fontSize: '14px'
                  }}
                >
                  {heading.text}
                </a>
              } 
            />
          ))}
        </Timeline>
      </div>
    </div>
  );
} 