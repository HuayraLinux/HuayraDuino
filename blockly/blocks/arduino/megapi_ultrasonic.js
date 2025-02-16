/**
 * @license Licensed under the Apache License, Version 2.0 (the "License"):
 *          http://www.apache.org/licenses/LICENSE-2.0
 */

/**
 * @fileoverview Blocks for Arduino ultrasonic library.
 *     The Arduino functions syntax can be found in the following URL:
 *     https://github.com/Makeblock-official/Makeblock-Libraries
 *     Note that this block uses the Blockly.FieldInstance instead of
 *     Blockly.FieldDropdown which generates a unique instance per setup block
 *     in the workspace.
 */
'use strict';

goog.provide('Blockly.Blocks.megaPi_ultrasonic');

goog.require('Blockly.Blocks');
goog.require('Blockly.Types');


/** Common HSV hue for all blocks in this category. */
Blockly.Blocks.megaPi_ultrasonic.HUE = 230;

Blockly.Blocks['megaPi_ultrasonic_config'] = {
  /**
   * Block for for the ultrasonic generator configuration including creating
   * an object instance and setting up the speed. Info in the setHelpUrl link.
   * @this Blockly.Block
   */
  init: function() {
    this.setHelpUrl('https://github.com/Makeblock-official/Makeblock-Libraries');
    this.setColour(Blockly.Blocks.megaPi_ultrasonic.HUE);
    this.appendDummyInput()
        .appendField(Blockly.Msg.ARD_MEGAPI_ULTRASONIC_SETUP)
    this.appendDummyInput()
        .appendField(
            new Blockly.FieldInstance('megaPi_ultrasonic',
                                      Blockly.Msg.ARD_MEGAPI_ULTRASONIC_DEFAULT_NAME,
                                      true, true, false),
            'MEGAPI_ULTRASONIC_NAME')
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.Msg.ARD_MEGAPI_ULTRASONIC_PORT)
        .appendField(new Blockly.FieldDropdown(
            Blockly.Arduino.Boards.selected.digitalPins), 'MEGAPI_ULTRASONIC_PORT')
    this.setTooltip(Blockly.Msg.ARD_MEGAPI_ULTRASONIC_SETUP_TIP);
  },
  /**
   * Updates the content of the the pin related fields.
   * @this Blockly.Block
   */
  updateFields: function() {
    Blockly.Boards.refreshBlockFieldDropdown(
        this, 'MEGAPI_ULTRASONIC_PORT', 'digitalPins');
    }
};

Blockly.Blocks['megaPi_ultrasonic_distance'] = {
  /**
   * Block for reading a distance on a ultrasonic sensor.
   * @this Blockly.Block
   */
  init: function() {
    this.setHelpUrl('https://github.com/Makeblock-official/Makeblock-Libraries');
    this.setColour(Blockly.Blocks.megaPi_ultrasonic.HUE);    
    this.appendDummyInput()
        .appendField(Blockly.Msg.ARD_MEGAPI_ULTRASONIC_DISTANCE)
    this.appendDummyInput()
        .appendField(
          new Blockly.FieldInstance('megaPi_ultrasonic',
                                    Blockly.Msg.ARD_MEGAPI_ULTRASONIC_DEFAULT_NAME,
                                    false, true, false),
          'MEGAPI_ULTRASONIC_NAME')
      this.setTooltip(Blockly.Msg.ARD_MEGAPI_ULTRASONIC_DISTANCE_TIP);
      this.setOutput(true, Blockly.Types.NUMBER.output);
  },
  /**
   * Should be a long (32bit), but  for for now an int.
   * @return {string} The type of return value for the block, an integer.
   */
  getBlockType: function() {
    return Blockly.Types.NUMBER;
  },
  /**
   * Updates the content of the name related fields.
   * @this Blockly.Block
   */
  updateFields: function() {
    Blockly.Arduino.Boards.refreshBlockFieldDropdown(
        this, 'MEGAPI_ULTRASONIC_DEFAULT_NAME', 'megaPi_ultrasonic');
  },
  /**
   * Called whenever anything on the workspace changes.
   * It checks/warns if the selected stepper instance has a config block.
   * @this Blockly.Block
   */
  onchange: function() {
    if (!this.workspace) return;  // Block has been deleted.

    var instanceName = this.getFieldValue('MEGAPI_ULTRASONIC_NAME')
    if (Blockly.Instances.isInstancePresent(instanceName, 'megaPi_ultrasonic', this)) {
      this.setWarningText(null);
    } else {
      // Set a warning to select a valid stepper config block
      this.setWarningText(
        Blockly.Msg.ARD_COMPONENT_WARN1.replace(
            '%1', Blockly.Msg.ARD_MEGAPI_ULTRASONIC_SETUP).replace(
                '%2', instanceName));
    }
  }

};


