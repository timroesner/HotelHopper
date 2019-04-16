import React from 'react';
import { withRouter } from 'react-router-dom';

class SideMenu extends React.Component {

    navigateTo(page) {
        this.props.history.push(`/${page}`);
     }

    render() {
        const menu = this.props.items.map(item => <ul 
            key={item}
            className={"text-xl md:text-2xl mb-2 font-bold hover:text-dark-blue cursor-pointer " 
            + (this.props.selected === item ? "text-dark-blue" : "text-grey-dark")}
            onClick={() => this.navigateTo(item.replace(/\s/g, '').toLowerCase())}
            >{item}</ul>)
        return(
            <div>
                {menu}
            </div>
        )
    }
}

export default withRouter(SideMenu);