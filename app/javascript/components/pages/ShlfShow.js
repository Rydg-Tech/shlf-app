import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { Card, CardTitle, Col } from "reactstrap";
import { readBlog } from "../../api";

export class ShlfShow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      blogs: [],
    };
  }

  componentDidMount() {
    readBlog().then((blogsArray) => {
      let blog = blogsArray.filter((blog) => blog.shlf_id === this.props.id);
      this.setState({ blogs: blog });
    });
  }
  render() {
    const { shlf } = this.props;
    console.log(this.props);
    console.log(this.state);

    return (
      <>
        <h2>ShlfShow.js page</h2>
        <br />

        <Col sm="6">
          <Card body>
            <CardTitle>{shlf?.name}</CardTitle>
            <img src={shlf?.image} alt="" />
            <a
              href="https://food.unl.edu/free-resource/food-storage#fruit"
              target="_blank"
            >
              Information from FDA
            </a>
            <h2>{this.props.shlf.name} storage conditions</h2>
            <p>Room Temperature : {this.props.shlf.room_temp}</p>
            <p>
              Refrigerator Temperature : {this.props.shlf.refrigerator_temp}
            </p>
            <p>Freezer Temperature : {this.props.shlf.freezer_temp}</p>
          </Card>
        </Col>
      </>
    );
  }
}

export default ShlfShow;
