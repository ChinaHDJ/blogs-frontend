import React from "react";


class TextResolve extends React.Component{
  constructor(props){
    super(props);
    const { config } = props;

    this.state = {
      config: {
        characterPool: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'x', 'y', 'x', '#', '%', '&', '-', '+', '_', '?', '/', '\\', '='],
        delay: 1000,
        loop: false,
        targetLoop: 3,
        resolveDelay: 50
      }
    };

    if(config.characterPool !== undefined){
     this.state.config.characterPool = config.characterPool;
    }
    if(config.delay !== undefined){
      this.state.config.delay = config.delay;
    }
    if(config.loop !== undefined){
      this.state.config.loop = config.loop;
    }
    if(config.targetLoop !== undefined){
      this.state.config.targetLoop = config.targetLoop;
    }
    if(config.resolveDelay !== undefined){
      this.state.config.resolveDelay = config.resolveDelay;
    }
    this.state.config.text = config.text;
    this.state.currentLoop = 0;
    this.state.currentDisplay = "";
  }

  componentDidMount() {
    this.switchTo(0);
  }

  resolve(){
    const { config } = this.state;

    this.setState({
      resolveInterval: setInterval(() => {
        const { config, currentLoop, currentDisplay } = this.state;
        const randomChar = this.getRandomCharacter();

        this.setState({
          currentLoop: this.state.currentLoop+1,
          currentDisplay: currentDisplay.substr(0, currentDisplay.length - 1) + randomChar
        }, ()=>{
          if(currentLoop >= config.targetLoop){
            this.setState({
              currentLoop: 0,
            });
            this.showNextChar();
          }
        });
      }, config.resolveDelay)
    });
  }

  showNextChar(){
    const { config, currentTarget, currentDisplay, resolveInterval } = this.state;

    const target = config.text[currentTarget];
    if(currentDisplay.length === target.length){
      clearInterval(resolveInterval);

      this.setState({
        resolveInterval: null,
      });

      setTimeout(() => {
        this.switchTo(currentTarget + 1);
      }, config.delay);
    }

    this.setState({
      currentDisplay: target.substr(0, this.state.currentDisplay.length + 1)
    })
  }

  switchTo(id){
    const { config } = this.state;

    if(id > config.text.length - 1){
      if(config.loop){
        this.switchTo(0);
      }
      return;
    }

    this.setState({
      currentTarget: id,
      currentDisplay: config.text[id][0],
    });
    this.resolve();
  }

  render() {
    const { currentDisplay } = this.state;

    return currentDisplay;
  }

  getRandomCharacter(){
    const { config } = this.state;

    const index = TextResolve.getRandomInt(0, config.characterPool.length - 1);
    return config.characterPool[index];
  }

  static getRandomInt(min, max){
    return Math.floor((Math.random() * max) + min);
  }
}

export default TextResolve;
