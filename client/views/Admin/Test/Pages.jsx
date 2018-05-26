import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { StaticCollections, Test, Content } from 'meteor/duckdodgerbrasl:lern-model';
import { Grid, Divider, Paper, Button, IconButton } from '@material-ui/core';
import { Card, CardHeader, CardContent, CardActions } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { ChevronLeft, ChevronRight, Edit, RemoveCircle } from '@material-ui/icons';

const content = new Content();
const ContentCreate = _.get(content, 'templates.ContentCreate');
const ContentShow = _.get(content, 'templates.ContentShow');

import AdminTestSelect from './Select.jsx';
import AdminTestPage from './Page.jsx';

// Styles
const styles = theme => ({
  actions: {
    display: 'flex',
    justifyContent: 'center',
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

  handleRight = (index) => {
    const { doc, parent } = this.props;
    const array = _.get(doc, 'pages');
    if (array.length > 1 && index < array.length - 1) {
      let aux = array[index];
      array[index] = array[index + 1];
      array[index + 1] = aux;
      doc.set('pages', array);
      parent.setState({ doc: doc });
    }
  };

  handleLeft = (index) => {
    const { doc, parent } = this.props;
    const array = _.get(doc, 'pages');
    if (array.length > 1 && index > 0) {
      let aux = array[index];
      array[index] = array[index - 1];
      array[index - 1] = aux;
      doc.set('pages', array);
      parent.setState({ doc: doc });
    }
  };

  handleRemove = (index) => {
    const { doc, parent } = this.props;
    const array = _.get(doc, 'pages');
    _.pullAt(array, [index]);
    doc.set('pages', array);
    parent.setState({ doc: doc });
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
                      >
                        <Card>
                          <CardHeader
                            title={'Página ' + (idx + 1)}
                            subheader={'Itens: ' + (page.description ? page.description.length : 0)}
                          />
                          <CardActions className={classes.actions} disableActionSpacing>
                            <IconButton onClick={() => this.handleLeft(idx)}>
                              <ChevronLeft />
                            </IconButton>
                            <IconButton onClick={() => this.handleRemove(idx)}>
                              <RemoveCircle />
                            </IconButton>
                            <IconButton onClick={() => this.setState({ index: idx, open: true })}>
                              <Edit />
                            </IconButton>
                            <IconButton onClick={() => this.handleRight(idx)}>
                              <ChevronRight />
                            </IconButton>
                          </CardActions>
                        </Card>
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
