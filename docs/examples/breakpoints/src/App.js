import { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import { below, breakpoints } from './dist/index.esm';

const stripNonDigits = (string) => Number(string.replace(/\D/g, ''));

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 80px;
  background-color: #ff8811;

  ${below('small')`
    background-color: #ff8811f81;
  `};
`;

const Block = styled.div`
  height: 100px;
  display: block;
  padding-top: 38px;
  text-align: center;
  font-size: 16px;
  color: #1f51ff;
  background-color: #ffffff;
  border: 1px solid #aabbff;
  border-radius: 4px;

  ${({ currentScreenWidth, currentBreakpoint, size }) => css`
    width: ${100 / size}%;

    ${currentScreenWidth < currentBreakpoint &&
    css`
      color: #ffffff;
      background-color: #1f51ff;

      &::after {
        content: ' 👈';
      }
    `};
  `};
`;

function App() {
  const [currentScreenWidth, setCurrentScreenWidth] = useState(
    window.innerWidth
  );

  useEffect(() => {
    const updateWidth = () => setCurrentScreenWidth(window.innerWidth);

    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  return (
    <Wrapper>
      <h2>Current screen width: {currentScreenWidth}px</h2>
      <Block
        currentScreenWidth={currentScreenWidth}
        currentBreakpoint={stripNonDigits(breakpoints('below', 'small'))}
        size={1.8}
      >
        {breakpoints('below', 'small')}
      </Block>
      <Block
        currentScreenWidth={currentScreenWidth}
        currentBreakpoint={stripNonDigits(breakpoints('below', 'medium'))}
        size={1.6}
      >
        {breakpoints('below', 'medium')}
      </Block>
      <Block
        currentScreenWidth={currentScreenWidth}
        currentBreakpoint={stripNonDigits(breakpoints('below', 'large'))}
        size={1.4}
      >
        {breakpoints('below', 'large')}
      </Block>
      <Block
        currentScreenWidth={currentScreenWidth}
        currentBreakpoint={stripNonDigits(breakpoints('below', 'xlarge'))}
        size={1.2}
      >
        {breakpoints('below', 'xlarge')}
      </Block>
    </Wrapper>
  );
}

export default App;
