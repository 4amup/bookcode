exports.name = 'john';
exports.data = 'this is some data';

let privateVariable = 5;

exports.getPrivate = () => {
  return privateVariable;
};