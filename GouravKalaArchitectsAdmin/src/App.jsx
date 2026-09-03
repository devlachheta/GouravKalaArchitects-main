import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import AddProject from "./pages/AddProject";
import EditProject from "./pages/EditProject";
import ViewProject from "./pages/ViewProject";

import AdminLayout from "./layouts/AdminLayout";
import Home from "./pages/Home";
import About from "./pages/About";
import ForgotPassword from "./pages/ForgetPassword";
import ResetPassword from "./pages/ResetPassword";

function App() {

  return (
    <BrowserRouter>

      <Routes>

        {/* ================= LOGIN ================= */}

        <Route
          path="/login"
          element={<Login />}
        />
        <Route
          path="/forgot-password"
          element={<ForgotPassword />}
        />
        <Route
          path="/reset-password/:uid/:token"
          element={<ResetPassword />}
        />

        {/* ================= ADMIN ================= */}

        <Route element={<AdminLayout />}>
          <Route
            path="/home"
            element={<Home />}
          />

          <Route
            path="/about"
            element={<About />}
          />
          <Route
            path="/dashboard"
            element={<Dashboard />}
          />

          <Route
            path="/projects"
            element={<Projects />}
          />

          <Route
            path="/projects/add"
            element={<AddProject />}
          />

          <Route
            path="/projects/edit/:id"
            element={<EditProject />}
          />

          <Route
            path="/projects/:id"
            element={<ViewProject />}
          />

        </Route>


        {/* ================= DEFAULT ================= */}

        <Route
          path="*"
          element={
            <Navigate
              to="/login"
              replace
            />
          }
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;