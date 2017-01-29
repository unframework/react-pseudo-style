var React = require('react');
var ReactDOM = require('react-dom');
var Styletron = require('styletron-client');
var injectStyle = require('styletron-utils').injectStyle;

var styletron = new Styletron(null, { prefix: 'psd-sl-' });

class Placeholder extends React.PureComponent {
    componentDidMount() {
        var dom = ReactDOM.findDOMNode(this);

        // @todo there is a bug report about this: https://github.com/rtsao/styletron/issues/69
        // ... part of the issue is that the cache returns a bogus class name on subsequent calls instead of consistently failing with parse error
        // @todo more prefixes?
        var classListString = [
            '::input-placeholder',
            '::-webkit-input-placeholder',
            '::-moz-placeholder',
            ':-ms-placeholder'
        ].map(function (variation) {
            try {
                var styleData = {};
                styleData[variation] = this.props.style;

                return injectStyle(styletron, styleData);
            } catch (e) {
                console.log(e)
                return '';
            }
        }.bind(this)).join(' ');

        dom.className += (dom.className.length ? ' ' : '') + classListString;
    }

    render() {
        return React.Children.only(this.props.children);
    }
}

module.exports = {
    Placeholder: Placeholder
};
