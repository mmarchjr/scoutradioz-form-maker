/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview The full custom JSON generator built during the custom
 * generator codelab.
 */

import * as Blockly from 'blockly';
import keyGen from '../utils/keyGen';

export const jsonGenerator = new Blockly.Generator('JSON');


const Order = {
  ATOMIC: 0,
};

jsonGenerator.scrub_ = function (block, code, thisOnly) {
  const nextBlock = block.nextConnection && block.nextConnection.targetBlock();
  if (nextBlock && !thisOnly) {
    return code + ',\n' + jsonGenerator.blockToCode(nextBlock);
  }
  return code;
};

jsonGenerator.forBlock['logic_null'] = function (block) {
  return ['null', Order.ATOMIC];
};

jsonGenerator.forBlock['text'] = function (block) {
  const textValue = block.getFieldValue('TEXT');
  const code = `"${textValue}"`;
  return [code, Order.ATOMIC];
};

jsonGenerator.forBlock['math_number'] = function (block) {
  const code = String(block.getFieldValue('NUM'));
  return [code, Order.ATOMIC];
};

jsonGenerator.forBlock['logic_boolean'] = function (block) {
  const code = block.getFieldValue('BOOL') == 'TRUE' ? 'true' : 'false';
  return [code, Order.ATOMIC];
};

jsonGenerator.forBlock['member'] = function (block, generator) {
  const name = block.getFieldValue('MEMBER_NAME');
  const value = generator.valueToCode(block, 'MEMBER_VALUE', Order.ATOMIC);
  const code = `"${name}": ${value}`;
  return code;
};

jsonGenerator.forBlock['lists_create_with'] = function (block, generator) {
  const values = [];
  for (let i = 0; i < block.itemCount_; i++) {
    const valueCode = generator.valueToCode(block, 'ADD' + i, Order.ATOMIC);
    if (valueCode) {
      values.push(valueCode);
    }
  }
  const valueString = values.join(',\n');
  const indentedValueString = generator.prefixLines(
    valueString,
    generator.INDENT,
  );
  const codeString = '[\n' + indentedValueString + '\n]';
  return [codeString, Order.ATOMIC];
};

jsonGenerator.forBlock['object'] = function (block, generator) {
  const statementMembers = generator.statementToCode(block, 'MEMBERS');
  const code = '{\n' + statementMembers + '\n}';
  return [code, Order.ATOMIC];
};

jsonGenerator.forBlock['json_start'] = function (block, generator) {
  const value = generator.statementToCode(block, 'JSON');
  const code = '[\n' + value + '\n]';
  return [code, Order.ATOMIC];
};


jsonGenerator.forBlock['spacer'] = function (block, generator) {
  const code = `{\n"type": "spacer"\n}`;
  return code;
};

jsonGenerator.forBlock['large_header'] = function (block, generator) {
  const text = block.getFieldValue('NAME');
  const key = block.getFieldValue('KEY');
  const code = `{\n"type": "h2",\n"label": "${text}",\n"id": "${keyGen(key)}"\n}`;
  return code;
};
jsonGenerator.forBlock['small_header'] = function (block, generator) {
  const text = block.getFieldValue('NAME');
  const key = block.getFieldValue('KEY');
  const code = `{\n"type": "h3",\n"label": "${text}",\n"id": "${keyGen(key)}"\n}`;
  return code;
};

jsonGenerator.forBlock['checkbox'] = function (block, generator) {
  const text = block.getFieldValue('NAME');
  const key = block.getFieldValue('KEY');
  const code = `{\n"type": "checkbox",\n"label": "${text}",\n"id": "${keyGen(key)}"\n}`;
  return code;
};
