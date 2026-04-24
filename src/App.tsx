import { createBrowserRouter, RouterProvider } from "react-router"
import { Site } from "@/components/site/Site"
import { NotFound } from "@/components/site/NotFound"
import { RouteError } from "@/components/site/RouteError"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Site />,
    errorElement: <RouteError />,
  },
  {
    // Catch-all — anything that isn't `/` renders NotFound.
    // Add more routes above this line as the site grows.
    path: "*",
    element: <NotFound />,
  },
])

function App() {
  return <RouterProvider router={router} />
}

export default App
