import * as React from 'react'
import {Provider} from 'react-redux'
import {Redirect, Route, Switch, withRouter} from 'react-router' // react-router v4
import {ConnectedRouter} from 'connected-react-router'
import {configureFontendStore, nav} from './store'
import {createBrowserHistory} from 'history'
import {ProductPage, ShippingPage} from './pages/'


const history = createBrowserHistory()
const store = configureFontendStore(history)


// type RouteType<T> = {
//         nav: NavRoute<T>
//         Component: React.ComponentType<T>
// }

const routes = {
    product: {
        nav: nav.product,
        Component: ProductPage,
    },
    shipping: {
        nav: nav.shipping,
        Component: ShippingPage,
    },
}

const reactRoutes = Object
    .values(routes)
    .map(({Component, nav}) =>
        <Route
            exact
            key={nav.pattern}
            path={nav.pattern}
            render={props =>
                // @ts-ignore
                <Component {...props.match.params as any} history={history}/>
            }
        />,
    )

const renderContent = () =>
    <ConnectedRouter history={history}>
        <Switch>
            <Redirect to='/product/0' from='/' exact/>
            {
                reactRoutes
            }
        </Switch>
    </ConnectedRouter>


const App = () =>
    <Provider store={store}>
        {renderContent()}
    </Provider>

export default App
