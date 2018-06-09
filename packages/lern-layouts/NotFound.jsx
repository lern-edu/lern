import React from 'react';
import { FontIcon, RaisedButton } from '@material-ui/core';

/**
 * React Component for not found pages
 * @class
 * @public
 * @memberof LernLayouts
 * @param {string} this.props.path - FlowRouter path to use on href button
 * @param {string=} [this.props.message='Not found'] - Message to render on screen
 * @param {string=} [this.props.icon='mood_bad'] - Material ui [icon name]{@link https://material.io/icons/}
 * @example
 * import { Layout } from 'meteor/duckdodgerbrasl:lern-layouts';
 * ...
 * <Layout.NotFound path='AdminHome' message='Not found' icon='stop' />
 * // or
 * import { NotFound } from 'meteor/duckdodgerbrasl:lern-layouts';
 * ...
 * <NotFound path='AdminHome' message='Not found' icon='stop' />
 */
class NotFound extends React.Component {
  /* Render
  */

  render() {
    const {
      path,
      message='Not found',
      icon='mood_bad',
    } = this.props;

    return (
      <div>
        <div className='ui center aligned basic segment'>
          <h1 className='ui icon header'>
            <FontIcon className='material-icons' style={{ fontSize: 50 }}>
              {icon}</FontIcon>
            <div className='content'>
              <div className='sub header'>{message}</div>
            </div>
          </h1>
          <div>
            <RaisedButton
              label='Voltar'
              primary={true}
              href={FlowRouter.path(path)}
            />
          </div>
        </div>
      </div>
    );
  }
};

export default NotFound;
