import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchAnimals } from "../store/animals";
import {
  Typography,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
} from "@material-ui/core";

class AllProducts extends React.Component {
  componentDidMount() {
    this.props.getAnimals();
  }
  render() {
    return (
      <div>
        <Typography variant="h3" component="div">
          All Animals
        </Typography>
        <ul className="container">
          {this.props.animals.length > 0 ? (
            this.props.animals.map((animal) => (
              <div className="card" key={animal.id}>
                <Link
                  to={`animals/${animal.id}`}
                  style={{ textDecoration: "none" }}
                >
                  <Card>
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
                    <CardActions>
                      <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        onClick={() => {
                          // console.log("button is clicked but nothing happens");
                        }}
                      >
                        Add to Cart
                      </Button>
                    </CardActions>
                  </Card>
                </Link>
              </div>
            ))
          ) : (
            <div>Loading Animals</div>
          )}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  animals: state.animals,
});

const mapDispatchToProps = (dispatch, { history }) => ({
  getAnimals: () => dispatch(fetchAnimals()),
});

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts);
