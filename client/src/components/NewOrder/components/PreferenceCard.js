import React, { Component } from "react";
import {
  Collapse,
  CardActions,
  IconButton,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  Checkbox,
  Typography,
  withStyles,
} from "@material-ui/core";
import clsx from "clsx";
import PropTypes from "prop-types";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import preferenceCardStyles from "../../../styles/NewOrder/components/preferenceCardStyles";

class PreferenceCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      openExpand: false,
      selected: false,
      currentImage: this.props.unselectedImage,
    };
  }

  handleExpandClick = () => {
    this.setState({ openExpand: !this.state.openExpand });
  };

  handleSelect = () => {
    if (this.state.selected) {
      this.setState({
        selected: false,
        currentImage: this.props.unselectedImage,
      });
    } else {
      this.setState({ selected: true, currentImage: this.props.selectedImage });
    }
  };

  render() {
    let classes = this.props.classes;

    return (
      <Card className={classes.root}>
        <CardHeader
          action={
            <Checkbox
              color="primary"
              inputProps={{ "aria-label": "secondary checkbox" }}
              onClick={this.handleSelect}
            />
          }
          title={
            <Typography gutterBottom variant="h6" component="h2">
              {this.props.title}
            </Typography>
          }
        />
        <CardMedia className={classes.media} image={this.state.currentImage} />
        <CardActions disableSpacing>
          <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: this.state.openExpand,
            })}
            onClick={this.handleExpandClick}
            aria-expanded={this.state.openExpand}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
        <Collapse in={this.state.openExpand} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph>{this.props.info}</Typography>
          </CardContent>
        </Collapse>
      </Card>
    );
  }
}

PreferenceCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(preferenceCardStyles)(PreferenceCard);
