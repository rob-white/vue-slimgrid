export default Filter;

function Filter(item) {
  // Regex pattern to validate numbers
  // a number negative/positive with decimals with/without $, %
  var patRegex_no = /^[$]?[-+]?[0-9.,]*[$%]?$/,
    columns = this.slickGrid.getColumns(),
    value = true;

  for (var i = 0; i < columns.length; i++) {
    var col = columns[i];
    var filterValues = col.filterValues;

    if (filterValues && filterValues.length > 0) {
      value = value & _.includes(filterValues, item[col.field]);
    }
  }

  for (var columnId in this.filters) {
    if (columnId !== undefined && this.filters[columnId] !== "") {
      var c = this.slickGrid.getColumns()[
        this.slickGrid.getColumnIndex(columnId)
      ];
      var filterVal = this.filters[columnId].toLowerCase();
      var filterChar1 = filterVal.substring(0, 1); // grab the 1st Char of the filter field, so we could detect if it's a condition or not

      if (item[c.field] == null) return false;

      // First let see if the user supplied a condition (<, <=, >, >=, !=, <>, =, ==, etc.)
      // Substring on the 1st Char is enough to find out if it's a condition or not
      // if a condition is supplied, we might have to transform the values (row values & filter value) before comparing
      // for a String (we'll do a regular indexOf), for a number (parse to float then compare), for a date (create a Date Object then compare)
      if (
        filterChar1 == "<" ||
        filterChar1 == ">" ||
        filterChar1 == "!" ||
        filterChar1 == "=" ||
        filterChar1 == "^"
      ) {
        // We found a Condition filter, find the white space index position of the condition substring (should be index 1 or 2)
        var idxFilterSpace = filterVal.indexOf(" ");

        if (idxFilterSpace > 0) {
          // Split the condition & value of the full filter String
          var condition = filterVal.substring(0, idxFilterSpace);
          var filterNoCondVal = this.filters[columnId].substring(
            idxFilterSpace + 1
          );

          // Which type are the row values? We'll convert to proper format before applying the condition
          // Then apply the condition comparison: String (we'll do a regular indexOf), number (parse to float then compare)
          if (patRegex_no.test(item[c.field])) {
            if (
              testCondition(
                condition,
                parseFloat(item[c.field]),
                parseFloat(filterNoCondVal)
              ) == false
            )
              return false;
            // whatever is remain will be tested as a regular String format
          } else {
            if (
              testCondition(
                condition,
                item[c.field].toLowerCase(),
                filterNoCondVal.toLowerCase()
              ) == false
            )
              return false;
          }
        }
      } else {
        if (typeof item[c.field] != "number") {
          if (
            item[c.field]
              .toString()
              .toLowerCase()
              .indexOf(this.filters[columnId].toLowerCase()) == -1
          )
            return false;
        } else {
          if (item[c.field].toString().indexOf(this.filters[columnId]) == -1)
            return false;
        }
      }
    }
  }

  return value; //&& filter.call(grid, item);
}

function testCondition(condition, value1, value2) {
  switch (condition) {
    case "^":
      var resultCond = ("" + value1 + "").startsWith("" + value2 + "")
        ? true
        : false;
      break;
    case "<":
      var resultCond = value1 < value2 ? true : false;
      break;
    case "<=":
      var resultCond = value1 <= value2 ? true : false;
      break;
    case ">":
      var resultCond = value1 > value2 ? true : false;
      break;
    case ">=":
      var resultCond = value1 >= value2 ? true : false;
      break;
    case "!=":
    case "<>":
      var resultCond = value1 != value2 ? true : false;
      break;
    case "=":
    case "==":
      var resultCond = value1 == value2 ? true : false;
      break;
  }

  return resultCond;
}
