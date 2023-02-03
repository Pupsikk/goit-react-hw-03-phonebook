import React from 'react';
import PropTypes from 'prop-types';
import css from '../ContactList/ContactList.module.css';

const Contact = ({ name, number, id, handleDelete }) => {
  return (
    <li className={css.item}>
      <span>
        {name}: {number}
      </span>
      <button
        className={css.contactButton}
        type="button"
        onClick={() => {
          handleDelete(id);
        }}
      >
        Delete
      </button>
    </li>
  );
};

export const ContactList = ({ contacts, handleDelete }) => {
  return (
    <ul>
      {contacts.map(contact => {
        return (
          <Contact
            name={contact.name}
            number={contact.number}
            id={contact.id}
            handleDelete={handleDelete}
            key={contact.id}
          ></Contact>
        );
      })}
    </ul>
  );
};
ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.exact({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
  handleDelete: PropTypes.func.isRequired,
};
