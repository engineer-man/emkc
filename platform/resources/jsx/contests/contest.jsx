import React from 'react';
import axios from 'axios';

import Util from 'js/util';

class Contest extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            title: ''
        };
    }

    componentDidMount() {
        $('.ql-syntax').each(function(i, block) {
            hljs.highlightBlock(block);
        });
    }

    ops_to_html(ops) {
        try {
            ops = JSON.parse(ops).ops;
            var tmp = document.createElement('div');
            (new Quill(tmp, {modules:{syntax: true}})).setContents(ops);
            return tmp.getElementsByClassName('ql-editor')[0].innerHTML;
        } catch (e) {
            return '';
        }
    }

    render() {
        return (
            <div></div>
        );
    }

}

Util.try_render('react_contest_contest', Contest);

export default Contest;
