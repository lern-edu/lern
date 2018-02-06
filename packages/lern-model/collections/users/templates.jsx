import React from 'react';
import Input, { InputLabel, InputAdornment } from 'material-ui/Input';
import { FormControl, FormHelperText } from 'material-ui/Form';
import Select from 'material-ui/Select';
import { MenuItem } from 'material-ui/Menu';
import IconButton from 'material-ui/IconButton';
import Icon from 'material-ui/Icon';
import i18n from 'meteor/universe:i18n';
import _ from 'lodash';
import Regex from '../../regex.js';

import StaticCollections from '../static.js';

const Templates = {};

if (Meteor.isClient) {
  class Emails extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        error: false,
        message: undefined,
      };
    }

    handleChange({ target: { value } }) {
      const { form, doc, index } = this.props;
      doc.emails[index].address = value;
      form.setState({ collections: { user: { doc } } });
      if (Regex.email.test(value))
        this.setState({ message: undefined, error: false });
      else
        this.setState({ message: i18n.__('Templates', 'email.message'), error: true });

    }

    render() {
      const { form, doc, index, disabled=false } = this.props;
      const { error, message } = this.state;
      return (
        <FormControl error={error}>
          <InputLabel htmlFor='email'>{i18n.__('Templates', 'email.name')}</InputLabel>
          <Input
            id='email'
            type='email'
            disabled={disabled}
            value={_.get(doc, `emails[${index}].address`)}
            onChange={this.handleChange.bind(this)}
          />
          {
            !error
            ? undefined
            : <FormHelperText>{message}</FormHelperText>
          }

          <FormHelperText>
            {
              _.get(doc, `emails[${index}].verified`)
              ? i18n.__('Templates', 'email.verified')
              : i18n.__('Templates', 'email.notVerified')
            }
          </FormHelperText>

        </FormControl>
      );
    }
  };

  class FirstName extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        error: false,
        message: undefined,
      };
    }

    handleChange({ target: { value } }) {
      const { form, doc } = this.props;
      doc.profile.firstName = value;
      form.setState({ collections: { user: { doc } } });
      doc.validate({ fields: [`profile.firstName`] }, (err) => {
        if (err)
          this.setState({ message: err.reason, error: true });
        else
          this.setState({ message: undefined, error: false });
      });

    }

    render() {
      const { form, doc } = this.props;
      const { error, message } = this.state;
      return (
        <FormControl error={error}>
          <InputLabel htmlFor='firstName'>{i18n.__('Templates', 'firstName.name')}</InputLabel>
          <Input
            value={doc.profile.firstName}
            onChange={this.handleChange.bind(this)}
          />
          {
            !error
            ? undefined
            : <FormHelperText>{message}</FormHelperText>
          }

        </FormControl>
      );
    }
  };

  class LastName extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        error: false,
        message: undefined,
      };
    }

    handleChange({ target: { value } }) {
      const { form, doc } = this.props;
      doc.profile.lastName = value;
      form.setState({ collections: { user: { doc } } });
      doc.validate({ fields: [`profile.lastName`] }, (err) => {
        if (err)
          this.setState({ message: err.reason, error: true });
        else
          this.setState({ message: undefined, error: false });
      });

    }

    render() {
      const { form, doc } = this.props;
      const { error, message } = this.state;
      return (
        <FormControl error={error}>
          <InputLabel htmlFor='lastName'>{i18n.__('Templates', 'lastName.name')}</InputLabel>
          <Input
            value={doc.profile.lastName}
            onChange={this.handleChange.bind(this)}
          />
          {
            !error
            ? undefined
            : <FormHelperText>{message}</FormHelperText>
          }

        </FormControl>
      );
    }
  };

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;

  class Roles extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        error: false,
        message: undefined,
      };
    }

    handleChange({ target: { value } }) {
      const { form, doc } = this.props;
      doc.roles = value;
      form.setState({ collections: { user: { doc } } });
      doc.validate({ fields: [`roles`] }, (err) => {
        if (err)
          this.setState({ message: err.reason, error: true });
        else
          this.setState({ message: undefined, error: false });
      });

    }

    render() {
      const { form, doc } = this.props;
      const { error, message } = this.state;
      return (
        <FormControl error={error}>
          <InputLabel htmlFor='roles'>{i18n.__('Templates', 'roles.name')}</InputLabel>
          <Select
            multiple
            value={doc.roles}
            onChange={this.handleChange.bind(this)}
            input={<Input id='roles' />}
            MenuProps={{
              PaperProps: {
                style: {
                  maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                  width: 200,
                },
              },
            }}
          >
            {
              _.map(StaticCollections.UserRoles, role =>
                <MenuItem
                  key={role}
                  value={role}
                >
                  {role}
                </MenuItem>
              )
            }
          </Select>

          {
            !error
            ? undefined
            : <FormHelperText>{message}</FormHelperText>
          }
        </FormControl>
      );
    }
  };

  class Locale extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        error: false,
        message: undefined,
      };
    }

    handleChange({ target: { value } }) {
      const { form, doc } = this.props;
      doc.profile.locale = value;
      form.setState({ collections: { user: { doc } } });
      doc.validate({ fields: [`locale`] }, (err) => {
        if (err)
          this.setState({ message: err.reason, error: true });
        else
          this.setState({ message: undefined, error: false });
      });

    }

    render() {
      const { form, doc } = this.props;
      const { error, message } = this.state;
      return (
        <FormControl error={error}>
          <InputLabel htmlFor='locale'>{i18n.__('Templates', 'locale.name')}</InputLabel>
          <Select
            value={doc.profile.locale}
            onChange={this.handleChange.bind(this)}
            input={<Input id='locale' />}
            MenuProps={{
              PaperProps: {
                style: {
                  maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                  width: 200,
                },
              },
            }}
          >
            {
              _.map(StaticCollections.Locales, locale =>
                <MenuItem
                  key={locale}
                  value={locale}
                >
                  {locale}
                </MenuItem>
              )
            }
          </Select>

          {
            !error
            ? undefined
            : <FormHelperText>{message}</FormHelperText>
          }
        </FormControl>
      );
    }
  };

  class Password extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        error: false,
        message: undefined,
        showPassword: false,
      };
    }

    handleChange({ target: { value } }) {
      const { form, doc } = this.props;
      doc.services.password = value;
      form.setState({ collections: { user: { doc } } });
      if (Regex.password.test(value))
        this.setState({ message: undefined, error: false });
      else
        this.setState({ message: i18n.__('Templates', 'password.message'), error: true });

    }

    handleMouseDownPassword(event) {
      event.preventDefault();
    };

    handleClickShowPasssword() {
      this.setState({ showPassword: !this.state.showPassword });
    };

    render() {
      const { form, doc } = this.props;
      const { error, message } = this.state;
      return (
        <FormControl error={error}>
          <InputLabel htmlFor='password'>{i18n.__('Templates', 'password.name')}</InputLabel>
          <Input
            id='password'
            autoComplete='off'
            type={this.state.showPassword ? 'text' : 'password'}
            value={_.get(doc, 'services.password')}
            onChange={this.handleChange.bind(this)}
            endAdornment={
              <InputAdornment position='end'>
                <IconButton
                  onClick={this.handleClickShowPasssword.bind(this)}
                  onMouseDown={this.handleMouseDownPassword}
                >
                  {
                    this.state.showPassword
                    ? <Icon>visibility_off</Icon>
                    : <Icon>visibility</Icon>
                  }
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
      );
    }
  };

  Templates.Emails = Emails;
  Templates.FirstName = FirstName;
  Templates.LastName = LastName;
  Templates.Roles = Roles;
  Templates.Locale = Locale;
  Templates.Password = Password;
};

export default Templates;
