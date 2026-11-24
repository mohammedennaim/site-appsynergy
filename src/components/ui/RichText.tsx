import { FC, Fragment } from 'react';

/** Renders a translated string where **double asterisks** mark the highlighted words */
const RichText: FC<{ text: string; strongClassName?: string }> = ({
  text,
  strongClassName = 'text-bw-text-primary font-semibold',
}) => (
  <>
    {text.split(/(\*\*[^*]+\*\*)/).map((part, index) =>
      part.startsWith('**') && part.endsWith('**') ? (
        <span key={index} className={strongClassName}>
          {part.slice(2, -2)}
        </span>
      ) : (
        <Fragment key={index}>{part}</Fragment>
      )
    )}
  </>
);

export default RichText;
