import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import addressStyles from "../../styles/NewOrder/addressStyles";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core";
import PlacesAutocomplete from "react-places-autocomplete";
import {
  geocodeByAddress,
  geocodeByPlaceId,
  getLatLng,
} from "react-places-autocomplete";

/*
class Address extends Component {
  constructor(props) {
    super(props);
    this.state = { address: "" };
  }

  handleChange = (address) => {
    this.setState({ address });
  };

  handleSelect = (address) => {
    geocodeByAddress(address)
      .then((results) => getLatLng(results[0]))
      .then((latLng) => console.log("Success", latLng))
      .catch((error) => console.error("Error", error));
  };

  render() {
    const classes = this.props.classes;

    
    return (
      <React.Fragment>
        <Typography component="h1" variant="h6" gutterBottom>
          What's your address?
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}></Grid>
          <Grid item xs={12} sm={6}></Grid>
        </Grid>
        <Typography
          component="h1"
          variant="h6"
          gutterBottom
          className={classes.title}
        >
          What's your preferred pickup time?
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}></Grid>
        </Grid>
      </React.Fragment>
    );

    return (
      <PlacesAutocomplete
        value={this.state.address}
        onChange={this.handleChange}
        onSelect={this.handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <input
              {...getInputProps({
                placeholder: "Search Places ...",
                className: "location-search-input",
              })}
            />
            <div className="autocomplete-dropdown-container">
              {loading && <div>Loading...</div>}
              {suggestions.map((suggestion) => {
                const className = suggestion.active
                  ? "suggestion-item--active"
                  : "suggestion-item";
                // inline style for demonstration purpose
                const style = suggestion.active
                  ? { backgroundColor: "#fafafa", cursor: "pointer" }
                  : { backgroundColor: "#ffffff", cursor: "pointer" };
                return (
                  <div
                    {...getSuggestionItemProps(suggestion, {
                      className,
                      style,
                    })}
                  >
                    <span>{suggestion.description}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
    );
  }
}

Address.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(addressStyles)(Address);
*/

class Address extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      address: "",
      errorMessage: "",
      latitude: null,
      longitude: null,
      isGeocoding: false,
    };
  }

  isObject = (val) => {
    return typeof val === "object" && val !== null;
  };

  classnames = (...args) => {
    const classes = [];
    args.forEach((arg) => {
      if (typeof arg === "string") {
        classes.push(arg);
      } else if (this.isObject(arg)) {
        Object.keys(arg).forEach((key) => {
          if (arg[key]) {
            classes.push(key);
          }
        });
      } else {
        throw new Error(
          "`classnames` only accepts string or object as arguments"
        );
      }
    });

    return classes.join(" ");
  };

  handleChange = (address) => {
    this.setState({
      address,
      latitude: null,
      longitude: null,
      errorMessage: "",
    });
  };

  handleSelect = (selected) => {
    this.setState({ isGeocoding: true, address: selected });
    geocodeByAddress(selected)
      .then((res) => getLatLng(res[0]))
      .then(({ lat, lng }) => {
        this.setState({
          latitude: lat,
          longitude: lng,
          isGeocoding: false,
        });
      })
      .catch((error) => {
        this.setState({ isGeocoding: false });
        console.log("error", error); // eslint-disable-line no-console
      });
  };

  handleCloseClick = () => {
    this.setState({
      address: "",
      latitude: null,
      longitude: null,
    });
  };

  handleError = (status, clearSuggestions) => {
    console.log("Error from Google Maps API", status); // eslint-disable-line no-console
    this.setState({ errorMessage: status }, () => {
      clearSuggestions();
    });
  };

  render() {
    //let classnames = this.classnames();
    const {
      address,
      errorMessage,
      latitude,
      longitude,
      isGeocoding,
    } = this.state;

    return (
      <div>
        <PlacesAutocomplete
          onChange={this.handleChange}
          value={address}
          onSelect={this.handleSelect}
          onError={this.handleError}
          shouldFetchSuggestions={address.length > 2}
        >
          {({ getInputProps, suggestions, getSuggestionItemProps }) => {
            return (
              <div className="Demo__search-bar-container">
                <div className="Demo__search-input-container">
                  <input
                    {...getInputProps({
                      placeholder: "Search Places...",
                      className: "Demo__search-input",
                    })}
                  />
                  {this.state.address.length > 0 && (
                    <button
                      className="Demo__clear-button"
                      onClick={this.handleCloseClick}
                    >
                      x
                    </button>
                  )}
                </div>
                {suggestions.length > 0 && (
                  <div className="Demo__autocomplete-container">
                    {suggestions.map((suggestion) => {
                      const className = this.classnames(
                        "Demo__suggestion-item",
                        {
                          "Demo__suggestion-item--active": suggestion.active,
                        }
                      );

                      return (
                        /* eslint-disable react/jsx-key */
                        <div
                          {...getSuggestionItemProps(suggestion, { className })}
                        >
                          <strong>
                            {suggestion.formattedSuggestion.mainText}
                          </strong>{" "}
                          <small>
                            {suggestion.formattedSuggestion.secondaryText}
                          </small>
                        </div>
                      );
                      /* eslint-enable react/jsx-key */
                    })}
                    <div className="Demo__dropdown-footer">
                      <div>
                        <img
                          src={require("./images/powered_by_google_default.png")}
                          className="Demo__dropdown-footer-image"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          }}
        </PlacesAutocomplete>
        {errorMessage.length > 0 && (
          <div className="Demo__error-message">{this.state.errorMessage}</div>
        )}

        {((latitude && longitude) || isGeocoding) && (
          <div>
            <h3 className="Demo__geocode-result-header">Geocode result</h3>
            {isGeocoding ? (
              <div>
                <i className="fa fa-spinner fa-pulse fa-3x fa-fw Demo__spinner" />
              </div>
            ) : (
              <div>
                <div className="Demo__geocode-result-item--lat">
                  <label>Latitude:</label>
                  <span>{latitude}</span>
                </div>
                <div className="Demo__geocode-result-item--lng">
                  <label>Longitude:</label>
                  <span>{longitude}</span>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
}

export default Address;
