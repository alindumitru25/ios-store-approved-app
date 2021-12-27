const { reduce } = require("lodash");

// remove userId with reduce so we can return a map
const filterMaps = (entity, userId, prop) =>
  reduce(
    entity[prop],
    (filteredMap, value, key) => {
      if (parseInt(key) !== userId) {
        filteredMap = {
          ...filteredMap,
          [key]: true
        };
      }

      return filteredMap;
    },
    {}
  );

exports.filterMaps = filterMaps;
