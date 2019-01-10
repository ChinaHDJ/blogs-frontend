import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Grid from "@material-ui/core/Grid/Grid";
import TextField from "@material-ui/core/TextField/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox/Checkbox";
import {withSnackbar} from "notistack";
import LinearProgress from '@material-ui/core/LinearProgress';
import  { connect } from 'dva';
import { Form} from 'antd';
import FormApi from '../../../lib/FormApi'
import Input from "@material-ui/core/es/Input/Input";
import RequestApi from '../../../lib/RequestApi';

const styles = {
  card: {
    width: '100%',
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
};
@Form.create()
@connect((data)=>({data}))
class PageLogin extends React.Component {
  state = {
    remember_me: true,
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.checked });
  };

  handleClick = ()=> {
  };

  renderLinearProgress = () => {
    const { loading } = this.state;
    if (loading){
      return <LinearProgress/>
    }
  }

  handleSubmit(data) {
    const { email, password, captcha = {} } = data;

    console.log(RequestApi.requestToken({
      session: {
        email: email.value,
        password: password.value,
        captcha: captcha.value,
      }
    }));
  }

  render() {
    const { classes = {} } = this.props;
    const { remember_me = false } = this.state;

    return (
      <Grid container>
        <Grid item lg={4} xs={12}/>
        <Grid item lg={4} xs={12}>
          <br/><br/><br/>
          <Card className={classes.card}>
            <CardContent>
              <form id='loginForm' onSubmit={FormApi.onSubmit(this.handleSubmit.bind(this),'loginForm')}>
                {this.renderLinearProgress()}

                <TextField
                  ref="email"
                  label="邮箱"
                  name="email"
                  style={{width: '100%'}}
                  margin="normal"
                />

                <TextField
                  label="密码"
                  style={{width: '100%'}}
                  type='password'
                  name="password"
                  margin="normal"
                />

                <FormControlLabel
                  control={
                    <Checkbox
                      name={'check'}
                      checked={remember_me}
                      onChange={this.handleChange('remember_me')}
                    />
                  }
                  label="记住我"
                />

                <CardActions align='center'>
                  <Button onClick={this.handleClick} size="small" variant="contained" color="primary" type={'submit'} style={{width: '100px'}}>登入</Button>
                </CardActions>
              </form>
            </CardContent>
          </Card>
        </Grid>
        <Grid item lg={4} xs={12}/>
      </Grid>
    );
  }
}

PageLogin.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withSnackbar(withStyles(styles)(PageLogin));
