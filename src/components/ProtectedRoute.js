import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import Auth from "./auth";

// const ProtectedRoute = ({
//   component: Component,
//   ...rest
// }) => {
//   return (
//     <Route
//       {...rest}
//       render={props => {
//         if (Auth.loggedIn()) {
//           return <Component {...props} />;
//         } else {
//           return (
//             <Redirect
//               to={{
//                 pathname: "/",
//                 state: {
//                   from: props.location
//                 }
//               }}
//             />
//           );
//         }
//       }}
//     />
//   );
// };

// export default ProtectedRoute;


// export default class ProtectedRoute extends React.Component {
  
//   render(){
//     return (
//       <Route
//         {...rest}
//         render={props => {
//           if (Auth.loggedIn()) {
//             return <Component {...props} />;
//           } else {
//             return (
//               <Redirect
//                 to={{
//                   pathname: "/",
//                   state: {
//                     from: props.location
//                   }
//                 }}
//               />
//             );
//           }
//         }}
//       />
//   );}

//     }
