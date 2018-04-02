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

  constructor(props) {
    super(props);
    this.timer = 0;
    const { attempt, attempt: { test: { time } }, page } = props;

    let startTime;
    if (time.timeoutType === 'global') {
      startTime = attempt.startedAt;
    } else if (time.timeoutType === 'page') {
      startTime = attempt.pages[page].startedAt;
    }

    let timeout = time.timeout;
    let finishTime = new Date(startTime.getTime() + timeout);
    let timer = finishTime.getTime() - new Date().getTime();

    this.state = {
      miliseconds: timer,
    };
  }

  countDown = () => {
    const { attempt, attempt: { test: { time } }, page } = this.props;
    const { miliseconds } = this.state;
    if (miliseconds - 1000 <= 0) {
      if (time.timeoutType === 'global') {
        let forced = true;
        this.props.handleFinish(forced);
      } else if (time.timeoutType === 'page') {
        if (page < attempt.test.pages.length - 1) {
          this.props.handleNext();
        } else {
          this.props.handleFinish();
        }
      }
    }

    this.setState({
      miliseconds: miliseconds - 1000,
    });
  };

  componentDidMount() {
    if (this.timer === 0) {
      this.timer = setInterval(this.countDown, 1000);
    }
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  parseMiliseconds(miliseconds) {
    if (!miliseconds) {
      return 'infinity';
    }

    let hours = Math.floor(miliseconds / (60 * 60 * 1000));
    miliseconds -= hours * 60 * 60 * 1000;
    let minutes = Math.floor(miliseconds / (60 * 1000));
    miliseconds -= minutes * 60 * 1000;
    let seconds = Math.floor(miliseconds / (1000));
    return ('0' + hours).slice(-2) + ':'
      + ('0' + minutes).slice(-2) + ':'
      + ('0' + seconds).slice(-2);
  }

  render() {
    const { classes, loading, attempt, attempt: { test: { time } }, page } = this.props;

    let numPages = attempt.test.pages.length;

    return (
      <div className={classes.bottom}>
        <LinearProgress mode="determinate" value={(page) * 100 / (numPages - 1)}/>
        <div className={classes.parent}>
          {
            loading ?
            <CircularProgress color='secondary' /> :
            [

              // Back
              time.timeoutType === 'global' ?
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
                </ButtonBase>
                : null,

              //Timer
              this.state.miliseconds ?
                <ButtonBase
                  className={classes.root}
                  key='timer'
                  focusRipple
                >
                  <span className={classes.wrapper}>
                    <Icon>timer</Icon>
                    <span className={classes.label}>
                      {this.parseMiliseconds(this.state.miliseconds)}
                    </span>
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
