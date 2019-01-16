import React from 'react';
import { Grid, Paper, Button, withStyles, Avatar } from '@material-ui/core';
import { Icon, Tag } from 'antd';

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

class UserPaper extends React.Component {

  render(){
    const { classes } = this.props;

    return (
          <Grid item xs={12} sm={8}>
            <Paper className={classes.paper}>
              <Grid
                container
              >
                <Grid item
                  xs={3}
                  sm='auto'
                >
                  <Avatar className={classes.avatar} />
                </Grid>

                <Grid
                  item
                  xs={9}
                  sm={9}
                  container
                >
                  <Grid
                    item
                    xs
                    container
                    direction="column"
                    spacing={16}
                    justify="flex-end"
                    alignItems="flex-start"
                    style={{marginLeft: 5}}
                  >
                    <Grid item xs>
                      <div style={{height: 30}}>
                        <Grid
                          container
                          direction="row"
                          justify="flex-start"
                          alignItems="flex-end"
                          spacing={8}
                        >
                          <Grid item style={{color: '#0277bd', fontSize: 20, margin: 0, padding: 0, fontWeight: 'bold'}}>
                            ChinaHDJ
                          </Grid>

                          <Grid item>
                            <Tag><Icon type="github" /> Follow 9k</Tag>
                          </Grid>
                        </Grid>
                      </div>

                      <div style={{height: 50, color: '#b0bec5',display: 'table-cell', verticalAlign: 'bottom'}}>
                        在别人贪婪的时候恐惧，在别人恐惧的时候贪婪。                 ---沃伦 巴菲特
                      </div>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item>
                  <Grid
                    container
                    direction="row"
                    justify="flex-end"
                    alignItems="flex-start"
                    spacing={8}
                  >
                    <Grid item>
                      <Button variant="contained" size='small' color="secondary">
                        关注
                      </Button>
                    </Grid>

                    <Grid item>
                      <Button variant="outlined" size='small' className={classes.button}>
                        私信
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
            <br />
          </Grid>
    )
  }
}

export default withStyles(styles)(UserPaper);
