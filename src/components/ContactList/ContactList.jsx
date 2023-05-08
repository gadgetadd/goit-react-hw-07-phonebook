import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
  selectIsLoading,
  selectError,
  selectVisibleContacts,
} from 'redux/selectors';

import { fetchContacts, deleteContact } from 'redux/operations';

import { ContactItem } from 'components/ContactItem/ContactItem';
import { List, Error } from './ContactList.styled';
import { EmptyListIcon } from 'components/EmptyListIcon/EmptyListIcon';
import { Loader } from 'components/Loader/Loader';

export const ContactList = () => {
  const contacts = useSelector(selectVisibleContacts);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);
  const dispatch = useDispatch();

  const IsEmpty = contacts.length === 0;

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <>
      {isLoading && <Loader />}
      {error && <Error>{error}</Error>}
      {IsEmpty ? (
        <EmptyListIcon />
      ) : (
        <List>
          {contacts.map(({ id, name, number }) => (
            <ContactItem
              key={id}
              name={name}
              number={number}
              onDelete={() => {
                dispatch(deleteContact(id));
              }}
            />
          ))}
        </List>
      )}
    </>
  );
};
