import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { BOOKS, ADDBOOK } from './RouteNames';
import Books from '../Components/Books';

const AppStack = createNativeStackNavigator();

function AppRouter() {
    return (
        <NavigationContainer>
            <AppStack.Navigator>
                <AppStack.Screen name={BOOKS}  component={Books} />
                {/* <AppStack.Screen name={ADDBOOK} component={ADDBOOK } /> */}
            </AppStack.Navigator>
        </NavigationContainer>
    );
}

export default AppRouter;