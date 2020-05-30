import 'core-js/stable';
import 'regenerator-runtime/runtime';

import axios from 'axios';

try {
    axios.defaults.validateStatus = () => true;
} catch(e) {}

import * as monaco from 'monaco-editor';

monaco.editor.defineTheme('em', {
    base: 'vs-dark',
    inherit: true,
    rules: [{ background: '282C34' }],
    colors: {
        'editorGutter.background': '#21252B',
        'editor.background': '#282C34',
        'scrollbarSlider.background': '#21252B',
        'scrollbarSlider.hoverBackground': '#21252B',
        'scrollbarSlider.activeBackground': '#21252B'
    }
});

(ctx => {
    return ctx.keys().map(ctx);
})(require.context('./js', true, /\.js$/));

(ctx => {
    return ctx.keys().map(ctx);
})(require.context('./jsx', true, /\.jsx$/));

(ctx => {
    return ctx.keys().map(ctx);
})(require.context('./less', true, /\.less$/));
