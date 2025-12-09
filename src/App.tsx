import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AuthLayout from "./layout/AuthLayout";
import PageNotFound from "./pages/PageNotFound";
import AppLayout from "./layout/AppLayout";
import DocumentList from "./pages/DocumentList";
import DocumentEditor from "./pages/DocumentEditor";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const token = localStorage.getItem("token");
  if (!token) {
    return <Navigate to={"/auth/login"} replace />;
  }
  return children;
}

function App() {
  console.log("VITE_API_URL =>", import.meta.env.VITE_API_URL);
  console.log("VITE_API =>", import.meta.env.VITE_API);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to={"/auth/login"} replace />} />
        <Route path="auth" element={<AuthLayout />}>
          <Route index element={<Login />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
        <Route
          path="app"
          element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }
        >
          <Route index path="document-list" element={<DocumentList />} />
          <Route path="document-editor/:id" element={<DocumentEditor />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
