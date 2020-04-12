import React, { Component } from "react";
import {
  Grid,
  Typography,
  withStyles,
  TextField,
  Icon,
  Box,
} from "@material-ui/core";
import MUIPlacesAutocomplete from "mui-places-autocomplete";
import GoogleMapReact from "google-map-react";
import Geocode from "react-geocode";
import PropTypes from "prop-types";
import addressStyles from "../../styles/NewOrder/addressStyles";
import MarkerIcon from "../../images/NewOrder/Marker.png";

const apiKEY =
  process.env.GOOGLE_MAPS_API_KEY || require("../../config").google.mapsKEY;
//todo: when on mobile, review goes outside of box

const Marker = () => (
  <div>
    <Icon
      style={{
        textAlign: "center",
        transform: "translate(-50%, -50%)",
        position: "absolute",
      }}
    >
      <img alt="Marker" style={{ height: "100%" }} src={MarkerIcon} />
    </Icon>
  </div>
);

class Address extends Component {
  constructor(props) {
    super(props);

    this.state = {
      center: {
        lat: 29.6516, //default view is gainesville
        lng: -82.3248,
      },
      zoom: 12,
      address: "",
      markerLat: 0,
      markerLong: 0,
      renderMarker: false,
      addressPreferences: "",
    };
  }

  handleAddressSelect = async (suggestion) => {
    this.setState({ address: suggestion.description });

    Geocode.setApiKey(apiKEY);
    await Geocode.fromAddress(suggestion.description).then(
      (res) => {
        const { lat, lng } = res.results[0].geometry.location;
        this.setState({
          center: {
            lat: lat,
            lng: lng,
          },
          zoom: 16,
          markerLat: lat,
          markerLong: lng,
          renderMarker: true,
        });
      },
      (error) => {
        alert("Error: " + error);
      }
    );
  };

  handleAddressChange = (address) => {
    this.setState({ address: address });
  };

  handleMapChange = (properties) => {
    this.setState({
      center: properties.center,
      zoom: properties.zoom,
    });
  };

  renderMarker = () => {
    if (this.state.renderMarker) {
      return <Marker lat={this.state.markerLat} lng={this.state.markerLong} />;
    }
  };

  handlePreferencesChange = (preferences) => {
    this.setState({ addressPreferences: preferences });
  };

  render() {
    const classes = this.props.classes;

    return (
      <React.Fragment>
        <Typography component="h1" variant="h6" gutterBottom>
          What's your address?
        </Typography>
        <Box
          bgcolor="background.paper"
          borderColor="grey.400"
          border={1}
          style={{ marginBottom: 20 }}
        >
          <div style={{ height: "40vh", width: "100%" }}>
            <GoogleMapReact
              bootstrapURLKeys={{
                key: apiKEY,
              }}
              center={this.state.center}
              zoom={this.state.zoom}
              onChange={this.handleMapChange}
            >
              {this.renderMarker()}
            </GoogleMapReact>
          </div>
        </Box>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <div style={{ position: "relative" }}>
              <MUIPlacesAutocomplete
                onSuggestionSelected={(suggestion) =>
                  this.handleAddressSelect(suggestion)
                }
                renderTarget={() => (
                  <React.Fragment>
                    <Typography
                      component="h1"
                      variant="h6"
                      gutterBottom
                      className={classes.title}
                    >
                      Do you have any special instructions for our drivers? (ex:
                      building number, unit, directions, etc.)
                    </Typography>
                    <Grid container spacing={3}>
                      <Grid item xs={12}>
                        <TextField
                          label="Special Instructions"
                          fullWidth
                          multiline
                          variant="outlined"
                          value={this.state.preferences}
                          onChange={(event) => {
                            this.handlePreferencesChange(event.target.value);
                          }}
                        />
                      </Grid>
                    </Grid>
                  </React.Fragment>
                )}
                textFieldProps={{
                  fullWidth: true,
                  variant: "outlined",
                  label: "Search for an address",
                  value: this.state.address,
                  onChange: (event) =>
                    this.handleAddressChange(event.target.value),
                }}
              />
            </div>
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

Address.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(addressStyles)(Address);
