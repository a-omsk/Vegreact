import React from 'react';
import {find} from 'lodash';
import CityButton from './CityButton'
import CityStore from '../stores/CityStore';

class Toolbar extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            city: ''
        }

        this.onChange = () => {
            const cityCode = CityStore.getCurrentCity();
            const citiesList = CityStore.getCitiesList();

            if (cityCode) {
                let city = find(citiesList, (city) => city.code === cityCode);
                if (city) { this.setState({city: city}); }
            } else {
                this.setState({city: ''});
            }
        }
    }

    componentWillMount() {
        CityStore.addListener('change', this.onChange);
    }

    render () {
        const toolbarStyle = {
            position: 'absolute',
            right: 10 + 'px',
            top: 10 + 'px',
            zIndex: 10
        };

        return <div style={toolbarStyle}>
                   <CityButton city={this.state.city} />
               </div>
    }
}

export default Toolbar;
