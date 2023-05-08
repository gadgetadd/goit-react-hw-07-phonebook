import { BeatLoader } from 'react-spinners';

import { Wrapper } from './Loader.styled';

export const Loader = () => {
  return (
    <Wrapper>
      <BeatLoader color="#4c93f099" size="25px" />
    </Wrapper>
  );
};
