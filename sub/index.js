const React = require('react');

module.exports.useOne = function() {
  const [one] = React.useState(1);
  return one;
};
