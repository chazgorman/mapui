module.exports = React.createClass({
    displayName: "MediaDetailed",
    propTypes: {
        mediaDetails: React.PropTypes.object,
        onSelected: React.PropTypes.func,
        selected: React.PropTypes.bool
    },
    getInitialState: function(){
        return {
            loading: false
        };
    },
    componentWillReceiveProps: function() {
        this.setState({
            loading: false
        });
    },
    onSelected: function(){
        this.setState({loading: true});

        setTimeout(this.sendSelected,300);
    },
    sendSelected: function(){
        this.props.onSelected(this.props.mediaDetails);
    },
    render: function () {
        var buttonClassname = "button";
        if(this.state.loading){
            buttonClassname += " is-loading";
        } else if(this.props.selected){
            buttonClassname += "is-success is-outlined";
        }

        return (
            <article className="media">
              <figure className="media-left">
                <p className="image is-20x20">
                  <img src={this.props.mediaDetails.icon} />
                </p>
              </figure>
              <div className="media-content">
                <div className="content">
                  <p>
                    <strong>{this.props.mediaDetails.display_name}</strong>
                      <small>{" (" + this.props.mediaDetails.type + ")"}</small>
                      <br />
                      <small>{"latitude: " + this.props.mediaDetails.lat + ", longitude: " + this.props.mediaDetails.lon}</small>
                    <br />
                  </p>
                </div>
              </div>
              <div className="media-right">
                <a className={buttonClassname} onClick={this.onSelected}>
                  <span className="icon">
                    <i className="fa fa-share-square-o"></i>
                  </span>
                  <span></span>
                </a>
              </div>
            </article>
        );
    }
});