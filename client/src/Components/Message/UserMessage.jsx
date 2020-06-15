import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      '& > * + *': {
        marginTop: theme.spacing(2),
      },
    },
  }));

const Message = props =>{
    const classes = useStyles();
    return(
        <div className={classes.root}>
            {
              props.message.success? 
                <Alert severity="success">{props.message.message}</Alert>
                :<Alert severity="error">{props.message.message}</Alert>
            }
            
        </div>
    )
}
export default Message;