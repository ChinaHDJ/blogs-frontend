import React, {Fragment} from 'react';
import { Grid, Paper, Button, withStyles, Avatar } from '@material-ui/core';
import { Icon, Tag } from 'antd';
import TextResolve from "../../../../lib/component/TextResolve";
import AddIcon from '@material-ui/icons/Add';
import Fab from "@material-ui/core/Fab/Fab";
import IconButton from "@material-ui/core/IconButton/IconButton";
import Card from "@material-ui/core/es/Card/Card";
import CardHeader from "@material-ui/core/CardHeader/CardHeader";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Menu from "@material-ui/core/Menu/Menu";
import MenuItem from "@material-ui/core/MenuItem/MenuItem";
import ButtonBase from "@material-ui/core/es/ButtonBase/ButtonBase";

const styles = theme => ({
  paper: {
    ...theme.mixins.gutters(),
/*    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,*/
    borderRadius: 0,
  },
  avatar: {
    width: 80,
    height: 80,
  },
  extendedIcon: {
    marginRight: theme.spacing.unit,
  },
});

const options = [
  'None',
  'Atria',
  'Callisto',
  'Dione',
  'Ganymede',
  'Hangouts Call',
  'Luna',
  'Oberon',
  'Phobos',
  'Pyxis',
  'Sedna',
  'Titania',
  'Triton',
  'Umbriel',
];

class UserPaper extends React.Component {

  state = {
    moreButtonState: true
  };
  renderCardHeaderTitle(){
    const { isMobile } = this.props;

    return (
      <Grid item container direction="column" justify="flex-end" alignItems="flex-start">
        <Grid item xs>
          <div style={{height: 30}}>
            <Grid container direction="row" justify="flex-start" alignItems="flex-end">
              <Grid item>
                <Tag color="#2db7f5">Lv1</Tag>
              </Grid>
              <Grid item style={{color: '#0277bd', fontSize: 20, fontWeight: 'bold'}}>
                <TextResolve config={{text: ['ChinaHDJ']}}/>
              </Grid>
            </Grid>
          </div>
        </Grid>
      </Grid>
    )
  }

  renderMoreButton(){

    return (
      <Fragment>
        <Fab size="small" color="secondary" aria-label="Add" >
          <AddIcon />
        </Fab>
      </Fragment>
    )
  }


  render(){
    const { classes, isMobile } = this.props;
    return (
      <Fragment>
        <Grid item xs={12} sm={8} id='userPaper'>
          <Card className={classes.paper}>
            <CardHeader
              avatar={<Avatar aria-label="Recipe" className={classes.avatar} />}
              action={this.renderMoreButton.bind(this)()}
              title={this.renderCardHeaderTitle.bind(this)()}
              subheader={<div style={{height: 50, color: '#b0bec5',display: 'table-cell', verticalAlign: 'bottom'}}>
                在别人贪婪的时候恐惧，在别人恐惧的时候贪婪。                 ---沃伦 巴菲特
              </div>}
            />
          </Card>
          <br/>
        </Grid>
      </Fragment>
    )
  }
}

export default withStyles(styles)(UserPaper);
