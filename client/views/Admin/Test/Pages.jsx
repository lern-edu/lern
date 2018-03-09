import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { StaticCollections, Test, Content } from 'meteor/duckdodgerbrasl:lern-model';
import Grid from 'material-ui/Grid';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
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
});

class AdminTestPages extends React.Component {
  // Render
  render() {
    const { doc, field, error, parent, classes } = this.props;

    if (doc.get('resolution') === 'content' && !doc.get('pages'))
      doc.set('pages', [new Test.TestPageSchema()]);

    return (
      <div>

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
                      field='pages.0.description'
                      form={parent}
                      contentTypes={StaticCollections.ContentTypes}
                    />

                  </Paper>

                </Grid>

                <Grid item xs={12}>
                  {
                    _.isEmpty(_.get(doc, 'pages.0.description'))
                      ? undefined
                      : <Paper className={classes.paper}>
                        {
                          _.map(_.get(doc, 'pages.0.description'), (description, index) =>
                            [
                              <ContentShow
                                doc={description}
                                form={parent}
                                index={index}
                                canRemove={true}
                                key={`pages.0.descriptionShow${index}`}
                              />,
                              <Divider key={`pages.0.descriptionDivider${index}`} />,
                            ]
                          )
                        }
                      </Paper>
                  }
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
