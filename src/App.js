import {Route, Switch, Redirect} from 'react-router-dom'
import Login from './components/Login'
import Home from './components/Home'
import Popular from './components/Popular'
import Search from './components/Search'
import Account from './components/Account'
import MovieItemDetails from './components/MovieItemDetails'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import './App.css'

const App = () => (
  <>
    <Switch>
      <Route exact path="/login" component={Login} />
      <ProtectedRoute exact path="/" component={Home} />
      <ProtectedRoute exact path="/popular" component={Popular} />
      <ProtectedRoute exact path="/search" component={Search} />
      <ProtectedRoute exact path="/account" component={Account} />
      <ProtectedRoute exact path="/movies/:id" component={MovieItemDetails} />
      <Route path="/not-found" component={NotFound} />
      <Redirect to="not-found" />
    </Switch>
  </>
)

export default App
