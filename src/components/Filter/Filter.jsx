import { useSelector, useDispatch } from 'react-redux';

import { selectFilter } from 'redux/selectors';
import { setFilter } from 'redux/filterSlice';

import { Label, Input } from './Filter.styled';

export const Filter = () => {
  const filter = useSelector(selectFilter);
  const dispatch = useDispatch();

  const filterHandler = e => {
    const { value } = e.currentTarget;
    dispatch(setFilter(value.toLowerCase()));
  };

  return (
    <Label>
      Find contacts by name:
      <Input
        type="text"
        name="filter"
        value={filter}
        onChange={filterHandler}
      />
    </Label>
  );
};
