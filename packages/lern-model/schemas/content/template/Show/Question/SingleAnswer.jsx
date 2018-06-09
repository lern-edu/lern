import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import Radio, { RadioGroup } from '@material-ui/core/Radio';
import Grid from '@material-ui/core/Grid';

import ContentShow from '../index.jsx';

class PublicContentShowQuestionSingleAnswer extends React.Component {

  // Render

  render() {
    const { doc, classes } = this.props;

    return (
      <Grid item xs={12}>

        {
          _.isEmpty(doc.options)
            ? undefined
            : <Grid container>

              {
                _.map(doc.options, (option, index) =>
                  [
                    <Grid item xs={1} key={`optionSelect${index}`}>
                      <Radio checked={index === _.toNumber(_.get(doc, 'answer.singleAnswer'))} />
                    </Grid>,
                    <Grid item xs={11} key={`optionShow${index}`}>
                      <ContentShow
                        doc={option}
                        index={index}
                        canRemove={false}
                      />
                    </Grid>,
                  ]
                )
              }
            </Grid>
        }

      </Grid>
    );
  };

};

PublicContentShowQuestionSingleAnswer.propTypes = {
  doc: PropTypes.object.isRequired,
};

export default PublicContentShowQuestionSingleAnswer;
