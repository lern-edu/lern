import React from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';

/** Public pagination for other views
  * @where {client}
  * @public view utilities
  * @methods this.handlePageLess -> updade 'searchPage' on Session
  * @methods this.handlePageAdd -> updade 'searchPage' on Session
  * @param {number} [length] actual content length on parent
  * @param {number} [size] max size of contents on parent view
  * @param {number} [page] current page
  * @param {number} [total] total counted items
  */

class PublicContentCreateQuestionPagination extends React.Component {

  // render

  render() {
    const { length=0, size=0, page=0, total=0, less, add, } = this.props;
    const finalCurrentCount = size * page + length;
    return (
      <div>
        {
          `${size * page} - ${
            finalCurrentCount > total ? total : finalCurrentCount} de ${
            total || 0} resultados`
        }
        {
          page === 0
          ? undefined
          : (
            <IconButton onClick={less} >
              <Icon>keyboard_arrow_left</Icon>
            </IconButton>
          )
        }
        {
          total === 0 || (page + 1) === Math.ceil(total / size)
          ? undefined
          : (
            <IconButton onClick={add} >
              <Icon>keyboard_arrow_right</Icon>
            </IconButton>
          )
        }
      </div>
    );
  };
};

PublicContentCreateQuestionPagination.propTypes = {
  length: PropTypes.number,
  size: PropTypes.number,
  page: PropTypes.number,
  total: PropTypes.number,
  less: PropTypes.func,
  add: PropTypes.func,
};

export default PublicContentCreateQuestionPagination;

