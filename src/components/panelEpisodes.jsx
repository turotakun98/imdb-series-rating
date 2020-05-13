import React, { Component } from "react";
import "./panelEpisodes.css";
import CellEpisode from "./cellEpisode";

class PanelEpisodes extends Component {
  render() {
    return this.renderEpisodesSeasons();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.episodesList !== nextProps.episodesList) {
      this.props.onLoad();
    }
  }

  renderEpisodesSeasons() {
    const { episodesList } = this.props;
    if (!episodesList || episodesList.length === 0) {
      return <h1> </h1>;
    } else {
      var table = (
        <table
          id={this.props.id}
          style={{
            transform:
              `scale(${this.props.scaleFactor}) ` +
              (this.props.rotate ? " scaleX(-1) rotate(90deg)" : ""),
          }}
          className={this.getClassName()}
        >
          <thead>
            <tr>{this.renderHeader()}</tr>
          </thead>
          <tbody>{this.renderSeason()}</tbody>
        </table>
      );
      return table;
    }
  }
  getClassName() {
    return this.props.className ? this.props.className : "";
  }

  renderHeader() {
    var vals = this.getMinMaxEpisodeNumber();
    var min = vals[0];
    var max = vals[1];

    var rows = [];
    rows.push(
      <th
        key="ESHseparator"
        className={this.props.rotate ? "cellRotated" : null}
      >
        +
      </th>
    );
    for (var i = min; i <= max; i++) {
      rows.push(
        <th key={"EH" + i} className={this.props.rotate ? "cellRotated" : null}>
          E{i}
        </th>
      );
    }

    //const retVal = distEpisodes.map((i) => <th>Ep{i}</th>);
    return rows;
  }

  getMinMaxEpisodeNumber() {
    const { episodesList } = this.props;
    let max = -Infinity;
    let min = Infinity;

    for (let s in episodesList) {
      for (let e = 0; e < episodesList[s].length; e++) {
        let episodeNr = Math.floor(episodesList[s][e].number);
        if (episodeNr > max) max = episodeNr;
        if (episodeNr < min) min = episodeNr;
      }
    }
    return [min, max];
  }

  renderSeason() {
    const { episodesList } = this.props;

    const retVal = Object.keys(episodesList).map((season) => (
      <tr key={season}>
        <th
          key={"S" + season}
          className={this.props.rotate ? "cellRotated" : null}
        >
          S{season}
        </th>
        {this.renderEpisode(this.props.episodesList[season])}
      </tr>
    ));

    return retVal;
  }

  renderEpisode(episodes) {
    const episodesSorted = episodes.sort(
      (a, b) => Math.floor(a.number) - Math.floor(b.number)
    );

    const retVal = episodesSorted.map((item) => (
      <CellEpisode
        key={"S" + item.season + "E" + item.number}
        episodeInfo={item}
        rotated={this.props.rotate}
      />
    ));

    return retVal;
  }
}

export default PanelEpisodes;
