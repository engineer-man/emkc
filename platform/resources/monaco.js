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

window.monaco = monaco;
