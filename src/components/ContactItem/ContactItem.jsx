import PropTypes from 'prop-types';
import { MdOutlineDeleteForever } from 'react-icons/md';
import { RiContactsLine } from 'react-icons/ri';

import { useDeleteContactMutation } from 'redux/contactsApi';

import {
  ListItem,
  Contact,
  Button,
  ContactWrapper,
} from './ContactItem.styled';

export const ContactItem = ({ name, number, id }) => {
  const [deleteContact, { isLoading }] = useDeleteContactMutation();

  return (
    <ListItem>
      <ContactWrapper>
        <RiContactsLine size="20px" color="grey" />
        <Contact>{`${name}: ${number}`}</Contact>
      </ContactWrapper>
      <Button
        type="button"
        disabled={isLoading}
        onClick={() => deleteContact(id)}
      >
        <MdOutlineDeleteForever size="25px" color="grey" />
      </Button>
    </ListItem>
  );
};

ContactItem.propTypes = {
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};
