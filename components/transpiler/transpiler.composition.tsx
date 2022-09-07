import React from 'react';
import { transpiler } from './transpiler';

export function ReturnsCorrectValue() {
  return <div>{transpiler()}</div>;
}
