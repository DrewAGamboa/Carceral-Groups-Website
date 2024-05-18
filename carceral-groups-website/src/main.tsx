import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import App from './App.tsx'
import { PublicClientApplication } from '@azure/msal-browser';
import { MsalProvider } from '@azure/msal-react';
import { msalConfig } from './authConfig';
import ErrorPage from './error-page.tsx';
import Admin from './routes/Admin.tsx';
import './index.css'
import GeographicLocations, {loader as geographicLocationsLoader, action as geographicLocationsAction } from './components/CRUD/GeographicLocation/GeographicLocations.tsx';
import GeographicLocationDetails, { loader as geographicLocationLoader } from './components/CRUD/GeographicLocation/GeographicLocationDetail.tsx';
import GeographicLocationEdit, { loader as geographicLocationEditLoader, action as geographicLocationEditAction } from './components/CRUD/GeographicLocation/GeographicLocationEdit.tsx';
import { action as geographicLocationDestroyAction }  from './components/CRUD/GeographicLocation/GeographicLocationDestroy.tsx';
import GeographicDocuments, {loader as geographicDocumentsLoader, action as geographicDocumentsAction } from './components/CRUD/GeographicDocument/GeographicDocuments.tsx';
import GeographicDocumentDetails, { loader as geographicDocumentLoader } from './components/CRUD/GeographicDocument/GeographicDocumentDetail.tsx';
import GeographicDocumentEdit, { loader as geographicDocumentEditLoader, action as geographicDocumentEditAction } from './components/CRUD/GeographicDocument/GeographicDocumentEdit.tsx';
import { action as geographicDocumentDestroyAction }  from './components/CRUD/GeographicDocument/GeographicDocumentDestroy.tsx';

const msalInstance = new PublicClientApplication(msalConfig);

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/admin",
    element: <Admin />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "geographicLocations",
        element: <GeographicLocations/>,
        loader: geographicLocationsLoader,
        action: geographicLocationsAction,
        children: [
          {
            path: ":id",
            element: <GeographicLocationDetails />,
            loader: geographicLocationLoader
          },
          {
            path: ":id/edit",
            element: <GeographicLocationEdit />,
            loader: geographicLocationEditLoader,
            action: geographicLocationEditAction,
          },
          {
            path: ":id/destroy",
            action: geographicLocationDestroyAction,
          }
        ]
      },
      {
        path: "geographicDocuments",
        element: <GeographicDocuments/>,
        loader: geographicDocumentsLoader,
        action: geographicDocumentsAction,
        children: [
          {
            path: ":id",
            element: <GeographicDocumentDetails />,
            loader: geographicDocumentLoader
          },
          {
            path: ":id/edit",
            element: <GeographicDocumentEdit />,
            loader: geographicDocumentEditLoader,
            action: geographicDocumentEditAction,
          },
          {
            path: ":id/destroy",
            action: geographicDocumentDestroyAction,
          }
        ]
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <MsalProvider instance={msalInstance}>
      <RouterProvider router={router} />
    </MsalProvider>
  </React.StrictMode>,
)
