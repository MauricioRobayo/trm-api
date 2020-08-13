#!/usr/bin/env node
/* eslint-disable no-console */

import TrmApi from '../index';

const trmapi = new TrmApi();

trmapi.latest().then(({ valor }) => console.log(valor));
