/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview All the custom JSON-related blocks defined in the custom
 * generator codelab.
 */

import * as Blockly from 'blockly';

export const blocks = Blockly.common.createBlockDefinitionsFromJsonArray([
  {
    type: 'object',
    message0: '{ %1 %2 }',
    args0: [
      {
        type: 'input_dummy',
      },
      {
        type: 'input_statement',
        name: 'MEMBERS',
      },
    ],
    output: null,
    colour: 230,
  },
  {
    type: 'member',
    message0: '%1 %2 %3',
    args0: [
      {
        type: 'field_input',
        name: 'MEMBER_NAME',
        text: '',
      },
      {
        type: 'field_label',
        name: 'COLON',
        text: ':',
      },
      {
        type: 'input_value',
        name: 'MEMBER_VALUE',
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 230,
  },
  {
    type: "json_start",
    message0: "Start Form %1  %2 End Form",
    args0: [
      {
        type: 'input_dummy',
      },
      {
        type: 'input_statement',
        name: 'JSON',
      },
    ],
    inputsInline: false,
    output: null,
    colour: 230,
    tooltip: "",
    helpUrl: "",
    // maxInstances: 1
  },

  {
    type: 'spacer',
    message0: '%1',
    args0: [
      {
        type: 'field_label',
        name: 'SPACER',
        text: 'Create Spacer',
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 230,
  },

  {
    type: 'large_header',
    message0: 'Large header with text: %1 and key: %2',
    args0: [
      {
        type: 'field_input',
        name: 'NAME',
        text: '',
      },
      {
        type: 'field_input',
        name: 'KEY',
        text: '',
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 230,
  },
]);
