/**
 * @license Licensed under the Apache License, Version 2.0 (the "License"):
 *          http://www.apache.org/licenses/LICENSE-2.0
 *
 * @fileoverview Front end code relevant only to the Desktop version of
*                Ardublockly.
 */
'use strict';

goog.require('Blockly.dialog');

/** Create a namespace for the application. */
var Ardublockly = Ardublockly || {};

/**
 * Checks if the current JavaScript is loaded in the rendered process of
 * Electron. Works even if the node integration is turned off.
 * @return {!boolean} True if Ardublockly running in Electron application
 */
Ardublockly.isRunningElectron = function() {
  return navigator.userAgent.toLowerCase().indexOf('electron') > -1;
};

/**
 * Because the Node integration causes conflicts with the way JavaScript
 * libraries are declared as modules, this declares them in the window context.
 * This function is to be executed as soon as this file is loaded, and because
 * of that this file must be called in the HTML before the Materialize library
 * is loaded.
 
(function loadJsInElectron(){
  if (Ardublockly.isRunningElectron()) {
    var projectLocator = require('electron').remote.require('./projectlocator.js');
    var projectRoot = projectLocator.getProjectRootPath();
    window.$ = window.jQuery = require(projectRoot +
        '/ardublockly/js_libs/jquery-2.1.3.min.js');
    window.Hammer = require(projectRoot + '/ardublockly/js_libs/hammer.min.js');
    window.JsDiff = require(projectRoot + '/ardublockly/js_libs/diff.js');
  }
})();
*/
/** Sets all the elements using the container class to have a width of 100%. */
Ardublockly.containerFullWidth = function() {
  var containers = $('.container');
  for (var i = 0; i < containers.length; i++) {
    containers[i].style.width = '100%';
  }
};

/** Hides the side menu button. */
Ardublockly.hideSideMenuButton = function() {
  var sideMenuButton = document.getElementById('button-collapse');
  sideMenuButton.style.setProperty ('display', 'none', 'important');
};

/**
 * Launches a materialize modal as a text prompt 
 * @param {string} message Main text message for the window prompt.
 * @param {string=} defaultValue Input string to be displayed by default.
 * @param {function} callback To process the user input.
 */
Ardublockly.htmlPrompt = function(message, defaultValue, callback) {
  $('#gen_prompt_message').text('');
  $('#gen_prompt_message').append(message);
  $('#gen_prompt_input').val(defaultValue);
  // Bind callback events to buttons
  $('#gen_prompt_ok_link').bind('click', function() {
    if($('#gen_prompt_input').val() !== defaultValue)
      callback($('#gen_prompt_input').val());
    $('#gen_prompt_ok_link').unbind('click');
  });
  /*
  $('#gen_prompt_cancel_link').bind('click', function() {
    callback(null);
  });
  */ 
  $('#gen_prompt').openModal();
  window.location.hash = '';
};

/** Initialize Ardublockly code required for Electron on page load. */
window.addEventListener('load', function load(event) {
  window.removeEventListener('load', load, false);
  if (Ardublockly.isRunningElectron()) {
    // Edit the page layout for better appearance on desktop
    Ardublockly.containerFullWidth();
    //Ardublockly.hideSideMenuButton();

    // Prevent browser zoom changes like pinch-to-zoom
    // var webFrame = require('electron').webFrame;
    // webFrame.setZoomLevelLimits(1, 1);

    // Electron does not offer a prompt, so replace Blocks version with modal
    // Original signature: function(message, opt_defaultInput, opt_callback)
    Blockly.dialog.setPrompt(Ardublockly.htmlPrompt);
  }
});
