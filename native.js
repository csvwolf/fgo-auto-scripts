exports.setSpinnerAdapter = function(spinner, options) {
  var sp = spinner
  adapter = new android.widget.ArrayAdapter(context, android.R.layout.simple_spinner_item, options);
  adapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
  sp.setAdapter(adapter);
}
