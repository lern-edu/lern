import React from 'react';
import PropTypes from 'prop-types';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import Icon from 'material-ui/Icon';

class Bar extends React.Component {

  /* Methods
  */

  getTitle({ title, crumbs }) {

    return (
      <div>
        <span>
          {
            _.flatten(
              _.map(crumbs, (c, i) =>
                [
                  <span key={`crumb${i}`}
                    onClick={()=>FlowRouter.go(c.path)}
                    style={{ cursor: 'pointer' }}>
                    {c.label}
                  </span>,
                  <span
                    key={`step${i}`}
                    style={{ marginLeft: 5, marginRight: 5 }}>
                    /
                  </span>,
                ]
              )
            )
          }

        </span>
        <span>{title}</span>
      </div>
    );
  }

  /* Render
  */

  render() {
    const { crumbs, title, disableActions } = this.props;

    return (
      <AppBar position="fixed">
        <Toolbar>
          <IconButton onTouchTap={disableActions ? () => false : window.nav} color="contrast" aria-label="Menu">
             <Icon color="contrast">menu</Icon>
          </IconButton>
          <Typography type="title" color="inherit">
            {this.getTitle({ title, crumbs })}
          </Typography>
          <Button color="contrast">Login</Button>
        </Toolbar>
      </AppBar>
    );
  }
};

Bar.propTypes = {
  crumbs: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      path: PropTypes.string,
    })
  ),
};

export default Bar;
