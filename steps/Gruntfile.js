
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({

    // package.json
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      options: {
        jshintrc: './.jshintrc'
      },
      files: [
        'Gruntfile.js'
      ]
    }

  });

  // Load npm plugins to provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');

  // Load local tasks.
  grunt.loadTasks('tasks');

  // Default task.
  grunt.registerTask('default', [
    'jshint'
  ]);

  // Tests to be run.
  grunt.registerTask('test', [
    'jshint'
  ]);
};
