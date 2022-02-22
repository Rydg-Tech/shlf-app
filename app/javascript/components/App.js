import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import About from "./pages/About";
import BlogIndex from "./pages/BlogIndex";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import ShlfIndex from "./pages/ShlfIndex";
import ShlfShow from "./pages/ShlfShow";
import Navbar from "./components/Navbar";
import BlogShow from "./pages/BlogShow";
import BlogNew from "./pages/BlogNew";
import BlogEdit from "./pages/BlogEdit";

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shlves: [],
      blogs: [],
    };
  }

  componentDidMount(){
    this.readBlog(),
    this.readShlf()
  }

  readBlog(){
    fetch("http://localhost:3000/blogs")
    .then(response => response.json())
    .then(blogsArray => this.setState({blogs: blogsArray}))
    .catch(errors => console.log("Blog read errors:", errors))

  }

  readShlf(){
    fetch("http://localhost:3000/shlves")
    .then(response => response.json())
    .then(shlvesArray => this.setState({shlves: shlvesArray}))
    .catch(errors => console.log("Shlf read errors:", errors))

  }

  createBlog = (newBlog) => {
    fetch("http://localhost:3000/blogs", {
    body: JSON.stringify(newBlog),  
    headers: {
      "Content-Type": "application/json"
    },
    method: "POST"
  })
  .then(response => response.json())
  .then(payload => this.readBlog())
  .catch(errors => console.log("Blog create errors:", errors))
  }

  updateBlog = (blog, id) => {
    fetch(`http://localhost:3000/blogs/${id}`, {
      body: JSON.stringify(blog),
      headers: {
        "Content-Type": "application/json"
      },
      method: "PATCH"
    })
    .then(response => response.json())
    .then(payload => this.readBlog())
    .catch(errors => console.log("Blog update errors: ", errors))
  };

  deleteBlog = (id) => {
    console.log("id", id);
  }

  render() {
    return (
      <>
        <Header />
        
        <Router>
          <Navbar />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route
              path="/shlfindex"
              render={(props) => <ShlfIndex shlves={this.state.shlves} />}
            />
            <Route
              path="/shlfshow/:id"
              render={(props) => {
                let id = props.match.params.id;
                let shlf = this.state.shlves.find((shlf) => shlf.id === +id);
                return <ShlfShow shlf={shlf} />;
              }}
            />
            <Route
              path="/blogindex"
              render={(props) => <BlogIndex blogs={this.state.blogs} />}
            />
            <Route
              path="/blogshow/:id"
              render={(props) => {
                let id = props.match.params.id;
                let blog = this.state.blogs.find((blog) => blog.id === +id);
                return <BlogShow blog={blog} deleteBlog={this.deleteBlog} />;
              }}
            />
            <Route
              path="/blognew"
              render={(props) => <BlogNew createBlog={this.createBlog} />}
            />

            <Route
            path="/blogedit/:id"
            render={(props) => {
              let id = props.match.params.id
              let blog = this.state.blogs.find(blog => blog.id === +id)
              return <BlogEdit updateBlog={this.updateBlog} blog={blog} />
            }} />

            <Route path="/about" component={About} />
            <Route component={NotFound}/>
          </Switch>
        </Router>
        <Footer />
      </>
    );
  }
}

export default App;
