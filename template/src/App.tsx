import * as React from "react";
import {Link, Outlet, Route, Routes,} from "react-router-dom";
import RequireAuth from "./app/auth/RequireAuth";
import routes from "./routes/routes";
import useAppSelector from "./app/hooks/useAppSelector";
import {usePermissionsMutation} from "./store/auth/auth.api";
import {selectPermissions} from "./store/auth/auth.slice";

export default function App() {
    const permissions = useAppSelector(selectPermissions)
    const data = useAppSelector(state => state.auth)
    console.log(data)
    return (
        <>
            <h1>Auth Example</h1>

            <p>
                This example demonstrates a simple login flow with three pages: a public
                page, a protected page, and a login page. In order to see the protected
                page, you must first login. Pretty standard stuff.
            </p>

            <p>
                First, visit the public page. Then, visit the protected page. You're not
                yet logged in, so you are redirected to the login page. After you login,
                you are redirected back to the protected page.
            </p>

            <p>
                Notice the URL change each time. If you click the back button at this
                point, would you expect to go back to the login page? No! You're already
                logged in. Try it out, and you'll see you go back to the page you
                visited just *before* logging in, the public page.
            </p>

            <Routes>
                <Route element={<Layout/>}>
                    {routes.filter(i => !i.permission || permissions.some(p => p === i.permission)).map(({path, component, permission, protected: shouldAuth}) =>
                        <Route
                            key={path}
                            path={path}
                            element={shouldAuth ? <RequireAuth>{component}</RequireAuth> : component}
                        />)}
                </Route>
            </Routes>
        </>
    );
}

function Layout() {
    const token = useAppSelector(state => state.auth.token)
    const [getPermissions, { data }] = usePermissionsMutation()
    // console.log({token})
    // console.log({permissions: data})
    return (
        <div>
            {/*<AuthStatus/>*/}

            <ul>
                <li>
                    <Link to="/">Public Page</Link>
                </li>
                <li>
                    <Link to="/protected">Protected Page</Link>
                </li>
                <li>
                    <Link to="/perm">Perm</Link>
                </li>
            </ul>
            <div>
                <button onClick={() => getPermissions()}>Perms</button>
            </div>
            <Outlet/>
        </div>
    );
}

// function AuthStatus() {
//     let auth = useAuth();
//     let navigate = useNavigate();
//
//     if (!auth.user) {
//         return <p>You are not logged in.</p>;
//     }
//
//     return (
//         <p>
//             Welcome {auth.user}!{" "}
//             <button
//                 onClick={() => {
//                     auth.signout(() => navigate("/"));
//                 }}
//             >
//                 Sign out
//             </button>
//         </p>
//     );
// }
