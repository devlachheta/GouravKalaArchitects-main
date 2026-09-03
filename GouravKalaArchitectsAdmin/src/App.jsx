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

import AdminLayout from "./layouts/AdminLayout";


function App() {

  return (
    <BrowserRouter>

      <Routes>

        {/* ================= LOGIN ================= */}

        <Route
          path="/login"
          element={<Login />}
        />


        {/* ================= ADMIN ================= */}

        <Route element={<AdminLayout />}>

          <Route
            path="/dashboard"
            element={<Dashboard />}
          />

          <Route
            path="/projects"
            element={<Projects />}
          />

          <Route
            path="/projects/architecture"
            element={<Projects />}
          />

          <Route
            path="/projects/interior"
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