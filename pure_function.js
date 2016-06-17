
// pure function
// no side effects
// always same input, same output
// no change origin data

// NO!
function inc(User user) {
  user.name = "baurine";
  return user;
}

// NO!
function inc(x) {
  fetchDataFromNet();
  return x+1;
}

// NO!
function now() {
  return Date.now()
}

// YES
function add(x, y) {
  return x+y;
}
