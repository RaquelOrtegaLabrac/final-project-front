import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";

const Register = lazy(() => import("../components/register/register"));
const Login = lazy(() => import("./login/login"));
const Home = lazy(() => import("../components/home/home"));
const InstrumentForm = lazy(() => import("./instrumentForm/instrumentForm"));
const InstrumentDetail = lazy(
  () => import("../components/instrumentDetail/instrumentDetail")
);

export function AppRoutes() {
  return (
    <Suspense>
      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="/register" element={<Register></Register>}></Route>
        <Route path="/login" element={<Login></Login>}></Route>
        <Route
          path="/create"
          element={<InstrumentForm></InstrumentForm>}
        ></Route>
        <Route
          path="/update/:id"
          element={<InstrumentForm></InstrumentForm>}
        ></Route>
        <Route
          path="/detail/:id"
          element={<InstrumentDetail></InstrumentDetail>}
        ></Route>
      </Routes>
    </Suspense>
  );
}
