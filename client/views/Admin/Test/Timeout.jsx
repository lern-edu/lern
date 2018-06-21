import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { StaticCollections, Test } from 'meteor/duckdodgerbrasl:lern-model';
import Grid from 'material-ui/Grid';
import { TextField, Select, MenuItem, FormControl, InputLabel } from 'material-ui';

import AdminTestSelect from './Select.jsx';
import AdminTestNumber from './Number.jsx';

const styles = theme => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 100,
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 100,
  },
});

class TimeoutInput extends React.Component {

  constructor(props) {
    super(props);
    const { doc, field } = props;
    let miliseconds = doc.get(field);
    this.state = {
      ...this.parseMiliseconds(miliseconds),
    };
  }

  componentDidUpdate(prevProps, prevState) {
    const { doc, field, parent } = this.props;
    if (this.state === prevState) return;
    const { days, hours, minutes, seconds } = this.state;
    let value = this.parseDate(days, hours, minutes, seconds);
    doc.set(field, _.parseInt(value));
    parent.setState({ doc });
    doc.validate({ fields: [field] }, (err) => {
      if (err) parent.setState({ errors: { [field]: { message: err.reason, error: true } } });
      else parent.setState({ errors: { [field]: { message: undefined, error: false } } });
    });
  }

  parseDate(days, hours, minutes, seconds) {
    let miliseconds = 0;
    miliseconds += days * 24 * 60 * 60 * 1000;
    miliseconds += hours * 60 * 60 * 1000;
    miliseconds += minutes * 60 * 1000;
    miliseconds += seconds * 1000;
    return miliseconds;
  }

  parseMiliseconds(miliseconds) {
    if (!miliseconds) {
      return { days: 0, hours: 1, minutes: 0, seconds: 0 };
    }

    let days = Math.floor(miliseconds / (24 * 60 * 60 * 1000));
    miliseconds -= days * 24 * 60 * 60 * 1000;
    let hours = Math.floor(miliseconds / (60 * 60 * 1000));
    miliseconds -= hours * 60 * 60 * 1000;
    let minutes = Math.floor(miliseconds / (60 * 1000));
    miliseconds -= minutes * 60 * 1000;
    let seconds = Math.floor(miliseconds / (1000));
    return { days, hours, minutes, seconds };
  }

  handleChange = (name) => (event) => {
    let value = _.parseInt(event.target.value) || 0;
    this.setState({
      [name]: value >= 0 ? value : 0,
    });
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <TextField
          label='Days'
          value={this.state.days}
          className={classes.textField}
          onChange={this.handleChange('days')}
          margin='normal'
          type='number'
        />
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="hours">Hours</InputLabel>
          <Select
            value={this.state.hours}
            onChange={this.handleChange('hours')}
            inputProps={{
              id: 'hours',
            }}
            MenuProps={{
              PaperProps: {
                style: {
                  maxHeight: 48 * 4.5 + 8,
                  width: 100,
                },
              },
            }}
          >
            {_.map(_.range(0, 24, 1), hour =>
              <MenuItem value={hour} key={hour}>{hour}</MenuItem>
            )}
          </Select>
        </FormControl>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="minutes">Minutes</InputLabel>
          <Select
            value={this.state.minutes}
            onChange={this.handleChange('minutes')}
            inputProps={{
              id: 'minutes',
            }}
            MenuProps={{
              PaperProps: {
                style: {
                  maxHeight: 48 * 4.5 + 8,
                  width: 100,
                },
              },
            }}
          >
            {_.map(_.range(0, 60, 1), minute =>
              <MenuItem value={minute} key={minute}>{minute}</MenuItem>
            )}
          </Select>
        </FormControl>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="seconds">Seconds</InputLabel>
          <Select
            value={this.state.seconds}
            onChange={this.handleChange('seconds')}
            inputProps={{
              id: 'seconds',
            }}
            MenuProps={{
              PaperProps: {
                style: {
                  maxHeight: 48 * 4.5 + 8,
                  width: 100,
                },
              },
            }}
          >
            {_.map(_.range(0, 60, 5), second =>
              <MenuItem value={second} key={second}>{second}</MenuItem>
            )}
          </Select>
        </FormControl>
      </div>
    );
  }
}

TimeoutInput.propTypes = {
  classes: PropTypes.object.isRequired,
};

const TimeoutInputStyled = withStyles(styles)(TimeoutInput);

class AdminTestTimeout extends React.Component {
  render() {
    const { doc, field, errors={}, parent } = this.props;

    return (
      <div>

        <Grid item xs={12}>

          <AdminTestSelect
            options={StaticCollections.TestTimeoutTypes}
            doc={doc}
            field='time.timeoutType'
            error={errors['time.timeoutType']}
            parent={parent}
          />

        </Grid>

        {
          // PENDING TEMPLATE FOR RANGE TIME
          _.get({
            global:
              <Grid item xs={12}>
                {/*<AdminTestNumber
                  doc={doc}
                  field='time.timeout'
                  error={errors['time.timeout']}
                  parent={parent}
                />*/}
                <TimeoutInputStyled
                  doc={doc}
                  field='time.timeout'
                  error={errors['time.timeout']}
                  parent={parent}
                />
              </Grid>,
            page:
            <Grid item xs={12}>
              {/*<AdminTestNumber
                doc={doc}
                field='time.timeout'
                error={errors['time.timeout']}
                parent={parent}
              />*/}
              <TimeoutInputStyled
                doc={doc}
                field='time.timeout'
                error={errors['time.timeout']}
                parent={parent}
              />
            </Grid>,
            none: null,
          }, doc.get('time.timeoutType'))
        }

      </div>
    );
  }
};

AdminTestTimeout.propTypes = {
  doc: PropTypes.object.isRequired,
  field: PropTypes.string.isRequired,
  parent: PropTypes.object.isRequired,
};

export default AdminTestTimeout;
