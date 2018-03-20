import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { StaticCollections, Test, Content } from 'meteor/duckdodgerbrasl:lern-model';
import Grid from 'material-ui/Grid';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import Button from 'material-ui/Button';
import { withStyles } from 'material-ui/styles';

const content = new Content();
const ContentCreate = _.get(content, 'templates.ContentCreate');
const ContentShow = _.get(content, 'templates.ContentShow');

import AdminTestSelect from './Select.jsx';
import AdminTestPage from './Page.jsx';

// Styles
const styles = theme => ({
  paper: {
    padding: theme.spacing.unit * 2,
    margin: theme.spacing.unit * 2,
  },
});

class AdminTestPages extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      index: -1,
    };
  }

  createPage = () => {
    const { doc } = this.props;
    const { index } = this.state;
    doc.pages.push(new Test.TestPageSchema());
    this.setState({
      open: true,
      index: doc.pages.length - 1,
    });
  };

  // Render
  render() {
    const { doc, field, error, parent, classes } = this.props;
    const { index } = this.state;

    if (doc.get('resolution') === 'content' && !doc.get('pages'))
      doc.set('pages', []);

    return (
      <div>

        {
          // PENDING CREATE MULTIPLE PAGES
          doc.get('resolution') === 'content'
          ? (
            <Grid item xs={12}>

                <Grid item xs={12}>

                  <AdminTestPage
                    open={this.state.open}
                    handleClose={() => this.setState({ open: false })}
                    doc={doc}
                    parent={parent}
                    field={`pages.${index}.description`}
                    index={index}
                  />

                  <Button onClick={this.createPage}>
                    Criar Página
                  </Button>

                </Grid>

                <Grid item xs={12}>
                  <Grid container spacing={8}>
                    {_.map(_.get(doc, 'pages'), (page, idx) =>
                      <Grid
                        item
                        xs={12} sm={6} md={4} lg={3}
                        key={`pages.${idx}`}
                        style={{ cursor: 'pointer' }}
                        onClick={() => this.setState({ index: idx, open: true })}
                      >
                        <Paper className={classes.paper}>
                          <h1>{'Page' + idx}</h1>
                        </Paper>
                      </Grid>
                    )}
                  </Grid>
                </Grid>

            </Grid>
          )
          : (
            <Grid item xs={12}>

              {/* Create SUDOKU insert logic here*/}

            </Grid>
          )
        }

      </div>
    );
  }
};

AdminTestPages.propTypes = {
  doc: PropTypes.object.isRequired,
  field: PropTypes.string.isRequired,
  parent: PropTypes.object.isRequired,
};

export default withStyles(styles)(AdminTestPages);
