import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Search from '../components/Search';

const SearchStackNavigator = createStackNavigator({
    Search:{
        screen: Search,
        navigationOptions:{
            titme: "Search"
        }
    }
});

export default createAppContainer(SearchStackNavigator);