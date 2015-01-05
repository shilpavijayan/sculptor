this["sculptor"] = this["sculptor"] || {};
this["sculptor"]["templates"] = this["sculptor"]["templates"] || {};

this["sculptor"]["templates"]["views/partials/about.handlebars"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "<div id=\"aboutus\" class=\"pages\">\n   <h2>About Us</h2>\n   <p>"
    + escapeExpression(((helper = (helper = helpers.about || (depth0 != null ? depth0.about : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"about","hash":{},"data":data}) : helper)))
    + "</p>\n</div>         ";
},"useData":true});