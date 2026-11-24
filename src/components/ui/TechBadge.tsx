import { CSSProperties, FC } from 'react';
import { getTechIcon } from '../../data/techIcons';

interface TechBadgeProps {
  name: string;
  className?: string;
  iconClassName?: string;
  style?: CSSProperties;
}

/** Technology label preceded by its official logo in brand color */
const TechBadge: FC<TechBadgeProps> = ({ name, className = '', iconClassName = 'w-3.5 h-3.5', style }) => {
  const tech = getTechIcon(name);
  return (
    <span className={`inline-flex items-center gap-1.5 ${className}`} style={style}>
      {tech && <tech.Icon className={`shrink-0 ${iconClassName}`} style={{ color: tech.color }} aria-hidden="true" />}
      {name}
    </span>
  );
};

export default TechBadge;
