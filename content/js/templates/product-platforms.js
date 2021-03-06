this["sculptor"] = this["sculptor"] || {};
this["sculptor"]["templates"] = this["sculptor"]["templates"] || {};

this["sculptor"]["templates"]["views/partials/product-platforms.handlebars"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
  var stack1, helper, lambda=this.lambda, escapeExpression=this.escapeExpression, functionType="function", helperMissing=helpers.helperMissing;
  return "        <div class=\"subitem\"> 	     \n          <a href="
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.productPlatform : depth0)) != null ? stack1.link_url : stack1), depth0))
    + " class=\"btn linkto\"><img src="
    + escapeExpression(((helper = (helper = helpers.image_src || (depth0 != null ? depth0.image_src : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"image_src","hash":{},"data":data}) : helper)))
    + " alt="
    + escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"name","hash":{},"data":data}) : helper)))
    + " /></a>\n          <div class=\"itm-grp\">\n               <h3>"
    + escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"name","hash":{},"data":data}) : helper)))
    + "</h3>\n               <h4>"
    + escapeExpression(((helper = (helper = helpers.type || (depth0 != null ? depth0.type : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"type","hash":{},"data":data}) : helper)))
    + "</h4>\n          </div>\n	  <p>"
    + escapeExpression(((helper = (helper = helpers.desc || (depth0 != null ? depth0.desc : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"desc","hash":{},"data":data}) : helper)))
    + "</p>\n	</div>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, buffer = "<div id=\"productplatforms\" class=\"slide\">\n";
  stack1 = helpers.each.call(depth0, (depth0 != null ? depth0.platforms : depth0), {"name":"each","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "</div>  ";
},"useData":true});