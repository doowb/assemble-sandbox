
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
    },

    steps: {
      target1: {

      },
      target2: {

      }
    }

  });

  // Load npm plugins to provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');

  grunt.registerMultiTask('steps', 'examples of using steps in assemble', function() {

    var done = this.async();

    grunt.verbose.writeln(('Running ' + this.name + ' - ' + this.target).cyan);

    // require assemble
    var assemble = require('assemble');

    // initalize assemble with the currently running task
    assemble = assemble.init(this);

    // let's see what assemble has now
    grunt.verbose.writeln(require('util').inspect(assemble));
    grunt.verbose.writeln('');

    // you can see there are some defaults that assemble sets up
    // add the steps you want to execute

    assemble.step(function(assemble, next) {
      grunt.log.writeln('running step 1');
      assemble.step1 = 'This is step 1';
      next(assemble);
    });

    assemble.step(function(assemble, next) {
      grunt.log.writeln('running step 2');
      assemble.step2 = {
        data: 'This is step 2'
      };
      next(assemble);
    });

    assemble.step(function(assemble, next) {
      grunt.log.writeln('running step 3');
      assemble.step3 = ['This is step 3'];
      next(assemble);
    });

    // the last step will use the data setup in the first 3 steps
    assemble.step(function(assemble, next) {
      grunt.log.writeln('running step 4');

      grunt.log.writeln('  data from other steps: ');
      grunt.log.writeln('    ' + assemble.step1);
      grunt.log.writeln('    ' + assemble.step2.data);
      grunt.log.writeln('    ' + assemble.step3[0]);
      grunt.log.writeln('');

      next(assemble);
    });

    // now run build
    assemble.build(function(err, results) {
      grunt.log.writeln('build finished');
      done();
    });

  });

  // Default task.
  grunt.registerTask('default', [
    'jshint',
    'steps'
  ]);

  // Tests to be run.
  grunt.registerTask('test', [
    'jshint'
  ]);
};
