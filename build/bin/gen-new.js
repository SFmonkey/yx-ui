'use strict';

console.log(process.argv);

var fs = require('fs');
var path = require('path');

var componentName = process.argv[2];
var baseUrl = path.resolve(process.cwd(), 'packages', componentName);
var render = require('json-templater/string');
var uppercamelcase = require('uppercamelcase');

if (!componentName) {
    console.error('[组件名]必填 - Please enter new component name');
    process.exit(1);
}

if (fs.existsSync(baseUrl)) {
    console.error('[组件名]重复 - Please enter other component name');
    process.exit(1);
}

fs.mkdirSync(baseUrl);

var ENTRY_TEMPLATE = `import {{name}} from './src/{{name}}';
{{name}}.install = Vue => {
    Vue.component({{name}}.name, {{name}});
};
export default {{name}};
`;

var COMPONENT_TEMPLATE = `<template></template>

<script>
export default {
    name: "yx{{name}}"
};
</script>
`;

var entryJs = render(ENTRY_TEMPLATE, {
    name: uppercamelcase(componentName),
});

var componentJs = render(COMPONENT_TEMPLATE, {
    name: uppercamelcase(componentName),
});

fs.writeFileSync(path.resolve(baseUrl, 'index.js'), entryJs);

fs.mkdirSync(path.resolve(baseUrl, 'src'));

fs.writeFileSync(
    path.resolve(baseUrl, 'src', `${uppercamelcase(componentName)}.vue`),
    componentJs,
);

const components = require('../../components.json');
if (components[componentName]) {
    console.error('[组件名]重复 - Please enter other component name');
    process.exit(1);
}
components[componentName] = `./packages/${componentName}/index.js`;
fs.writeFileSync(
    path.resolve(process.cwd(), 'components.json'),
    JSON.stringify(components),
    'utf8',
);

const sassPath = path.join(
    __dirname,
    '../../packages/theme-chalk/src/index.scss',
);
const sassImportText = `${fs.readFileSync(sassPath)}
@import "./${componentName}.scss";`;
fs.writeFileSync(sassPath, sassImportText, 'utf8');
fs.writeFileSync(
    path.join(
        __dirname,
        `../../packages/theme-chalk/src/${componentName}.scss`,
    ),
    '',
    'utf8',
);
