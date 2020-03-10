import React, { Component } from "react";
import styled from "styled-components";
import {AppBar, Toolbar, IconButton } from '@material-ui/core'  
import Logo from "./Logo";
import Links from "./Links";

const Container = styled.div.attrs({
  className: "container"
})``;

const Nav = styled.nav.attrs({
  className: "navbar navbar-expand-lg navbar-dark bg-dark"
})``;

class NavBar extends Component {
  render() {
    return (
      <Container>
        <AppBar>

        </AppBar>
      </Container>
    );
  }
}

export default NavBar;
