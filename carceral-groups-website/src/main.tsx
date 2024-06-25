import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import App from './App.tsx'
import * as msal from '@azure/msal-browser';
import { MsalProvider } from '@azure/msal-react';
import { msalConfig } from './authConfig';
import ErrorPage from './error-page.tsx';
import Admin from './routes/Admin.tsx';
import './index.css'

import GeographicLocations, {loader as geographicLocationsLoader, action as geographicLocationsAction } from './components/CRUD/GeographicLocation/GeographicLocations.tsx';
import GeographicLocationDetails, { loader as geographicLocationLoader } from './components/CRUD/GeographicLocation/GeographicLocationDetail.tsx';
import GeographicLocationEdit, { loader as geographicLocationEditLoader, action as geographicLocationEditAction } from './components/CRUD/GeographicLocation/GeographicLocationEdit.tsx';
import { action as geographicLocationDestroyAction }  from './components/CRUD/GeographicLocation/GeographicLocationDestroy.tsx';

import GeographicDocuments, {loader as geographicDocumentsLoader } from './components/CRUD/GeographicDocument/GeographicDocuments.tsx';
import GeographicDocumentDetails, { loader as geographicDocumentLoader } from './components/CRUD/GeographicDocument/GeographicDocumentDetail.tsx';
import GeographicDocumentEdit, { loader as geographicDocumentEditLoader, action as geographicDocumentEditAction } from './components/CRUD/GeographicDocument/GeographicDocumentEdit.tsx';
import { action as geographicDocumentDestroyAction }  from './components/CRUD/GeographicDocument/GeographicDocumentDestroy.tsx';
import { action as geographicDocumentCreateAction }  from './components/CRUD/GeographicDocument/GeographicDocumentCreate.tsx';

import GeographicCategorys, {loader as geographicCategorysLoader, action as geographicCategorysAction } from './components/CRUD/GeographicCategory/GeographicCategorys.tsx';
import GeographicCategoryDetails, { loader as geographicCategoryLoader } from './components/CRUD/GeographicCategory/GeographicCategoryDetail.tsx';
import GeographicCategoryEdit, { loader as geographicCategoryEditLoader, action as geographicCategoryEditAction } from './components/CRUD/GeographicCategory/GeographicCategoryEdit.tsx';
import { action as geographicCategoryDestroyAction }  from './components/CRUD/GeographicCategory/GeographicCategoryDestroy.tsx';

import Institutions, {loader as institutionsLoader, action as institutionsAction } from './components/CRUD/Institution/Institutions.tsx';
import InstitutionDetails, { loader as institutionLoader } from './components/CRUD/Institution/InstitutionDetail.tsx';
import InstitutionEdit, { loader as institutionEditLoader, action as institutionEditAction } from './components/CRUD/Institution/InstitutionEdit.tsx';
import { action as institutionDestroyAction }  from './components/CRUD/Institution/InstitutionDestroy.tsx';
import GeographicDocumentCreate from './components/CRUD/GeographicDocument/GeographicDocumentCreate.tsx';

import GeographicDocumentComments, { loader as commentsLoader } from './components/CRUD/GeographicDocumentComment/GeographicDocumentComments.tsx';

const msalInstance = await msal.createStandardPublicClientApplication(msalConfig);

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
        children: [
          {
            path: "new",
            element: <GeographicDocumentCreate />,
            action: geographicDocumentCreateAction
          },
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
      },
      {
        path: "geographicCategorys",
        element: <GeographicCategorys/>,
        loader: geographicCategorysLoader,
        action: geographicCategorysAction,
        children: [
          {
            path: ":id",
            element: <GeographicCategoryDetails />,
            loader: geographicCategoryLoader
          },
          {
            path: ":id/edit",
            element: <GeographicCategoryEdit />,
            loader: geographicCategoryEditLoader,
            action: geographicCategoryEditAction,
          },
          {
            path: ":id/destroy",
            action: geographicCategoryDestroyAction,
          }
        ]
      },
      {
        path: "institutions",
        element: <Institutions/>,
        loader: institutionsLoader,
        action: institutionsAction,
        children: [
          {
            path: ":id",
            element: <InstitutionDetails />,
            loader: institutionLoader
          },
          {
            path: ":id/edit",
            element: <InstitutionEdit />,
            loader: institutionEditLoader,
            action: institutionEditAction,
          },
          {
            path: ":id/destroy",
            action: institutionDestroyAction,
          }
        ]
      },
      {
        path: "comments",
        element: <GeographicDocumentComments/>,
        loader: commentsLoader,
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
