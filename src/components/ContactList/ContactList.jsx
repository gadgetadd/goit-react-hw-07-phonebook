import { useSelector } from 'react-redux';

import { useFetchContactsQuery } from 'redux/contactsApi';
import { selectFilter } from 'redux/selectors';

import { ContactItem } from 'components/ContactItem/ContactItem';
import { List, Error } from './ContactList.styled';
import { EmptyListIcon } from 'components/EmptyListIcon/EmptyListIcon';
import { Loader } from 'components/Loader/Loader';

export const ContactList = () => {
  const { data = [], isError, isLoading } = useFetchContactsQuery();

  const filter = useSelector(selectFilter);

  const visibleContacts = data.filter(contact =>
    contact.name.toLowerCase().includes(filter)
  );

  const IsEmpty = visibleContacts.length === 0;

  return (
    <>
      {isLoading && <Loader />}
      {isError && <Error>{'Something went wrong. Please, reload the page'}</Error>}
      {IsEmpty ? (
        <EmptyListIcon />
      ) : (
        <List>
          {visibleContacts.map(contact => (
            <ContactItem key={contact.id} {...contact} />
          ))}
        </List>
      )}
    </>
  );
};
