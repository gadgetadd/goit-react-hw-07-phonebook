import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
  selectIsLoading,
  selectError,
  selectVisibleContacts,
} from 'redux/selectors';

import { fetchContacts, deleteContact } from 'redux/operations';

import { ContactItem } from 'components/ContactItem/ContactItem';
import { List } from './ContactList.styled';
import { EmptyListIcon } from 'components/EmptyListIcon/EmptyListIcon';

export const ContactList = () => {
  const contacts = useSelector(selectVisibleContacts);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <List>
      {isLoading && <div>Loading...</div>}
      {error && <div>{error}</div>}
      {contacts.length === 0 ? (
        <EmptyListIcon />
      ) : (
        contacts.map(({ id, name, number }) => (
          <ContactItem
            key={id}
            name={name}
            number={number}
            onDelete={() => {
              dispatch(deleteContact(id));
            }}
          />
        ))
      )}
    </List>
  );
};
