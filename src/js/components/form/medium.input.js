module.exports = React.createClass({
    displayName: "MediumInput",
    propTypes: {
        text: React.PropTypes.string,
        placeholder: React.PropTypes.string,
        isFetching: React.PropTypes.bool,
        onSubmit: React.PropTypes.func
    },
    onSubmit: function(e){
        if (e.key === 'Enter' && this.props.onSubmit) {
            this.props.onSubmit(e.target.value);
        }
    },
    render: function () {
        var pClassName = this.props.isFetching ?
            "control has-addons-centered is-loading" : "control has-addons-centered";
        return (
            <p className={pClassName}>
                <input className="input is-medium"
                       type="text"
                       value={this.props.text}
                       placeholder={this.props.placeholder}
                       onKeyUp={this.onSubmit}/>
            </p>
        );
    }
});