#!/bin/sh

cd ../../services/api &&
npm install &&
npm run build
npm run migrate
