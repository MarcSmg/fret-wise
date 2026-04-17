import type { ComponentPropsWithRef, ElementType, ReactNode } from 'react';

interface HeadingProps extends ComponentPropsWithRef<"h1"> {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  children: ReactNode;
  className?: string;
}

const Heading = ({ level = 1, children, className = "" }: HeadingProps) => {
  const baseStyles = "text-content font-bold tracking-tight";
  
  const levels: Record<number, string> = {
    1: "text-3xl md:text-4xl mb-6",
    2: "text-2xl md:text-3xl mb-4",
    3: "text-xl mb-2",
    4: "text-lg mb-1",
  };

  // Define the tag dynamically as an ElementType
  const Tag = `h${level}` as ElementType;

  return (
    <Tag className={`${baseStyles} ${levels[level]} ${className}`}>
      {children}
    </Tag>
  );
};

export default Heading;