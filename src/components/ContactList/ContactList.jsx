import { useSelector, useDispatch } from 'react-redux';

import { getFilter, getContacts } from 'redux/selectors';
import { deleteContact } from 'redux/contactsSlice';

import { ContactItem } from 'components/ContactItem/ContactItem';
import { List } from './ContactList.styled';
import { EmptyListIcon } from 'components/EmptyListIcon/EmptyListIcon';

export const ContactList = () => {
  const contacts = useSelector(getContacts);
  const filter = useSelector(getFilter);
  const dispatch = useDispatch();

  const visibleContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter)
  );

  return (
    <List>
      {visibleContacts.length === 0 ? (
        <EmptyListIcon />
      ) : (
        visibleContacts.map(({ id, name, number }) => (
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
