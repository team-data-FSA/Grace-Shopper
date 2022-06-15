import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchAnimals } from "../store/animals";

//The following are for Material-UI components
import {
  Typography, //text
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
} from "@material-ui/core";

class AllAnimals extends React.Component {
  componentDidMount() {
    this.props.getAnimals();
  }
  render() {
    return (
      <div>
        <Typography variant="h3" component="div">
          Welcome to our exotic shelter.
        </Typography>
        <ul className="container">
          {this.props.animals.length > 0 ? (
            this.props.animals.map((animal) => (
              <div className="card" key={animal.id}>
                <Card>
                  <Link
                    to={`animals/${animal.id}`}
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    <CardMedia
                      component="img"
                      alt={`${animal.name} picture`}
                      image={animal.picture}
                      height="400"
                      className="media"
                    />
                    <CardContent>
                      <Typography variant="h5" component="div">
                        {animal.name}
                      </Typography>
                      <Typography variant="body1" component="div">
                        {"$"}
                        {animal.price}
                      </Typography>
                    </CardContent>
                  </Link>
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
            ))
          ) : (
            <div>Loading Exotic Pets!</div> //this catches while the animals load may not be optimal solution
          )}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  animals: state.animals,
});

const mapDispatchToProps = (dispatch) => ({
  getAnimals: () => dispatch(fetchAnimals()),
});

export default connect(mapStateToProps, mapDispatchToProps)(AllAnimals);