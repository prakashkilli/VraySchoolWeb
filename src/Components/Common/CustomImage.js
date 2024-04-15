import React,{Component} from "react";
import axios from "axios";
export default class CustomImage extends Component {
    constructor(props){
        super(props);
        this.state = {
            ImageLink: ''
        }
    }
    componentDidMount = async () => {
        try {
            const { src } = this.props;
            let response = await fetch(src);
            let bufer = await response.blob();
            if(bufer.size > 0) {
                this.setState({ImageLink: URL.createObjectURL(bufer)});
            }

        } catch (error) {
            console.error(error)
        }
    }
    render() {
      const {ImageLink} = this.state;
        return(
            <>
                {ImageLink ?
                <img src={ImageLink} alt="" className={this.props.height + " " + "w-100"} />:
                <img src="/assets/images/no-image.png"  alt="" className={this.props.height +" " + "w-100"}/>}                
            </>
        )
    }
}