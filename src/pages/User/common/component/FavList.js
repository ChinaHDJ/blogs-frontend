import React, { Fragment } from 'react';
import _ from 'lodash';
import ExpansionPanel from '@material-ui/core/ExpansionPanel/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/core/SvgIcon/SvgIcon';
import Typography from '@material-ui/core/Typography/Typography';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails/ExpansionPanelDetails';
import ListItem from '@material-ui/core/ListItem/ListItem';
import Avatar from '@material-ui/core/Avatar/Avatar';
import ListItemText from '@material-ui/core/ListItemText/ListItemText';
import Divider from '@material-ui/core/Divider/Divider';
import { Empty } from 'antd';

class FavList extends React.Component {
  renderList = articles => {
    const count = articles.length - 1;

    return _.map(articles, article => (
      <Fragment>
        <ListItem key={article.id} button>
          <ListItemText primary={article.title} secondary={article.created_at} />
        </ListItem>
        {count !== index && <Divider />}
      </Fragment>
    ));
  };

  render() {
    const { list } = this.props;

    if (_.isEmpty(list)) {
      return <Empty description="这家伙的收藏夹是空的" />;
    }

    return _.map(list, favList => (
      <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className={classes.heading}>{favList.name}</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography>{this.renderList(favList.articles)}</Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    ));

    return (
      <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className={classes.heading}>Expansion Panel 1</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
            sit amet blandit leo lobortis eget.
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    );
  }
}

export default FavList;
