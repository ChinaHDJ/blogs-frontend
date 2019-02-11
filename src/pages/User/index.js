import React, { Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar/Avatar';
import Paper from '@material-ui/core/Paper/Paper';
import Grid from '@material-ui/core/Grid/Grid';
import Typography from '@material-ui/core/Typography/Typography';
import Tabs from '@material-ui/core/Tabs/Tabs';
import Tab from '@material-ui/core/Tab/Tab';
import SwipeableViews from 'react-swipeable-views';
import FollowingList from './common/component/FollowingList';
import FavList from './common/component/FavList';
import { Tag } from 'antd';
import logo from '@/assets/8.jpg';

import { IconButton, Button } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import UserPaper from './common/component/UserPaper';

import TextResolve from '@/lib/component/TextResolve'
import Media from "react-media";

const styles = theme => ({
  backgroundProfile: {
    width: '100%',
    height: '35%',
    backgroundImage: `url(${logo})`,
    backgroundPositionY: 'center',
    backgroundPositionX: 'center',
  },

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

class User extends React.Component {
  state = {
    leftTabIndex: 0,
    rightTabIndex: 0,
  };

  handleTabChange = stateName => (event, newValue) => {
    this.setState({
      [stateName]: newValue,
    });
  };

  handleTabChangeIndex = stateName => index => {
    this.setState({
      [stateName]: index,
    });
  };

  render() {
    const { classes, isMobile } = this.props;
    const { leftTabIndex, rightTabIndex } = this.state;

    console.log(isMobile);
    return (
      <Fragment>
        <br/>

        <Paper style={{padding: 10}}>
        </Paper>

        <Grid
          container
          className={classes.backgroundProfile}
          direction="row"
          justify="center"
          alignItems="flex-end"
        >
          <UserPaper isMobile={isMobile} />
        </Grid>

        <Paper>
          <Tabs
            value={leftTabIndex}
            onChange={this.handleTabChange('leftTabIndex')}
            indicatorColor="primary"
            textColor="primary"
            centered
          >
            <Tab label="个人主页" />
            <Tab label="关注内容" />
          </Tabs>
        </Paper>
        <br />

        <Grid container>
          <Grid item xs={'auto'} sm={2} />
          <Grid item xs={12} sm={8}>
            <Grid container spacing={!isMobile * 16}>
              <Grid item xs={12} sm={4}>
                <Paper>
                  <Tabs
                    value={leftTabIndex}
                    onChange={this.handleTabChange('leftTabIndex')}
                    indicatorColor="primary"
                    textColor="primary"
                    centered
                  >
                    <Tab label="关注" />
                    <Tab label="收藏" />
                  </Tabs>
                  <SwipeableViews
                    index={leftTabIndex}
                    onChangeIndex={this.handleTabChangeIndex('leftTabIndex')}
                    style={{
                      width: '100%',
                      height: '300px',
                    }}
                  >
                    <TabContainer>
                      <FollowingList users={[]} />
                    </TabContainer>
                    <TabContainer>
                      <FavList list={[]} />
                    </TabContainer>
                    <TabContainer>Item Three</TabContainer>
                  </SwipeableViews>
                </Paper>
              </Grid>

              <Grid item xs={12} sm={8}>
                <Paper>
                  <Tabs
                    value={rightTabIndex}
                    onChange={this.handleTabChange('rightTabIndex')}
                    indicatorColor="primary"
                    textColor="primary"
                  >
                    <Tab label="动态" />
                    <Tab label="帖子" />
                    <Tab label="评论" />
                  </Tabs>

                  <SwipeableViews
                    index={rightTabIndex}
                    onChangeIndex={this.handleTabChangeIndex('rightTabIndex')}
                    style={{
                      width: '100%',
                      minHeight: '450px',
                    }}
                  >
                    <TabContainer>1</TabContainer>
                    <TabContainer>2</TabContainer>
                    <TabContainer>3</TabContainer>
                  </SwipeableViews>
                </Paper>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={'auto'} sm={2} />
        </Grid>
      </Fragment>
    );
  }
}

function MediaUserPage(props) {
  return (
    <Media query={{ maxWidth: 599 }}>
      {isMobile => <User {...props} isMobile={isMobile}/>}
    </Media>
  )
}

export default withStyles(styles)(MediaUserPage);
