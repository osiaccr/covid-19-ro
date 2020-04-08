import React, { Component } from "react";
import {
  Grid,
  Link,
  Paper,
  Typography,
  Card,
  CardContent,
} from "@material-ui/core";
import {
  ResponsiveContainer,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Line,
} from "recharts";

import "../css/home.css";

import githubLogo from "../images/github-logo.png";

export default class Home extends Component {
  render() {
    const numberWithCommas = (x: Number) => {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    const Summary = () => {
      return (
        <>
          <Grid item xs={12}>
            <Typography align="center" color="textPrimary" variant="h4">
              Cazuri:
            </Typography>
            <Typography align="center" color="textSecondary" variant="h2">
              {numberWithCommas(this.props.totalCases)}
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography align="center" color="textPrimary" variant="h4">
              Decese:
            </Typography>
            <Typography align="center" color="primary" variant="h2">
              {numberWithCommas(this.props.totalDeaths)}
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography align="center" color="textPrimary" variant="h4">
              Vindecați:
            </Typography>
            <Typography align="center" color="secondary" variant="h2">
              {numberWithCommas(this.props.totalRecovered)}
            </Typography>
          </Grid>
        </>
      );
    };

    const ClosedCases = () => {
      return (
        <Grid
          item
          xs={12}
          style={{ width: "95%", paddingRight: 5, paddingLeft: 5 }}
        >
          <Card style={{ width: "100%" }}>
            <CardContent
              style={{ background: "gray", paddingBottom: 2, paddingTop: 2 }}
            >
              <Typography
                align="center"
                color="textPrimary"
                style={{ fontSize: 30 }}
              >
                Cazuri închise
              </Typography>
            </CardContent>
            <CardContent>
              <Typography
                align="center"
                color="textPrimary"
                style={{ fontSize: 30, fontWeight: "bold", letterSpacing: 3 }}
              >
                {numberWithCommas(this.props.totalClosed)}
              </Typography>
              <Typography align="center" color="textSecondary" display="block">
                De cauzri au fost închise
              </Typography>
              <Grid container style={{ marginTop: 25 }}>
                <Grid item xs={6} style={{ textAlign: "center" }}>
                  <Typography
                    display="inline"
                    color="secondary"
                    style={{ fontSize: 30 }}
                  >
                    {numberWithCommas(this.props.totalRecovered)}
                  </Typography>
                  <Typography
                    display="inline"
                    color="textPrimary"
                    style={{ fontSize: 20 }}
                  >
                    ({this.props.percentageRecovered.toFixed(2)}%)
                  </Typography>
                  <Typography display="block" color="textSecondary">
                    Persoane vindecate
                  </Typography>
                </Grid>
                <Grid item xs={6} style={{ textAlign: "center" }}>
                  <Typography
                    display="inline"
                    color="primary"
                    style={{ fontSize: 30 }}
                  >
                    {numberWithCommas(this.props.totalDeaths)}
                  </Typography>
                  <Typography
                    display="inline"
                    color="textPrimary"
                    style={{ fontSize: 20 }}
                  >
                    ({this.props.percentageDead.toFixed(2)}%)
                  </Typography>
                  <Typography display="block" color="textSecondary">
                    Persoane Decedate
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      );
    };

    const GraphTotal = () => {
      return (
        <Grid item style={{ width: "95%", paddingRight: 0, paddingLeft: 0 }}>
          <Typography align="center" color="textPrimary" variant="h4">
            Progresul cazurilor totale
          </Typography>
          <Typography align="center" color="textSecondary" variant="h5">
            In perioada: {this.props.firstUpdate} - {this.props.lastUpdate}
          </Typography>
          <ResponsiveContainer width={"95%"} height={420}>
            <LineChart width={800} height={420} data={this.props.data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip contentStyle={{ background: "#303030" }} />
              <Line
                type="monotone"
                dataKey="confirmed"
                stroke="white"
                name="Confirmate"
              />
            </LineChart>
          </ResponsiveContainer>
        </Grid>
      );
    };

    const GraphRecoveredDeaths = () => {
      return (
        <Grid item style={{ width: "95%", paddingRight: 0, paddingLeft: 0 }}>
          <Typography align="center" color="textPrimary" variant="h4">
            Progresul cazurilor închise
          </Typography>
          <Typography align="center" color="textSecondary" variant="h5">
            In perioada: {this.props.firstUpdate} - {this.props.lastUpdate}
          </Typography>
          <ResponsiveContainer width={"95%"} height={420}>
            <LineChart width={800} height={420} data={this.props.data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip contentStyle={{ background: "#303030" }} />
              <Line
                type="monotone"
                dataKey="deaths"
                stroke="red"
                name="Morți"
              />
              <Line
                type="monotone"
                dataKey="recovered"
                stroke="green"
                name="Recuperați"
              />
            </LineChart>
          </ResponsiveContainer>
        </Grid>
      );
    };

    const GraphChange = () => {
      return (
        <Grid item style={{ width: "95%", paddingRight: 0, paddingLeft: 0 }}>
          <Typography align="center" color="textPrimary" variant="h4">
            Rata de creștere a cazurilor totale
          </Typography>
          <Typography align="center" color="textSecondary" variant="h5">
            In perioada: {this.props.firstUpdate} - {this.props.lastUpdate}
          </Typography>
          <ResponsiveContainer width={"95%"} height={420}>
            <LineChart width={800} height={420} data={this.props.dataChange}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip contentStyle={{ background: "#303030" }} />
              <Line
                type="monotone"
                dataKey="change"
                stroke="white"
                name="Creștere"
              />
            </LineChart>
          </ResponsiveContainer>
        </Grid>
      );
    };

    const GraphChangeRate = () => {
      return (
        <Grid item style={{ width: "95%", paddingRight: 0, paddingLeft: 0 }}>
          <Typography align="center" color="textPrimary" variant="h4">
            Rata de creștere ca raport a cazurilor totale
          </Typography>
          <Typography align="center" color="textSecondary" variant="h5">
            In perioada: {this.props.firstUpdate} - {this.props.lastUpdate}
          </Typography>
          <ResponsiveContainer width={"95%"} height={420}>
            <LineChart
              width={800}
              height={420}
              data={this.props.dataChangeRate}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip contentStyle={{ background: "#303030" }} />
              <Line
                type="monotone"
                dataKey="change"
                stroke="white"
                name="Creștere"
              />
            </LineChart>
          </ResponsiveContainer>
        </Grid>
      );
    };

    const Footer = () => {
      return (
        <Paper
          style={{
            width: "100%",
            paddingTop: 10,
            paddingRight: 10,
            paddingLeft: 10,
          }}
        >
          <Grid container xs={12}>
            <Grid item xs={3} style={{ textAlign: "center" }}>
              <Typography
                display="inline"
                color="textSecondary"
                style={{ fontSize: 12 }}
              >
                Creat de Cristian Osiac
              </Typography>
            </Grid>
            <Grid item xs={3} style={{ textAlign: "center" }}>
              <img src={githubLogo} alt="Github logo" />
              <Typography
                display="inline"
                color="textSecondary"
                style={{ fontSize: 12 }}
              >
                <Link href="https://github.com/osiaccr/covid-19-ro">
                  {" "}
                  osiaccr
                </Link>
              </Typography>
            </Grid>
            <Grid item xs={3} style={{ textAlign: "center" }}>
              <Typography
                display="inline"
                color="textSecondary"
                style={{ fontSize: 12 }}
              >
                Date procurate de{" "}
                <Link href="https://documenter.getpostman.com/view/10808728/SzS8rjbc?version=latest#intro">
                  aici
                </Link>
                .
              </Typography>
            </Grid>
            <Grid item xs={3} style={{ textAlign: "center" }}>
              <Typography
                display="inline"
                color="textSecondary"
                style={{ fontSize: 12 }}
              >
                Ai grija de cei dragi,{" "}
                <Link href="https://twitter.com/search?q=%23staiacasa">
                  #staiacasa
                </Link>
                .
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      );
    };

    return (
      <>
        <Grid
          container
          direction="column"
          justify="center"
          alignItems="center"
          spacing={8}
          style={{ width: "100%", margin: 0 }}
        >
          <Grid item xs={12} style={{ paddingTop: 0 }}>
            <Paper elevation={3}>
              <Typography align="center" color="textPrimary" variant="h1">
                Covid-19 în Romania
              </Typography>
            </Paper>
            <Typography align="center" color="textSecondary" variant="h6">
              Ultima alcutalizare: {this.props.lastUpdate}.2020
            </Typography>
          </Grid>

          {Summary()}

          {ClosedCases()}

          {GraphTotal()}

          {GraphRecoveredDeaths()}

          {GraphChange()}

          {GraphChangeRate()}
        </Grid>

        {Footer()}
      </>
    );
  }
}
