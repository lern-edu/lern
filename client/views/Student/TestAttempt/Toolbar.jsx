import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { Toolbar, LinearProgress, CircularProgress, Icon } from 'material-ui';
import BottomNavigation, { BottomNavigationAction } from 'material-ui/BottomNavigation';

const styles = theme => ({
  bottom: {
    backgroundColor: theme.palette.background.paper,
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
  },
});

class StudentTestAttemptToolbar extends React.Component {

  render() {
    const { classes, bottom, onChange, numPages, page } = this.props;

    return (
      <div className={classes.bottom}>
        <LinearProgress mode="determinate" value={(page) * 100 / (numPages - 1)}/>
        <BottomNavigation
          value={bottom}
          onChange={onChange}
          showLabels
        >
          {
            bottom === 'loading'
            ? <CircularProgress color='secondary' />
            : [<BottomNavigationAction
                label={i18n.__('StudentTestAttempt.back')}
                value='back'
                key='back'
                icon={<Icon>chevron_left</Icon>}
              />,
              <BottomNavigationAction
                label={i18n.__('StudentTestAttempt.dismiss')}
                value='dismiss'
                key='dismiss'
                icon={<Icon>mood_bad</Icon>}
              />,
              bottom !== 'finish' ?
                <BottomNavigationAction
                  label={i18n.__('StudentTestAttempt.next')}
                  value='next'
                  key='next'
                  icon={<Icon>chevron_right</Icon>}
                /> :
                <BottomNavigationAction
                  label={i18n.__('StudentTestAttempt.finish')}
                  value='finish'
                  key='finish'
                  icon={<Icon>check</Icon>}
                />,
            ]
          }
        </BottomNavigation>
      </div>
    );
  }
}

StudentTestAttemptToolbar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(StudentTestAttemptToolbar);