// import Layout from "./components/Layout";
// import Home from "./routes/home";
// import Budget from "./routes/budget";
// import Analysis from "./routes/analysis";

// export default [
//   {
//     path: "/",
//     element: <Layout />,
//     children: [
//       { index: true, element: <Home /> },
//       { path: "budget", element: <Budget /> },
//       // { path: "analysis", element: <Analysis /> },
//     ],
//   },
// ];
import { route, index } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("budget", "routes/budget.tsx"),
  route("analysis", "routes/analysis.tsx"),
];