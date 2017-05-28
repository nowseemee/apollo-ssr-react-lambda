const React = require('react');
const { Link } = require('react-router');

const Layout = ({ children, params, location }) => (
  <div>
    <nav className="navbar navbar-default">
      <Link to="/">index</Link> | <Link to="/feed">feed</Link>
    </nav>
    <div className="container">
      {children}
    </div>
  </div>
);

Layout.propTypes = {
  location: React.PropTypes.shape({
    pathname: React.PropTypes.string.isRequired,
  }).isRequired,
  params: React.PropTypes.shape({
    type: React.PropTypes.string,
  }).isRequired,
  children: React.PropTypes.element,
};

module.exports = Layout;
