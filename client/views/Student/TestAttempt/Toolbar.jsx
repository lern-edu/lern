import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from 'material-ui/styles';
import { LinearProgress, CircularProgress, Icon, IconButton, ButtonBase } from 'material-ui';

const styles = theme => ({
  bottom: {
    backgroundColor: theme.palette.background.paper,
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
  },
  parent: {
    display: 'flex',
    justifyContent: 'center',
    height: 56,
    backgroundColor: theme.palette.background.paper,
  },
  root: {
    transition: theme.transitions.create(['color', 'padding-top'], {
      duration: theme.transitions.duration.short,
    }),
    paddingTop: theme.spacing.unit,
    paddingBottom: 10,
    paddingLeft: 12,
    paddingRight: 12,
    minWidth: 80,
    maxWidth: 168,
    color: theme.palette.text.secondary,
    flex: '1',
    '&:hover': {
      paddingTop: 6,
      color: theme.palette.primary.main,
    },
  },
  wrapper: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    flexDirection: 'column',
  },
  label: {
    fontFamily: theme.typography.fontFamily,
    fontSize: theme.typography.pxToRem(12),
    '&:hover': {
      fontSize: theme.typography.pxToRem(14),
    },
  },
});

class StudentTestAttemptToolbar extends React.Component {

  render() {
    const { classes, loading, numPages, page, timer } = this.props;

    return (
      <div className={classes.bottom}>
        <LinearProgress mode="determinate" value={(page) * 100 / (numPages - 1)}/>
        <div className={classes.parent}>
          {
            loading ?
            <CircularProgress color='secondary' /> :
            [

              // Back
              <ButtonBase
                className={classes.root}
                key='back'
                focusRipple
                onClick={this.props.handleBack}
              >
                <span className={classes.wrapper}>
                  <Icon>chevron_left</Icon>
                  <span className={classes.label}>{i18n.__('StudentTestAttempt.back')}</span>
                </span>
              </ButtonBase>,

              //Timer
              timer ?
                <ButtonBase
                  className={classes.root}
                  key='timer'
                  focusRipple
                >
                  <span className={classes.wrapper}>
                    <Icon>timer</Icon>
                    <span className={classes.label}>{timer}</span>
                  </span>
                </ButtonBase>
                : null,

              //Dismiss
              <ButtonBase
                className={classes.root}
                key='dismiss'
                focusRipple
                onClick={this.props.handleDismiss}
              >
                <span className={classes.wrapper}>
                  <Icon>mood_bad</Icon>
                  <span className={classes.label}>{i18n.__('StudentTestAttempt.dismiss')}</span>
                </span>
              </ButtonBase>,

              // Next or Finish
              page < numPages - 1 ?
                <ButtonBase
                  className={classes.root}
                  key='next'
                  focusRipple
                  onClick={this.props.handleNext}
                >
                  <span className={classes.wrapper}>
                    <Icon>chevron_right</Icon>
                    <span className={classes.label}>{i18n.__('StudentTestAttempt.next')}</span>
                  </span>
                </ButtonBase> :
                <ButtonBase
                  className={classes.root}
                  key='finish'
                  focusRipple
                  onClick={this.props.handleFinish}
                >
                  <span className={classes.wrapper}>
                    <Icon>check</Icon>
                    <span className={classes.label}>{i18n.__('StudentTestAttempt.finish')}</span>
                  </span>
                </ButtonBase>,
            ]
          }
        </div>
      </div>
    );
  }
}

StudentTestAttemptToolbar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(StudentTestAttemptToolbar);
