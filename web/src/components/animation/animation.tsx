import { useEffect, useState } from 'react';
import { animated, Transition } from 'react-spring';

import { Logo } from '@components/logo';

import { totalAnimationTime } from './animation.constants';

import { StyledAnimation } from './animation.styles';

export const Animation: React.FC = () => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    setTimeout(() => setShow(false), totalAnimationTime);
  }, []);

  return (
    <Transition items={show} enter={{ opacity: 1 }} leave={{ opacity: 0 }} from={{ opacity: 1 }}>
      {(styles, item) =>
        item && (
          <animated.div style={styles}>
            <StyledAnimation>
              <span></span>
              <Logo isWhite />
            </StyledAnimation>
          </animated.div>
        )
      }
    </Transition>
  );
};
