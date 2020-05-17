import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  makeStyles,
  withStyles,
  Stepper,
  Step,
  StepLabel,
  StepConnector,
} from "@material-ui/core";
import clsx from "clsx";
import AssignmentTurnedInIcon from "@material-ui/icons/AssignmentTurnedIn";
import DirectionsCarIcon from "@material-ui/icons/DirectionsCar";
import CheckIcon from "@material-ui/icons/Check";
import RoomIcon from "@material-ui/icons/Room";
import LocalLaundryServiceIcon from "@material-ui/icons/LocalLaundryService";
import progressBarStyles from "../../../../styles/User/OrderStatus/components/progressBarStyles";

//todo: use this card format as a basis for all other pages

const ColorlibConnector = withStyles({
  alternativeLabel: {
    top: 22,
  },
  active: {
    "& $line": {
      backgroundImage:
        "linear-gradient( 95deg, rgb(0, 153, 255) 0%, rgb(0, 153, 255) 50%, rgb(0, 102, 204) 100%)",
    },
  },
  completed: {
    "& $line": {
      backgroundImage:
        "linear-gradient( 95deg, rgb(0, 153, 255) 0%, rgb(0, 153, 255) 50%, rgb(0, 102, 204) 100%)",
    },
  },
  line: {
    height: 3,
    border: 0,
    backgroundColor: "#eaeaf0",
    borderRadius: 1,
  },
})(StepConnector);

const useColorlibStepIconStyles = makeStyles({
  root: {
    backgroundColor: "#ccc",
    zIndex: 1,
    color: "#fff",
    width: 50,
    height: 50,
    display: "flex",
    borderRadius: "50%",
    justifyContent: "center",
    alignItems: "center",
  },
  active: {
    backgroundImage:
      "linear-gradient( 136deg, rgb(102, 255, 255) 0%, rgb(0, 153, 255) 50%, rgb(0, 51, 204) 100%)",
    boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)",
  },
  completed: {
    backgroundImage:
      "linear-gradient( 136deg, rgb(102, 255, 255) 0%, rgb(0, 153, 255) 50%, rgb(0, 51, 204) 100%)",
  },
});

const ColorlibStepIcon = (props) => {
  const classes = useColorlibStepIconStyles();
  const { active, completed } = props;

  const icons = {
    1: <AssignmentTurnedInIcon />,
    2: <DirectionsCarIcon />,
    3: <RoomIcon />,
    4: <LocalLaundryServiceIcon />,
    5: <DirectionsCarIcon />,
    6: <CheckIcon />,
  };

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
        [classes.completed]: completed,
      })}
    >
      {icons[String(props.icon)]}
    </div>
  );
};

ColorlibStepIcon.propTypes = {
  /**
   * Whether this step is active.
   */
  active: PropTypes.bool,
  /**
   * Mark the step as completed. Is passed to child components.
   */
  completed: PropTypes.bool,
  /**
   * The label displayed in the step icon.
   */
  icon: PropTypes.node,
};

const steps = [
  "Order placed",
  "Picked up by driver",
  "Dropped off to washer",
  "Done washing",
  "Picked up from washer",
  "Delivered",
];

class ProgressBar extends Component {
  renderStep = (status) => {
    if (status === 0 || status === 1) {
      return 0;
    } else {
      return status - 1;
    }
  };

  render() {
    const classes = this.props.classes;

    return (
      <React.Fragment>
        <div className={classes.root}>
          <Stepper
            alternativeLabel
            activeStep={this.renderStep(this.props.status)}
            connector={<ColorlibConnector />}
          >
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel StepIconComponent={ColorlibStepIcon}>
                  {label}
                </StepLabel>
              </Step>
            ))}
          </Stepper>
        </div>
      </React.Fragment>
    );
  }
}

ProgressBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(progressBarStyles)(ProgressBar);
