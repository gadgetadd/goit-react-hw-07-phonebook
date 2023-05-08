import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Report } from 'notiflix/build/notiflix-report-aio';
import { BsPersonAdd } from 'react-icons/bs';

import { getContacts } from 'redux/selectors';
import { addContact } from 'redux/contactsSlice';

import { Form, Label, Input, Button } from './ContactForm.styled';

export const ContactForm = () => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const contacts = useSelector(getContacts);
  const dispatch = useDispatch();

  const formReset = () => {
    setName('');
    setNumber('');
  };

  const inputChangeHandler = e => {
    const { name, value } = e.currentTarget;
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'number':
        setNumber(value);
        break;
      default:
        throw new Error('unsupported input name');
    }
  };

  const submitHandler = e => {
    e.preventDefault();
    const {
      name: { value: name },
      number: { value: number },
    } = e.currentTarget.elements;

    const isExists = contacts.some(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );
    if (isExists) {
      return Report.info(
        'Enter correct information',
        `${name} is already in contacts`,
        'Ok'
      );
    }
    dispatch(addContact({ name, number }));

    formReset();
  };

  return (
    <>
      <Form onSubmit={submitHandler}>
        <Label>
          Name:
          <Input
            type="text"
            name="name"
            value={name}
            pattern="^[a-zA-Zа-яіїєґА-ЯІЇЄҐ]+(([' -][a-zA-Zа-яіїєґА-ЯІЇЄҐ ])?[a-zA-Zа-яіїєґА-ЯІЇЄҐ]*)*$"
            maxLength={35}
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            onChange={inputChangeHandler}
          />
        </Label>
        <Label>
          Number:
          <Input
            type="tel"
            name="number"
            value={number}
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            maxLength={35}
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            onChange={inputChangeHandler}
          />
        </Label>
        <Button type="submit">
          <BsPersonAdd size="35px" color="grey" />
        </Button>
      </Form>
    </>
  );
};
