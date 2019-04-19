import React from 'react';
import propTypes from 'prop-types';

export default class NgagerCarousel extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      activeSlideIndex: 0,
    };

    this.renderSlides = this.renderSlides.bind(this);
    this.handleClickNext = this.handleClickNext.bind(this);
    this.handleClickBack = this.handleClickBack.bind(this);
  }

  handleClickNext() {
    if (this.state.activeSlideIndex < this.props.children.length - 1) {
      this.setState({
        activeSlideIndex: this.state.activeSlideIndex + 1,
      });
    }
  }

  handleClickBack() {
    if (this.state.activeSlideIndex > 0) {
      this.setState({
        activeSlideIndex: this.state.activeSlideIndex - 1,
      });
    }
  }

  renderSlides() {
    const styledSlides = this.props.children.map((c, index) => (
      <div key={Math.random().toString()} style={{ flexDirection: 'column', position: 'absolute', width: '100%', height: '100%', display: 'flex', opacity: this.state.activeSlideIndex === index ? 1 : 0, transitionDuration: `${this.props.animationSpeed / 1000}s`, transitionProperty: 'all' }}>
        <div style={{ marginRight: 'auto', marginLeft: 'auto', maxWidth: '80%', display: 'block', maxHeight: '80%', marginTop: 25 }}>
          {/* <img src={c.props.src} alt={c.props.alt} title={c.props.title} style={{ maxWidth: '100%' }} /> */}
          <img src={c.props.src} alt={c.props.alt} title={c.props.title} style={{ height: '100%' }} />
          <div style={{ textAlign: 'center', marginTop: 20 }}>
            <p style={{ fontWeight: 'bold', fontSize: 20 }}>{ c.props.alt }</p>
            <p style={{ fontSize: 14 }}>{ c.props.title }</p>
          </div>
        </div>
      </div>
    ));
    return styledSlides;
  }

  renderControls() {
    return (
      <div style={{ position: 'absolute', width: '100%', top: '50%' }}>
        <div role="button" tabIndex="0" onClick={this.handleClickNext} style={{ position: 'absolute', right: 0, cursor: 'pointer', width: 0, height: 0, borderTop: '10px solid transparent', borderLeft: `20px solid ${this.props.themeColor}`, borderBottom: '10px solid transparent' }}></div>
        <div role="button" tabIndex="0" onClick={this.handleClickBack} style={{ cursor: 'pointer', width: 0, height: 0, borderTop: '10px solid transparent', borderRight: `20px solid ${this.props.themeColor}`, borderBottom: '10px solid transparent' }}></div>
      </div>
    );
  }

  renderIndicators() {
    return (
      <div className="indicators-container" style={{ position: 'absolute', width: '100%', textAlign: 'center' }}>
        {
          this.props.children.map((c, index) => (
            <span key={Math.random().toString()} style={{ width: 10, height: 10, display: 'inline-block', borderRadius: 100, background: this.state.activeSlideIndex === index ? this.props.themeColor : '#d2daea', margin: '0 5px' }}></span>
          ))
        }
      </div>
    );
  }

  render() {
    return (
      <div className="ngager-carousel" style={{ position: 'relative', height: '70%' }}>
        { this.renderSlides() }
        { this.renderControls() }
        { this.renderIndicators() }
      </div>
    );
  }
}

NgagerCarousel.propTypes = {
  animationSpeed: propTypes.number.isRequired,
  themeColor: propTypes.string.isRequired,
  children: propTypes.oneOfType([
    propTypes.arrayOf(propTypes.node),
    propTypes.node,
  ]).isRequired,
};

/*
TODO
put these on image

margin-right: auto;
margin-left: auto;
display: block;
max-height: 100%;
max-width: 100%;


take the image out of it's container (this will remove title and desc temporarily)

take
*/
