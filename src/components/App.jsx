import React, { Component } from 'react';

import ContactForm from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import { nanoid } from 'nanoid';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  componentDidMount() {
    const getContacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(getContacts);

    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  addNewContacts = () => {
    const newContacts = this.state.contacts.filter(contact => {
      return contact.name
        .toLowerCase()
        .includes(this.state.filter.toLowerCase());
    });
    return newContacts;
  };

  handleSubmit = ({ name, number }) => {
    const contact = { id: nanoid(), name, number };
    if (this.state.contacts.some(e => e.name === name)) {
      return alert(`${name} is already in contacts!`);
    }

    this.setState(({ contacts }) => ({ contacts: [contact, ...contacts] }));
  };

  // handleSubmit = event => {
  //   // const name = event.name;
  //   // const number = event.number;
  //   // const contactsLists = [...this.state.contacts];
  //   // if (contactsLists.findIndex(contact => name === contact.name) !== -1) {
  //   //   alert(`${name} is already in contacts.`);
  //   // } else {
  //   //   contactsLists.push({ name, id: nanoid(), number });
  //   // }
  //   // this.setState({ contacts: contactsLists });
  // };

  handleDelete = event => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== event),
    }));
  };

  addFilter = filterValue => {
    this.setState({ filter: filterValue });
  };

  render() {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          alignItems: 'center',
          fontSize: 24,
          color: '#010101',
          textShadow: 'rgb(232, 216, 137) 1px 0 10px',
          backgroundColor: 'rgba(0, 0, 255, 0.032)',
        }}
      >
        <h1>Phonebook</h1>
        <ContactForm onSubmit={this.handleSubmit} />
        <h2>Contacts</h2>
        <Filter onFilter={this.addFilter} />
        <ContactList
          contacts={this.addNewContacts()}
          handleDelete={this.handleDelete}
        />
      </div>
    );
  }
}
