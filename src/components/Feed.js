import React, { Component } from 'react';
import { gql, graphql } from 'react-apollo';

class Feed extends Component {
  render() {
    return (
      <div className="Feed">
        <div className="Feed-intro">
          {JSON.stringify(this.props.data.allMovies)}
        </div>
      </div>
    );
  }
}

const withData = graphql(
  gql`
  query Feed {
    allMovies {
      description
    }
  }
`,
  {
    options: props => ({}),
    props: ({ data }) => ({
      data,
    }),
  }
);

export default withData(Feed);
