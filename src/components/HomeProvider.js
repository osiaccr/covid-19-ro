import React, { Component } from "react";

import axios from "axios";

import Home from "./Home";

export default class HomeProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      dataChange: [],
      lastUpdate: "",
      firstUpdate: "",
      totalCases: 0,
      totalDeaths: 0,
      totalRecovered: 0,
      totalClosed: 0,
      percentageDead: 0,
      percentageRecovered: 0,
    };
  }

  async componentDidMount() {
    const parseDate = (date) => {
      const dateElements = date.substring(0, 10).split("-");
      return `${dateElements[2]}.${dateElements[1]}`;
    };

    const confirmed = await axios
      .get("https://api.covid19api.com/total/country/romania/status/confirmed")
      .then((res) => res.data);
    const recovered = await axios
      .get("https://api.covid19api.com/total/country/romania/status/recovered")
      .then((res) => res.data);
    const deaths = await axios
      .get("https://api.covid19api.com/total/country/romania/status/deaths")
      .then((res) => res.data);

    let data = [];
    for (let index = 0; index < confirmed.length; index++) {
      try {
        data.push({
          confirmed: confirmed[index].Cases,
          recovered: recovered[index].Cases,
          deaths: deaths[index].Cases,
          date: parseDate(confirmed[index].Date),
        });
      } catch (e) {
        continue;
      }
    }

    let dataChange = [];
    let dataChangeRate = [];
    for (let index = 1; index < confirmed.length; index++) {
      let change = confirmed[index].Cases - confirmed[index - 1].Cases;
      let changeRate =
        confirmed[index - 1].Cases === 0
          ? 0
          : (change / confirmed[index - 1].Cases).toFixed(3);

      dataChange.push({
        change: change,
        date: parseDate(confirmed[index].Date),
      });

      dataChangeRate.push({
        change: changeRate,
        date: parseDate(confirmed[index].Date),
      });
    }

    const totalCases = confirmed[confirmed.length - 1].Cases;
    const totalDeaths = deaths[deaths.length - 1].Cases;
    const totalRecovered = recovered[recovered.length - 1].Cases;

    const lastUpdate = parseDate(confirmed[confirmed.length - 1].Date);
    const firstUpdate = parseDate(confirmed[0].Date);

    const totalClosed = totalRecovered + totalDeaths;
    const percentageRecovered = (totalRecovered * 100) / totalClosed;
    const percentageDead = (totalDeaths * 100) / totalClosed;

    this.setState({
      data,
      dataChange,
      dataChangeRate,
      lastUpdate,
      firstUpdate,
      totalCases,
      totalDeaths,
      totalRecovered,
      totalClosed,
      percentageDead,
      percentageRecovered,
    });
  }

  render() {
    return <Home {...this.state} />;
  }
}
