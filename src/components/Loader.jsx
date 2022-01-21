import React from 'react';
import styled, { keyframes } from 'styled-components';

const AnimationWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
`;

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const Animation = styled.div`
  width: 120px;
  height: 120px;
  border: 14px solid transparent;
  border-top: 14px solid rgb(220, 220, 220);
  border-radius: 50%;
  animation: ${spin} 2s linear infinite;
`;

const Loader = () => (
  <AnimationWrapper>
    <Animation />
  </AnimationWrapper>
);

export default Loader
