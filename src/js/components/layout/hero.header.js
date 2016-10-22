module.exports = React.createClass({
    displayName: "HeroHeader",
    propTypes: {
        title: React.PropTypes.string,
        subTitle: React.PropTypes.string
    },
    render: function () {
        return (
            <section className="hero is-info">
                <div className="hero-body">
                    <div className="container">
                        <h1 className="title">
                            {this.props.title}
                        </h1>
                        <h2 className="subtitle">
                            {this.props.subTitle}
                        </h2>
                    </div>
                </div>
            </section>
        );
    }
});