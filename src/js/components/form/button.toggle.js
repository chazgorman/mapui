module.exports = React.createClass({
    displayName: "ButtonToggle",
    propTypes: {
        buttonOneText: React.PropTypes.string,
        buttonTwoText: React.PropTypes.string,
        selectedButtonText: React.PropTypes.string,
        onToggle: React.PropTypes.func
    },
    getInitialState: function(){
        return {
            loading: ""
        };
    },
    componentWillReceiveProps: function() {
        this.setState({
            loading: ""
        });
    },
    onDefaultClick: function(e){
        if(this.props.onToggle){
            this.props.onToggle(this.props.buttonOneText);
            this.setState({loading: this.props.buttonOneText});
        }
    },
    onSecondaryClick: function(e){
        if(this.props.onToggle){
            this.props.onToggle(this.props.buttonTwoText);
            this.setState({loading: this.props.buttonTwoText});
        }
    },
    render: function () {

        var buttonOneClassName = "button is-info";
        var buttonTwoClassName = "button is-success";
        var iconOneClassName = "fa";
        var iconTwoClassName = "fa fa-check";

        if(this.props.buttonOneText === this.props.selectedButtonText){
            buttonOneClassName = "button is-success";
            buttonTwoClassName = "button is-info";
            iconOneClassName = "fa fa-check";
            iconTwoClassName = "fa";
        }

        return (
            <div className={"column"}>
                <p className={"control"}>
                    <a className={buttonOneClassName} onClick={this.onDefaultClick}>
                        <span>{this.props.buttonOneText}</span>
                      <span className="icon">
                        <i className={iconOneClassName}></i>
                      </span>
                    </a>
                    <span></span>
                    <a className={buttonTwoClassName} onClick={this.onSecondaryClick}>
                        <span>{this.props.buttonTwoText}</span>
                      <span className="icon">
                        <i className={iconTwoClassName}></i>
                      </span>
                    </a>
                </p>
            </div>
        );
    }
});