import React from 'react';
import withStyles from "@material-ui/core/es/styles/withStyles";

const quoteStyles = () => ({
  quote: {
    padding: "10px 20px",
    margin: "0 0 20px",
    fontSize: "17.5px",
    borderLeft: "5px solid #eee"
  },
  quoteText: {
    margin: "0 0 10px",
    fontStyle: "italic"
  },
  quoteAuthor: {
    display: "block",
    fontSize: "80%",
    lineHeight: "1.42857143",
    color: "#777"
  },
});

export default withStyles(quoteStyles)(({ children, classes }) => (
  <div className={classes.quote}>
    <div className={classes.quoteText}>
      {children}
    </div>
  </div>
))
