import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import About from "./pages/About";
import BlogIndex from "./pages/BlogIndex";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import ShlfIndex from "./pages/ShlfIndex";
import ShlfShow from "./pages/ShlfShow";
import MenuBar from "./components/MenuBar";
import BlogShow from "./pages/BlogShow";
import BlogNew from "./pages/BlogNew";
import BlogEdit from "./pages/BlogEdit";
import Contacts from "./components/Contacts";
import Recipe from "./pages/Recipe";
import "./App.css";
import { readBlog } from "../api";
import { API_URL } from "../constant";

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shlves: [],
      blogs: [],
    };
  }

  componentDidMount() {
    readBlog().then((blogsArray) => this.setState({ blogs: blogsArray }));
    this.readShlf();
  }

  readShlf() {
    fetch(`${API_URL}/shlves`)
      .then((response) => response.json())
      .then((shlvesArray) => this.setState({ shlves: shlvesArray }))
      .catch((errors) => console.log("Shlf read errors:", errors));
  }

  createBlog = (newBlog) => {
    fetch("http://localhost:3000/blogs", {
      body: JSON.stringify(newBlog),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    })
      .then((response) => response.json())
      .then(() => readBlog())
      .catch((errors) => console.log("Blog create errors:", errors));
  };

  updateBlog = (blog, id) => {
    fetch(`http://localhost:3000/blogs/${id}`, {
      body: JSON.stringify(blog),
      headers: {
        "Content-Type": "application/json",
      },
      method: "PATCH",
    })
      .then((response) => response.json())
      .then(() => readBlog())
      .catch((errors) => console.log("Blog update errors: ", errors));
  };

  deleteBlog = (id) => {
    fetch(`http://localhost:3000/blogs/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "DELETE",
    }).then((response) => response.json().then((payload) => readBlog()));
  };

  render() {
    console.log(readBlog());
    const {
      logged_in,
      current_user,
      new_user_route,
      sign_in_route,
      sign_out_route,
    } = this.props;
    return (
      <>
        {logged_in && (
          <div>
            <a href={sign_out_route}>Sign Out</a>
          </div>
        )}
        {!logged_in && (
          <div>
            <a href={sign_in_route}>Sign In</a>
          </div>
        )}

        <Router>
          <MenuBar />
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
                return (
                  <ShlfShow shlf={shlf} blogs={this.state.blogs} id={+id} />
                );
              }}
            />
            <Route
              path="/blogindex"
              render={(props) => (
                <BlogIndex
                  blogs={this.state.blogs}
                  shlves={this.state.shlves}
                  current_user={current_user}
                />
              )}
            />
            <Route
              path="/blogshow/:id"
              render={(props) => {
                let id = props.match.params.id;
                let blog = this.state.blogs.find((blog) => blog.id === +id);
                return (
                  <BlogShow
                    blog={blog}
                    deleteBlog={this.deleteBlog}
                    current_user={current_user}
                  />
                );
              }}
            />
            <Route
              path="/blognew"
              render={(props) => (
                <BlogNew
                  createBlog={this.createBlog}
                  current_user={current_user}
                  readBlog={readBlog}
                />
              )}
            />

            <Route
              path="/blogedit/:id"
              render={(props) => {
                let id = props.match.params.id;
                let blog = this.state.blogs.find((blog) => blog.id === +id);
                return (
                  <BlogEdit
                    updateBlog={this.updateBlog}
                    blog={blog}
                    current_user={current_user}
                    shlf_id={this.state.shlves.id}
                  />
                );
              }}
            />
            <Route path="/recipe" component={Recipe} />
            <Route path="/about" component={About} />
            <Route component={NotFound} />
          </Switch>
        </Router>
        <Contacts />
      </>
    );
  }
}

export default App;
