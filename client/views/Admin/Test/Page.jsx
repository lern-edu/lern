import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { StaticCollections, Test, Content } from 'meteor/duckdodgerbrasl:lern-model';
import Grid from 'material-ui/Grid';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import Dialog from 'material-ui/Dialog';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import Typography from 'material-ui/Typography';
import CloseIcon from 'material-ui-icons/Close';
import Slide from 'material-ui/transitions/Slide';
import { withStyles } from 'material-ui/styles';

const content = new Content();
const ContentCreate = _.get(content, 'templates.ContentCreate');
const ContentShow = _.get(content, 'templates.ContentShow');

import AdminTestSelect from './Select.jsx';

// Styles
const styles = theme => ({
  paper: {
    padding: theme.spacing.unit * 2,
    margin: theme.spacing.unit * 2,
  },
  appBar: {
    position: 'relative',
  },
  flex: {
    flex: 1,
  },
});

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class AdminTestPage extends React.Component {
  // Render
  render() {
    const { doc, field, error, parent, classes, index } = this.props;

    return (
      <Dialog
        fullScreen
        open={this.props.open}
        onClose={this.props.handleClose}
        transition={Transition}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton color="inherit" onClick={this.props.handleClose}>
              <CloseIcon />
            </IconButton>
            <Typography type='title' color="inherit" className={classes.flex}>
              Página {(index + 1)}
            </Typography>
          </Toolbar>
        </AppBar>
        <Grid container>
          {
            // PENDING CREATE MULTIPLE PAGES
            doc.get('resolution') === 'content'
            ? (
              <Grid item xs={12}>

                  <Grid item xs={12}>

                    <Paper className={classes.paper}>

                      <ContentCreate
                        Schema={Content}
                        doc={doc}
                        field={field}
                        form={parent}
                        contentTypes={StaticCollections.ContentTypes}
                      />

                    </Paper>

                  </Grid>

                  <Grid item xs={12}>
                      <Paper className={classes.paper} key={`pages.${index}`}>
                        {
                          _.map(_.get(doc, `pages.${index}.description`), (description, idx) =>
                            [
                              <ContentShow
                                doc={description}
                                form={parent}
                                index={idx}
                                field={field}
                                canRemove={true}
                                key={`pages.${index}.descriptionShow${idx}`}
                              />,
                              <Divider key={`pages.${index}.descriptionDivider${idx}`} />,
                            ]
                          )
                        }
                    </Paper>
                  </Grid>

              </Grid>
            )
            : (
              <Grid item xs={12}>

                {/* Create SUDOKU insert logic here*/}

              </Grid>
            )
          }
        </Grid>
      </Dialog>
    );
  }
};

AdminTestPage.propTypes = {
  doc: PropTypes.object.isRequired,
  field: PropTypes.string.isRequired,
  parent: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
};

export default withStyles(styles)(AdminTestPage);
