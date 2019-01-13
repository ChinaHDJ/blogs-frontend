import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Avatar from "@material-ui/core/Avatar/Avatar";
import Paper from "@material-ui/core/Paper/Paper";
import Grid from "@material-ui/core/Grid/Grid";
import Typography from "@material-ui/core/Typography/Typography";
import Tabs from "@material-ui/core/Tabs/Tabs";
import Tab from "@material-ui/core/Tab/Tab";
import SwipeableViews from 'react-swipeable-views';
import ExpansionPanel from "@material-ui/core/ExpansionPanel/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary/ExpansionPanelSummary";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails/ExpansionPanelDetails";
import FollowingList from "./common/component/FollowingList";
import FavList from "./common/component/FavList";

const styles = theme => ({
  paper: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
  avatar: {
    width: 80,
    height: 80,
  },
});

function TabContainer({ children, dir }) {
  return (
    <Typography component="div" dir={dir}>
      {children}
    </Typography>
  );
}

class User extends React.Component{
  state = {
    leftTabIndex: 0,
    rightTabIndex: 0,
  };

  handleTabChange = (stateName) => (event, newValue) => {
    this.setState({
      [stateName]: newValue
    });
  };

  handleTabChangeIndex = (stateName) => (index) => {
    this.setState({
      [stateName]: index
    })
  };

  render() {
    const { classes } = this.props;
    const { leftTabIndex, rightTabIndex } = this.state;

    return (
      <Grid container>
        <Grid item xs={"auto"} sm={2}/>
        <Grid item xs={12} sm={8}>
          <br/>
          <Paper className={classes.paper}>
            <Avatar className={classes.avatar} />
          </Paper>
          <br/>

          <Grid container spacing={16}>
            <Grid item xs={12} sm={4}>
              <Paper className={classes.root}>
                <Tabs
                  value={leftTabIndex}
                  onChange={this.handleTabChange("leftTabIndex")}
                  indicatorColor="primary"
                  textColor="primary"
                  centered
                >
                  <Tab label="关注" />
                  <Tab label="收藏" />
                </Tabs>
                <SwipeableViews
                  index={leftTabIndex}
                  onChangeIndex={this.handleTabChangeIndex("leftTabIndex")}
                  style={{
                    width: '100%',
                    height: '300px',
                  }}
                >
                  <TabContainer>
                    <FollowingList users={[]} />
                  </TabContainer>
                  <TabContainer>
                    <FavList list={[]}/>
                  </TabContainer>
                  <TabContainer>Item Three</TabContainer>
                </SwipeableViews>
              </Paper>
            </Grid>

            <Grid item xs={12} sm={8}>
              <Paper>
                <Tabs
                  value={rightTabIndex}
                  onChange={this.handleTabChange("rightTabIndex")}
                  indicatorColor="primary"
                  textColor="primary"
                >
                  <Tab label="动态" />
                  <Tab label="帖子" />
                  <Tab label="评论" />
                </Tabs>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={"auto"} sm={2}/>
      </Grid>
    )
  }
}

export default withStyles(styles)(User);
