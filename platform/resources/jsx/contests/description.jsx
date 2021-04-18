import React from 'react';
import Quill from 'quill';

class Description extends React.Component {

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
            <div class="ql-snow marginbottom20">
                <div
                    class="ql-editor"
                    dangerouslySetInnerHTML={{ __html: this.ops_to_html(this.props.description)}}>
                </div>
            </div>
        );
    }

}

export default Description;
