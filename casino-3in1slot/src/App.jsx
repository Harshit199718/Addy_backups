import React, { Suspense } from "react";
import useGetRoutes from "./hooks/useGetRoutes";
import { Route, Routes } from "react-router-dom";
import AuthRoutes from "./routes/AuthRoutes";
import Loading from "./components/Loading/Loading";
import ProtectedRoute from "./routes/ProtectedRoute";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import Layout from "./components/Layout/Layout";

const GlobalStyles = createGlobalStyle`
  body {
    font-family: "Roboto", sans-serif !important;
  }
  h1, h2 {
    font-family: "Source Sans Pro", sans-serif;
  }
  *::-webkit-scrollbar {
    display: block;
    width: 2px;
    height: 2px;
    border-radius: 10px;
  }
  *::-webkit-scrollbar-thumb {
    background-color: rgba(255,255,255,.2);
  }
`;

function App() {
  const routes = useGetRoutes();
  return (
    <div className="App">
      <ThemeProvider theme={{}}>
        <Layout>
          <GlobalStyles />
          <Routes>
            {routes?.auth?.map(({ path, component: Component }) => (
              <Route key={path} element={<AuthRoutes isAuth={null} />}>
                <Route
                  key={path}
                  path={path}
                  element={
                    <Suspense fallback={<Loading isLoading />}>
                      <Component />
                    </Suspense>
                  }
                />
              </Route>
            ))}
            {routes.public.map(({ path, component: Component }) => (
              <Route
                key={path}
                path={path}
                element={
                  <Suspense fallback={<Loading isLoading />}>
                    <Component />
                  </Suspense>
                }
              />
            ))}
            {routes.protected.map(({ path, component: Component }) => (
              <Route key={path} element={<ProtectedRoute isAuth={null} />}>
                <Route
                  key={path}
                  path={path}
                  element={
                    <Suspense fallback={<Loading isLoading />}>
                      <Component />
                    </Suspense>
                  }
                />
              </Route>
            ))}
          </Routes>
        </Layout>
      </ThemeProvider>
    </div>
  );
}

export default App;
