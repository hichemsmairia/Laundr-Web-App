import React, { Component } from "react";
import {
  CardActions,
  Card,
  CardHeader,
  CardMedia,
  Checkbox,
  Typography,
  withStyles,
  Tooltip,
  Fade,
} from "@material-ui/core";
import PropTypes from "prop-types";
import InfoIcon from "@material-ui/icons/Info";
import preferenceCardStyles from "../../../styles/NewOrder/components/preferenceCardStyles";

const LightTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: theme.palette.common.white,
    color: "rgba(0, 0, 0, 0.87)",
    boxShadow: theme.shadows[1],
    fontSize: 12,
  },
  arrow: {
    color: theme.palette.common.grey,
  },
}))(Tooltip);

class PreferenceCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      openExpand: false,
      selected: false,
      currentImage: this.props.unselectedImage,
    };
  }

  handleSelect = () => {
    if (this.state.selected) {
      this.setState(
        {
          selected: false,
          currentImage: this.props.unselectedImage,
        },
        () => {
          this.props.updateSelected(this.state.selected);
        }
      );
    } else {
      this.setState(
        { selected: true, currentImage: this.props.selectedImage },
        () => {
          this.props.updateSelected(this.state.selected);
        }
      );
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
        <CardActions disableSpacing style={{ justifyContent: "center" }}>
          <LightTooltip
            title={this.props.info}
            TransitionComponent={Fade}
            arrow
          >
            <InfoIcon color="primary" style={{ cursor: "pointer" }} />
          </LightTooltip>
        </CardActions>
      </Card>
    );
  }
}

PreferenceCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(preferenceCardStyles)(PreferenceCard);
