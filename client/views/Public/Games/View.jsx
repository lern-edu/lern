import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card';
import { Typography, Button } from 'material-ui';
import { Layout } from 'meteor/duckdodgerbrasl:lern-layouts';

const styles = theme => ({
  grid: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  card: {
    minWidth: 275,
    margin: 20,
  },
  media: {
    height: 150,
  },
});

class PublicGames extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const { classes } = this.props;

    return (
      <div>
        <Layout.Bar title='Jogos' />
        <div className={classes.grid}>
          <Card className={classes.card}>
            <CardMedia
              className={classes.media}
              image='/images/sudoku.png'
              title="Sudoku"
            />
            <CardContent>
              <Typography type="headline" component="h2">
                Sudoku
              </Typography>
              <Typography component="p">
                Jogar sudoku
              </Typography>
            </CardContent>
            <CardActions>
              <Button dense color="primary" onClick={() => FlowRouter.go('PublicGamesSudoku')}>
                Jogar
              </Button>
            </CardActions>
          </Card>
        </div>
      </div>
    );
  }
}

PublicGames.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PublicGames);
