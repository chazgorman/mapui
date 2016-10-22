module.exports = React.createClass({
    displayName: "Footer",
    propTypes: {
        title: React.PropTypes.string,
        titleTextAndLink: React.PropTypes.object,
        twitterName: React.PropTypes.string,
        githubName: React.PropTypes.string,
        githubProject: React.PropTypes.string
    },
    render: function () {
        var twitterSection, githubSection;
        if(this.props.twitterName){
            twitterSection = (
                    <a className="icon" href={"http://twitter.com/" + this.props.twitterName}>
                        <i className="fa fa-twitter"></i>
                    </a>
            );
        }

        if(this.props.githubName && this.props.githubProject){
            githubSection = (
                <a className="icon" href={"https://github.com/" + this.props.githubName + "/" + this.props.githubProject}>
                    <i className="fa fa-github"></i>
                </a>
            )
        }
        return (
            <footer className="footer">
                <div className="container">
                    <div className="content has-text-centered">
                        <p>
                            <strong>{this.props.title}</strong> by
                            <a href={this.props.titleTextAndLink.link}>{this.props.titleTextAndLink.text}</a>.
                        </p>
                        <p>
                            {twitterSection}
                            {githubSection}
                        </p>
                    </div>
                </div>
            </footer>
        );
    }
});