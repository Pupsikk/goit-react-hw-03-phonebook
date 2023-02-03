import React, { Component } from 'react';
import PropTypes from 'prop-types';
import css from '../Filter/Filter.module.css';

export class Filter extends Component {
  handleChangeFilter = event => {
    this.props.onFilter(event.currentTarget.value);
  };
  render() {
    return (
      <label className={css.filterLabel}>
        Find contacts by name
        <input
          className={css.filterName}
          type="text"
          name="filter"
          placeholder="Search contact"
          onChange={this.handleChangeFilter}
        ></input>
      </label>
    );
  }
}
Filter.propTypes = {
  onFilter: PropTypes.func.isRequired,
};
