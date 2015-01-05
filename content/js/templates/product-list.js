this["sculptor"] = this["sculptor"] || {};
this["sculptor"]["templates"] = this["sculptor"]["templates"] || {};

this["sculptor"]["templates"]["views/partials/product-list.handlebars"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, lambda=this.lambda, buffer = "    <div id=\"product-"
    + escapeExpression(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"id","hash":{},"data":data}) : helper)))
    + "\" class=\"item\">\n      <div class=\"slider prev\" title=\"detail\"><span><--Details</span></div>\n      <div class=\"slider next\" title=\"download\"><span>Get this--></span></div>\n      <div id=\"productdetail\" class=\"slide\"> \n        <!-- <img src='"
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.productAssets : depth0)) != null ? stack1.source : stack1), depth0))
    + "' alt=\"Icon\" /> -->\n        <h2 class=\"item-hdr\">"
    + escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"name","hash":{},"data":data}) : helper)))
    + "</h2>\n        <p>"
    + escapeExpression(((helper = (helper = helpers.desc || (depth0 != null ? depth0.desc : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"desc","hash":{},"data":data}) : helper)))
    + "</p>\n        <input type=\"hidden\" name=\"product-id\" value='"
    + escapeExpression(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"id","hash":{},"data":data}) : helper)))
    + "'>\n      </div>  \n";
  stack1 = this.invokePartial(partials['product-platforms'], '      ', 'product-platforms', depth0, undefined, helpers, partials, data);
  if (stack1 != null) { buffer += stack1; }
  return buffer + "    </div>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression, buffer = "<div id=\"listCtg-"
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.productlist : depth0)) != null ? stack1.category_id : stack1), depth0))
    + "\" class=\"list\">\n   <h2 class=\"list-hdr\"></h2>\n";
  stack1 = helpers.each.call(depth0, ((stack1 = (depth0 != null ? depth0.productlist : depth0)) != null ? stack1.products : stack1), {"name":"each","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "</div>";
},"usePartial":true,"useData":true});