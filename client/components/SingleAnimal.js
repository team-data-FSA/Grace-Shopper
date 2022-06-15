import React from "react";
import { connect } from "react-redux";
import { fetchAnimal } from "../store/animal";

//The following are for Material-UI components
import {
  Typography, //text
  Button,
  Card,
  CardMedia,
  CardContent,
  CardActions,
} from "@material-ui/core";

class SingleAnimal extends React.Component {
  componentDidMount() {
    this.props.getAnimal(this.props.match.params.id);
  }

  render() {
    const { animal } = this.props;

    return (
      <div className="container">
        <Card>
          <CardMedia
            component="img"
            alt={`${animal.name} picture`}
            image={animal.picture}
            height="500"
            width="80"
            className="media"
          />
          <CardContent>
            <Typography variant="h5" component="div">
              {animal.name}
            </Typography>
            <Typography variant="body1" component="div">
              Latin Name: {animal.latinName}
            </Typography>
            <Typography variant="body1" component="div">
              Type: {animal.animalType}
            </Typography>
            <Typography variant="body1" component="div">
              Diet: {animal.diet}
            </Typography>
            <Typography variant="body1" component="div">
              Habitat: {animal.habitat}
            </Typography>
            <Typography variant="body1" component="div">
              Location: {animal.location}
            </Typography>
            <Typography variant="body1" component="div">
              LifeSpan: {animal.lifeSpan} years!
            </Typography>
            <Typography variant="body1" component="div">
              Price: ${animal.price}
            </Typography>
          </CardContent>
          <CardActions>
            <Button
              variant="contained"
              color="primary"
              size="small"
              onClick={() => {
                // console.log("button is clicked but nothing happens");
              }}
            >
              Adopt Me!
            </Button>
          </CardActions>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  animal: state.animal,
});
const mapDispatchToProps = (dispatch) => ({
  getAnimal: (id) => dispatch(fetchAnimal(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SingleAnimal);
