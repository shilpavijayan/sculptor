module.exports = function (grunt) {
  grunt.initConfig({
    handlebars: {
      compile: {
        options: {
          namespace: "sculptor.templates",
          partialsUseNamespace: true,
          partialsRegex: /product-platforms/
        },
        files: [
          {
            expand: true,
            cwd: '<%= partials %>/',
            src: '*.handlebars',
            dest: '<%= templates %>/',
            ext: '.js',
            extDot: 'first'
          }
        ]   
      } 	
    },
    watch: {
      hbars: {
        files: '<%= partials %>/*.handlebars',
        tasks: ['handlebars:compile']
      }
    }, 	
    partials: 'views/partials',
    templates: 'content/js/templates',
  });

  grunt.loadNpmTasks('grunt-contrib-handlebars');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['watch']);
  grunt.registerTask('hbs', ['handlebars:compile']);
 
};
