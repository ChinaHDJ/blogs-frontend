import React, {Fragment} from 'react';
import _ from 'lodash';
import { Empty } from 'antd';
import ListItem from "@material-ui/core/ListItem/ListItem";
import Avatar from "@material-ui/core/Avatar/Avatar";
import ListItemText from "@material-ui/core/ListItemText/ListItemText";
import Divider from "@material-ui/core/Divider/Divider";
import List from "@material-ui/core/List/List";
import { withStyles } from "@material-ui/core";

/**
 *----------Dragon be here!----------/
 *   ┏┓      ┏┓
 * ┏┻┻━━━┻┻┓
 * ┃              ┃
 * ┃ ━       ━  ┃
 * ┃  ┳┛ ┗┳   ┃
 * ┃              ┃
 * ┃     ┻       ┃
 * ┃              ┃
 * ┗━┓      ┏━┛
 *     ┃      ┃神兽保佑
 *     ┃      ┃代码无BUG！
 *     ┃      ┗━━━━┓
 *     ┃                ┣┓
 *     ┃                ┣┛
 *     ┗━┓━┏━┓━┏┛
 *         ┃  ┃  ┃  ┃
 *         ┗━┛  ┗━┛
 * ━━━━━━神兽出没━━━━━━by: ChinaHDJ
 */

const styles = theme => ({
  tabList: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
});

class FollowingList extends React.Component {
  renderUsers = () =>{
    const { users } = this.props;
    const userCount = users.length - 1;

    if(!users || _.isEmpty(users)){
      return <Empty description="这货一个人都没关注"/>
    }

    return _.map(users, (user,index) => (
      <Fragment>
        <ListItem key={user.id} button>
          <Avatar/>
          <ListItemText primary={user.name} secondary={user.desc} />
        </ListItem>
        {userCount !== index && <Divider/>}
      </Fragment>
    ));
  };

  render() {
    const { classes } = this.props;

    return (
      <List component="nav" className={classes.tabList}>
        {this.renderUsers()}
      </List>
    )
  }
}

export default withStyles(styles)(FollowingList);
