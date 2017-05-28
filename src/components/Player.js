import React, { Component } from 'react';
// import ReactPlayer from 'react-player';
import { gql, graphql } from 'react-apollo';
class Player extends Component {
  state = {
    LazyPlayer: null,
    playerProps: {
      url: 'https://s3-eu-west-1.amazonaws.com/ytmedia-nowseemee/Hundred+Waters+-+Show+Me+Love+(Big+Wild+Remix).mp4',
      playing: false,
      loop: false,
      controls: true,
      volume: 0.8,
      playbackRate: 1,
      playsinline: true,
    },
  };

  async componentDidMount() {
    const LazyPlayer = await import('react-player');
    this.setState({
      LazyPlayer,
    });
  }

  render() {
    const { LazyPlayer, playerProps } = this.state;
    return (
      <div className="Player">
        <div className="Player-intro">
          {JSON.stringify(this.props.data.allMovies)}
          <img src="static/images/256.png" alt="" />
          {LazyPlayer
            ? <LazyPlayer
                {...playerProps}
                onEnded={() =>
                  this.setState({
                    playerProps: {
                      ...playerProps,
                      url: 'https://s3-eu-west-1.amazonaws.com/ytmedia-nowseemee/Way+Out+West+-+Tuesday+Maybe.mp4',
                      playing: true,
                    },
                  })}
              />
            : <span>loading</span>}
        </div>
      </div>
    );
  }
}

const withData = graphql(
  gql`
  query Player {
    allMovies {
      title
    }
  }
`,
  {
    options: props => ({
      // variables: {
      //   type: (
      //     props.params &&
      //     props.params.type &&
      //     props.params.type.toUpperCase()
      //   ) || 'TOP',
      //   offset: 0,
      //   limit: ITEMS_PER_PAGE,
      // },
      // fetchPolicy: 'cache-and-network',
    }),
    props: ({ data }) => ({
      data,
    }),
  }
);

export default withData(Player);
