module.exports = React.createClass({
    displayName: "TitledMessage",
    propTypes: {
        title: React.PropTypes.string,
        text: React.PropTypes.string,
        classname: React.PropTypes.string
    },
    render: function () {
        var pClassName = "message " + this.props.classname;
        return (
            <article className={pClassName}>
                <div className="message-header">
                    {this.props.title}
                </div>
                <div class="message-body">
                    <br />
                    {this.props.text}
                    <br />
                </div>
            </article>
        );
    }
});