import { useEffect, useState } from 'react';
import { animated, Transition } from 'react-spring';

import { Logo } from '@components/logo';
import { totalAnimationTime } from './animation.constants';
import { StyledAnimation } from './animation.styles';
import { IAnimationProps } from './animation.typings';

export const Animation: React.FC<IAnimationProps> = ({ element }) => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShow(false), totalAnimationTime);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Transition items={show} enter={{ opacity: 1 }} leave={{ opacity: 0 }} from={{ opacity: 1 }}>
        {(styles, item) =>
          item && (
            <animated.div style={styles}>
              <StyledAnimation>
                <i></i>
                <Logo isWhite />
              </StyledAnimation>
            </animated.div>
          )
        }
      </Transition>
      {element}
    </>
  );
};
